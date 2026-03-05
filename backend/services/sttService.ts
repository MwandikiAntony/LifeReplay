import { spawn, ChildProcessWithoutNullStreams } from "child_process";

class STTService {
  private process: ChildProcessWithoutNullStreams | null = null;

  public onTranscript?: (text: string) => void;

  start(): void {
    this.process = spawn("python", ["python/whisper_stream.py"]);

    this.process.stdout.on("data", (data: Buffer) => {
      const text = data.toString().trim();

      if (this.onTranscript) {
        this.onTranscript(text);
      }
    });
  }

  sendAudio(buffer: Buffer): void {
    if (this.process) {
      this.process.stdin.write(buffer);
    }
  }

  stop(): void {
    if (this.process) {
      this.process.kill();
      this.process = null;
    }
  }
}

export default STTService;