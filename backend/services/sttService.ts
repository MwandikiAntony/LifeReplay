import { spawn } from "child_process";

export class STTService {
  private process: any;

  start() {
    this.process = spawn("python", ["whisper_stream.py"]);

    this.process.stdout.on("data", (data: Buffer) => {
      const transcript = data.toString();
      this.onTranscript?.(transcript);
    });
  }

  sendAudio(chunk: Buffer) {
    this.process.stdin.write(chunk);
  }

  onTranscript?: (text: string) => void;
}