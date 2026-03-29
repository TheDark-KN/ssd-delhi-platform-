import Dexie, { type EntityTable } from "dexie";

export interface FormDraft {
  formId: string;
  step?: number;
  data: Record<string, unknown>;
  lastSaved: number;
  createdAt: number;
}

export interface FileBlob {
  id: string;
  formId: string;
  fieldName: string;
  fileName: string;
  fileType: string;
  blob: Blob;
  lastSaved: number;
}

const db = new Dexie("SSDDraftDB") as Dexie & {
  formDrafts: EntityTable<FormDraft, "formId">;
  fileBlobs: EntityTable<FileBlob, "id">;
};

db.version(1).stores({
  formDrafts: "formId, lastSaved",
  fileBlobs: "id, formId, fieldName, lastSaved",
});

export { db };

export async function saveFormDraft(
  formId: string,
  data: Record<string, unknown>,
  step?: number
): Promise<void> {
  await db.formDrafts.put({
    formId,
    step,
    data,
    lastSaved: Date.now(),
    createdAt: Date.now(),
  });
}

export async function loadFormDraft(
  formId: string
): Promise<FormDraft | undefined> {
  return db.formDrafts.get(formId);
}

export async function deleteFormDraft(formId: string): Promise<void> {
  await db.formDrafts.delete(formId);
  await db.fileBlobs.where("formId").equals(formId).delete();
}

export async function hasFormDraft(formId: string): Promise<boolean> {
  const draft = await db.formDrafts.get(formId);
  return !!draft;
}

export async function getFormDraftTimestamp(
  formId: string
): Promise<number | null> {
  const draft = await db.formDrafts.get(formId);
  return draft?.lastSaved ?? null;
}

export async function saveFileBlob(
  formId: string,
  fieldName: string,
  file: File
): Promise<string> {
  const id = `${formId}-${fieldName}`;
  await db.fileBlobs.put({
    id,
    formId,
    fieldName,
    fileName: file.name,
    fileType: file.type,
    blob: file,
    lastSaved: Date.now(),
  });
  return id;
}

export async function loadFileBlob(
  formId: string,
  fieldName: string
): Promise<File | null> {
  const record = await db.fileBlobs.get(`${formId}-${fieldName}`);
  if (!record) return null;
  return new File([record.blob], record.fileName, { type: record.fileType });
}

export async function deleteFileBlob(
  formId: string,
  fieldName: string
): Promise<void> {
  await db.fileBlobs.delete(`${formId}-${fieldName}`);
}

export async function getAllFileBlobs(
  formId: string
): Promise<Map<string, File>> {
  const records = await db.fileBlobs.where("formId").equals(formId).toArray();
  const map = new Map<string, File>();
  for (const record of records) {
    map.set(
      record.fieldName,
      new File([record.blob], record.fileName, { type: record.fileType })
    );
  }
  return map;
}
