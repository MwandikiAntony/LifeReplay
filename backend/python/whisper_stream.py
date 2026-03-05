import sys
import numpy as np
from faster_whisper import WhisperModel

model = WhisperModel("base")

while True:
    chunk = sys.stdin.buffer.read(4096)

    if not chunk:
        continue

    audio = np.frombuffer(chunk, np.int16).astype(np.float32) / 32768.0

    segments, _ = model.transcribe(audio)

    for seg in segments:
        print(seg.text)
        sys.stdout.flush()