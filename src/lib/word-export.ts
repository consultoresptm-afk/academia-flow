import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageOrientation, LevelFormat,
} from "docx";

type ExportInput = {
  titulo: string;
  autor?: string;
  contenido: string;
  referencias?: string[];
};

export async function exportarTrabajoWord(input: ExportInput): Promise<Blob> {
  const children: Paragraph[] = [];

  // Portada
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 2400, after: 400 },
      children: [new TextRun({ text: input.titulo, bold: true, size: 36, font: "Times New Roman" })],
    })
  );
  if (input.autor) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({ text: input.autor, size: 24, font: "Times New Roman" })],
      })
    );
  }
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [new TextRun({ text: new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" }), size: 24, font: "Times New Roman" })],
    })
  );
  children.push(new Paragraph({ pageBreakBefore: true, children: [] }));

  // Cuerpo: parsear markdown ligero
  const lines = input.contenido.split("\n");
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      children.push(new Paragraph({ children: [new TextRun({ text: "", font: "Times New Roman", size: 24 })] }));
      continue;
    }
    if (line.startsWith("## ")) {
      children.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 360, after: 200 },
        children: [new TextRun({ text: line.slice(3), bold: true, size: 28, font: "Times New Roman" })],
      }));
    } else if (line.startsWith("### ")) {
      children.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 280, after: 160 },
        children: [new TextRun({ text: line.slice(4), bold: true, size: 26, font: "Times New Roman" })],
      }));
    } else if (line.startsWith("# ")) {
      children.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: line.slice(2), bold: true, size: 32, font: "Times New Roman" })],
      }));
    } else {
      children.push(new Paragraph({
        spacing: { line: 360, after: 180 },
        alignment: AlignmentType.JUSTIFIED,
        children: parseInline(line),
      }));
    }
  }

  // Referencias
  if (input.referencias?.length) {
    children.push(new Paragraph({ pageBreakBefore: true, children: [] }));
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 360 },
      children: [new TextRun({ text: "Referencias", bold: true, size: 28, font: "Times New Roman" })],
    }));
    for (const ref of input.referencias) {
      children.push(new Paragraph({
        spacing: { line: 360, after: 200 },
        indent: { left: 720, hanging: 720 },
        children: parseInline(ref),
      }));
    }
  }

  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 24 } } },
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children,
    }],
  });

  const buffer = await Packer.toBlob(doc);
  return buffer;
}

// Parsea *italic* y **bold** simples
function parseInline(text: string): TextRun[] {
  const runs: TextRun[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) runs.push(new TextRun({ text: text.slice(last, m.index), font: "Times New Roman", size: 24 }));
    const tok = m[0];
    if (tok.startsWith("**")) {
      runs.push(new TextRun({ text: tok.slice(2, -2), bold: true, font: "Times New Roman", size: 24 }));
    } else {
      runs.push(new TextRun({ text: tok.slice(1, -1), italics: true, font: "Times New Roman", size: 24 }));
    }
    last = m.index + tok.length;
  }
  if (last < text.length) runs.push(new TextRun({ text: text.slice(last), font: "Times New Roman", size: 24 }));
  return runs.length ? runs : [new TextRun({ text, font: "Times New Roman", size: 24 })];
}
