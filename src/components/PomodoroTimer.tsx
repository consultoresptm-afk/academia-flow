import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

const PRESETS = [25, 45, 60] as const;

export function PomodoroTimer() {
  const [duration, setDuration] = useState<number>(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    setSecondsLeft(duration * 60);
    setRunning(false);
  }, [duration]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = 1 - secondsLeft / (duration * 60);
  const circumference = 2 * Math.PI * 52;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-xl flex items-center gap-2">
          <Timer className="size-5 text-primary" /> Pomodoro
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative size-40 mb-4">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" stroke="var(--color-muted)" strokeWidth="8" fill="none" />
              <circle
                cx="60" cy="60" r="52"
                stroke="var(--color-primary)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-3xl tabular-nums">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {PRESETS.map((p) => (
              <Button
                key={p}
                size="sm"
                variant={duration === p ? "default" : "outline"}
                onClick={() => setDuration(p)}
              >
                {p}m
              </Button>
            ))}
          </div>

          <div className="flex gap-2 w-full">
            <Button className="flex-1" onClick={() => setRunning((r) => !r)}>
              {running ? <Pause className="size-4 mr-2" /> : <Play className="size-4 mr-2" />}
              {running ? "Pausar" : "Iniciar"}
            </Button>
            <Button variant="outline" size="icon" onClick={() => { setRunning(false); setSecondsLeft(duration * 60); }}>
              <RotateCcw className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
