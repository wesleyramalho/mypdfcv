import { pipeline, type Text2TextGenerationPipeline } from "@huggingface/transformers";
import { buildPrompt } from "@/lib/aiPrompts";
import type { WorkerRequest, WorkerResponse } from "@/types/ai-worker";

interface GenerationOutput {
  generated_text: string;
}

let generator: Text2TextGenerationPipeline | null = null;

function post(msg: WorkerResponse) {
  self.postMessage(msg);
}

async function loadModel() {
  if (generator) {
    post({ type: "init-complete" });
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- pipeline() returns a union too complex for TS
    generator = (await (pipeline as any)("text2text-generation", "Xenova/flan-t5-small", {
      dtype: "q8",
      progress_callback: (p: { progress?: number }) => {
        if (typeof p.progress === "number") {
          post({ type: "init-progress", progress: Math.round(p.progress) });
        }
      },
    })) as Text2TextGenerationPipeline;

    post({ type: "init-complete" });
  } catch (err) {
    post({ type: "init-error", error: err instanceof Error ? err.message : String(err) });
  }
}

async function improve(id: string, text: string, fieldType: WorkerRequest & { type: "improve" }) {
  if (!generator) {
    post({ type: "error", id, error: "Model not loaded" });
    return;
  }

  try {
    // For experience bullets, improve each line individually for better results
    const lines =
      fieldType.fieldType === "experience"
        ? text.split("\n").filter((l) => l.trim().length > 0)
        : [text];

    const improved: string[] = [];
    for (const line of lines) {
      const prompt = buildPrompt(fieldType.fieldType, line);
      const result = await generator(prompt, { max_new_tokens: 150 });
      const output = Array.isArray(result) ? result[0] : result;
      improved.push((output as GenerationOutput).generated_text?.trim() ?? line);
    }

    post({ type: "result", id, improved: improved.join("\n") });
  } catch (err) {
    post({ type: "error", id, error: err instanceof Error ? err.message : String(err) });
  }
}

self.addEventListener("message", (e: MessageEvent<WorkerRequest>) => {
  const msg = e.data;

  if (msg.type === "init") {
    void loadModel();
  } else if (msg.type === "improve") {
    // Auto-init if not loaded yet
    if (!generator) {
      void loadModel().then(() => improve(msg.id, msg.text, msg));
    } else {
      void improve(msg.id, msg.text, msg);
    }
  }
});
