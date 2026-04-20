import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageOrientation, Header, PageNumber, Footer,
} from "docx";

type ExportInput = {
  titulo: string;
  autor?: string;
  institucion?: string;
  curso?: string;
  docente?: string;
  contenido: string;
  referencias?: string[];
};

// Constantes APA 7ª (en twips: 1 pulgada = 1440)
const FONT = "Times New Roman";
const SIZE = 24;            // 12pt = 24 half-points
const LINE_DOUBLE = 480;    // interlineado doble (240 = simple)
const INDENT_FIRST = 720;   // 0.5" sangría primera línea
const MARGIN = 1440;        // 1" márgenes en todos los lados

export async function exportarTrabajoWord(input: ExportInput): Promise<Blob> {
  const fechaLarga = new Date().toLocaleDateString("es-ES", {
    year: "numeric", month: "long", day: "numeric",
  });

  // ===== PORTADA APA 7ª (centrada, doble espacio, sin número de página visible
  // — APA estudiantil permite numeración desde la portada) =====
  const portada: Paragraph[] = [];

  // Espacio superior: APA recomienda título en la mitad superior (~3-4 líneas en blanco)
  for (let i = 0; i < 4; i++) {
    portada.push(blankLine());
  }

  // Título en negrita, centrado
  portada.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { line: LINE_DOUBLE, after: 0 },
      children: [new TextRun({ text: input.titulo, bold: true, size: SIZE, font: FONT })],
    })
  );
  portada.push(blankLine());

  // Autor
  portada.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { line: LINE_DOUBLE, after: 0 },
      children: [new TextRun({ text: input.autor ?? "Autor del trabajo", size: SIZE, font: FONT })],
    })
  );

  // Institución / Programa
  portada.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { line: LINE_DOUBLE, after: 0 },
      children: [new TextRun({ text: input.institucion ?? "Institución educativa", size: SIZE, font: FONT })],
    })
  );

  // Curso
  if (input.curso) {
    portada.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { line: LINE_DOUBLE, after: 0 },
        children: [new TextRun({ text: input.curso, size: SIZE, font: FONT })],
      })
    );
  }

  // Docente
  if (input.docente) {
    portada.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { line: LINE_DOUBLE, after: 0 },
        children: [new TextRun({ text: input.docente, size: SIZE, font: FONT })],
      })
    );
  }

  // Fecha
  portada.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { line: LINE_DOUBLE, after: 0 },
      children: [new TextRun({ text: fechaLarga, size: SIZE, font: FONT })],
    })
  );

  // Salto de página tras la portada
  portada.push(new Paragraph({ pageBreakBefore: true, children: [] }));

  // ===== TÍTULO DEL TRABAJO repetido en p.2 (APA 7ª) =====
  portada.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { line: LINE_DOUBLE, after: 240 },
      children: [new TextRun({ text: input.titulo, bold: true, size: SIZE, font: FONT })],
    })
  );

  // ===== CUERPO: parsea Markdown ligero a estilos APA =====
  const cuerpo: Paragraph[] = [];
  const lines = input.contenido.split("\n");

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (!line.trim()) {
      // Mantener líneas en blanco no produce dobles espacios extra (interlineado ya es doble)
      continue;
    }

    // Nivel 1 APA: centrado, negrita, mayúsculas y minúsculas
    if (line.startsWith("# ")) {
      cuerpo.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { line: LINE_DOUBLE, before: 240, after: 0 },
          children: [new TextRun({ text: line.slice(2).trim(), bold: true, size: SIZE, font: FONT })],
        })
      );
      continue;
    }

    // Nivel 2 APA: alineado a la izquierda, negrita
    if (line.startsWith("## ")) {
      cuerpo.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          alignment: AlignmentType.LEFT,
          spacing: { line: LINE_DOUBLE, before: 240, after: 0 },
          children: [new TextRun({ text: line.slice(3).trim(), bold: true, size: SIZE, font: FONT })],
        })
      );
      continue;
    }

    // Nivel 3 APA: alineado a la izquierda, negrita y cursiva
    if (line.startsWith("### ")) {
      cuerpo.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          alignment: AlignmentType.LEFT,
          spacing: { line: LINE_DOUBLE, before: 240, after: 0 },
          children: [new TextRun({ text: line.slice(4).trim(), bold: true, italics: true, size: SIZE, font: FONT })],
        })
      );
      continue;
    }

    // Párrafo normal: sangría primera línea 0.5", interlineado doble, alineado a la izquierda
    // (APA 7ª permite alineación a la izquierda; no se recomienda justificación)
    cuerpo.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { line: LINE_DOUBLE, after: 0 },
        indent: { firstLine: INDENT_FIRST },
        children: parseInline(line),
      })
    );
  }

  // ===== REFERENCIAS APA 7ª: nueva página, título centrado en negrita,
  // entradas con sangría francesa de 0.5" y orden alfabético =====
  const referenciasParagraphs: Paragraph[] = [];
  if (input.referencias?.length) {
    referenciasParagraphs.push(new Paragraph({ pageBreakBefore: true, children: [] }));
    referenciasParagraphs.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { line: LINE_DOUBLE, after: 240 },
        children: [new TextRun({ text: "Referencias", bold: true, size: SIZE, font: FONT })],
      })
    );

    const ordenadas = [...input.referencias]
      .map((r) => r.trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));

    for (const ref of ordenadas) {
      referenciasParagraphs.push(
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { line: LINE_DOUBLE, after: 0 },
          // Sangría francesa: indent.left define el margen y hanging desplaza la 1ª línea
          indent: { left: INDENT_FIRST, hanging: INDENT_FIRST },
          children: parseInline(ref),
        })
      );
    }
  }

  // ===== Documento APA: márgenes 1", encabezado con número de página
  // alineado a la derecha (APA 7ª estudiantil) =====
  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: FONT, size: SIZE } },
      },
    },
    sections: [{
      properties: {
        page: {
          size: {
            width: 12240,   // 8.5"
            height: 15840,  // 11"
            orientation: PageOrientation.PORTRAIT,
          },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
        },
      },
      // Encabezado APA 7ª: número de página alineado a la derecha
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: FONT,
                  size: SIZE,
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ children: [] })] }),
      },
      children: [...portada, ...cuerpo, ...referenciasParagraphs],
    }],
  });

  return await Packer.toBlob(doc);
}

function blankLine(): Paragraph {
  return new Paragraph({
    spacing: { line: LINE_DOUBLE, after: 0 },
    children: [new TextRun({ text: "", font: FONT, size: SIZE })],
  });
}

// Parsea *cursiva* y **negrita** simples manteniendo fuente y tamaño APA
function parseInline(text: string): TextRun[] {
  const runs: TextRun[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) {
      runs.push(new TextRun({ text: text.slice(last, m.index), font: FONT, size: SIZE }));
    }
    const tok = m[0];
    if (tok.startsWith("**")) {
      runs.push(new TextRun({ text: tok.slice(2, -2), bold: true, font: FONT, size: SIZE }));
    } else {
      runs.push(new TextRun({ text: tok.slice(1, -1), italics: true, font: FONT, size: SIZE }));
    }
    last = m.index + tok.length;
  }
  if (last < text.length) {
    runs.push(new TextRun({ text: text.slice(last), font: FONT, size: SIZE }));
  }
  return runs.length ? runs : [new TextRun({ text, font: FONT, size: SIZE })];
}
