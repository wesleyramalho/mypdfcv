"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { FieldType, WorkerResponse } from "@/types/ai-worker";
import { generateId } from "@/lib/utils";
import { track } from "@/lib/analytics";

type ModelStatus = "idle" | "downloading" | "ready" | "error";

interface AIState {
  modelStatus: ModelStatus;
  downloadProgress: number;
}

// ── Singleton worker manager ──────────────────────────────────────────────
let worker: Worker | null = null;
let state: AIState = { modelStatus: "idle", downloadProgress: 0 };
const listeners = new Set<() => void>();
const pendingRequests = new Map<
  string,
  { resolve: (v: string) => void; reject: (e: Error) => void }
>();

function setState(partial: Partial<AIState>) {
  state = { ...state, ...partial };
  listeners.forEach((l) => l());
}

function getWorker(): Worker {
  if (worker) return worker;

  worker = new Worker(new URL("../workers/ai-improve.worker.ts", import.meta.url), {
    type: "module",
  });

  worker.addEventListener("message", (e: MessageEvent<WorkerResponse>) => {
    const msg = e.data;

    switch (msg.type) {
      case "init-progress":
        setState({ modelStatus: "downloading", downloadProgress: msg.progress });
        break;
      case "init-complete":
        setState({ modelStatus: "ready", downloadProgress: 100 });
        break;
      case "init-error":
        setState({ modelStatus: "error" });
        break;
      case "result": {
        const req = pendingRequests.get(msg.id);
        if (req) {
          req.resolve(msg.improved);
          pendingRequests.delete(msg.id);
        }
        break;
      }
      case "error": {
        const req = pendingRequests.get(msg.id);
        if (req) {
          req.reject(new Error(msg.error));
          pendingRequests.delete(msg.id);
        }
        break;
      }
    }
  });

  return worker;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): AIState {
  return state;
}

function getServerSnapshot(): AIState {
  return { modelStatus: "idle", downloadProgress: 0 };
}

// ── Hook ──────────────────────────────────────────────────────────────────
export function useAIImprove() {
  const { modelStatus, downloadProgress } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const preloadModel = useCallback(() => {
    if (state.modelStatus === "ready" || state.modelStatus === "downloading") return;
    const w = getWorker();
    w.postMessage({ type: "init" });
    setState({ modelStatus: "downloading", downloadProgress: 0 });
  }, []);

  const improve = useCallback((text: string, fieldType: FieldType): Promise<string> => {
    const w = getWorker();
    const id = generateId();

    return new Promise<string>((resolve, reject) => {
      pendingRequests.set(id, { resolve, reject });
      w.postMessage({ type: "improve", id, text, fieldType });
      track("ai_improve_requested", { fieldType });
    });
  }, []);

  return { improve, preloadModel, modelStatus, downloadProgress };
}
