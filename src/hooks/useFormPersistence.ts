"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import {
  saveFormDraft,
  loadFormDraft,
  deleteFormDraft,
  saveFileBlob,
  loadFileBlob,
  deleteFileBlob,
  getAllFileBlobs,
} from "@/lib/db";

function debounce<T extends (...args: never[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export interface UseFormPersistenceOptions {
  debounceMs?: number;
}

export interface UseFormPersistenceReturn {
  save: (data: Record<string, unknown>, step?: number) => Promise<void>;
  load: () => Promise<Record<string, unknown> | null>;
  clear: () => Promise<void>;
  hasDraft: () => Promise<boolean>;
  lastSaved: Date | null;
  isRestoring: boolean;
  hasRestoredFiles: boolean;
  saveFile: (fieldName: string, file: File | null) => Promise<void>;
  loadFiles: () => Promise<Map<string, File>>;
}

export function useFormPersistence(
  formId: string,
  options: UseFormPersistenceOptions = {}
): UseFormPersistenceReturn {
  const { debounceMs = 500 } = options;
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [hasRestoredFiles, setHasRestoredFiles] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSave = useCallback(
    debounce(async (data: Record<string, unknown>, step?: number) => {
      try {
        await saveFormDraft(formId, data, step);
        setLastSaved(new Date());
      } catch (err) {
        console.error("[FormPersistence] Save error:", err);
      }
    }, debounceMs),
    [formId, debounceMs]
  );

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  const save = useCallback(
    async (data: Record<string, unknown>, step?: number) => {
      debouncedSave(data, step);
    },
    [debouncedSave]
  );

  const load = useCallback(async (): Promise<Record<string, unknown> | null> => {
    setIsRestoring(true);
    try {
      const draft = await loadFormDraft(formId);
      if (draft) {
        setLastSaved(new Date(draft.lastSaved));
        const files = await getAllFileBlobs(formId);
        setHasRestoredFiles(files.size > 0);
        return { ...draft.data, _step: draft.step };
      }
      return null;
    } catch (err) {
      console.error("[FormPersistence] Load error:", err);
      return null;
    } finally {
      setIsRestoring(false);
    }
  }, [formId]);

  const clear = useCallback(async () => {
    try {
      await deleteFormDraft(formId);
      setLastSaved(null);
      setHasRestoredFiles(false);
    } catch (err) {
      console.error("[FormPersistence] Clear error:", err);
    }
  }, [formId]);

  const hasDraft = useCallback(async (): Promise<boolean> => {
    try {
      const draft = await loadFormDraft(formId);
      return !!draft;
    } catch {
      return false;
    }
  }, [formId]);

  const saveFile = useCallback(
    async (fieldName: string, file: File | null) => {
      try {
        if (file) {
          await saveFileBlob(formId, fieldName, file);
        } else {
          await deleteFileBlob(formId, fieldName);
        }
      } catch (err) {
        console.error("[FormPersistence] File save error:", err);
      }
    },
    [formId]
  );

  const loadFiles = useCallback(async (): Promise<Map<string, File>> => {
    try {
      const files = await getAllFileBlobs(formId);
      setHasRestoredFiles(files.size > 0);
      return files;
    } catch (err) {
      console.error("[FormPersistence] Load files error:", err);
      return new Map();
    }
  }, [formId]);

  const loadSingleFile = useCallback(
    async (fieldName: string): Promise<File | null> => {
      try {
        return await loadFileBlob(formId, fieldName);
      } catch (err) {
        console.error("[FormPersistence] Load file error:", err);
        return null;
      }
    },
    [formId]
  );

  return {
    save,
    load,
    clear,
    hasDraft,
    lastSaved,
    isRestoring,
    hasRestoredFiles,
    saveFile,
    loadFiles,
  };
}
