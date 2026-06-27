import { getStore } from "@netlify/blobs";

const memory = new Map();
const useNetlifyBlobs = Boolean(process.env.SITE_ID);

const getBlobStore = () =>
  getStore({
    name: "masjidpro-production",
  });

export async function getJSON(key) {
  if (!useNetlifyBlobs) {
    return memory.has(key) ? structuredClone(memory.get(key)) : null;
  }

  return getBlobStore().get(key, { type: "json" });
}

export async function setJSON(key, value, options = {}) {
  if (!useNetlifyBlobs) {
    if (options.onlyIfNew && memory.has(key)) {
      return { modified: false };
    }

    memory.set(key, structuredClone(value));
    return { modified: true, etag: `memory-${Date.now()}` };
  }

  return getBlobStore().setJSON(key, value, options);
}

export async function deleteJSON(key) {
  if (!useNetlifyBlobs) {
    memory.delete(key);
    return;
  }

  await getBlobStore().delete(key);
}

export async function listJSON(prefix) {
  if (!useNetlifyBlobs) {
    return [...memory.entries()]
      .filter(([key]) => key.startsWith(prefix))
      .map(([, value]) => structuredClone(value));
  }

  const store = getBlobStore();
  const { blobs } = await store.list({ prefix });
  const values = await Promise.all(
    blobs.map(({ key }) => store.get(key, { type: "json" })),
  );
  return values.filter(Boolean);
}

export function storageMode() {
  return useNetlifyBlobs ? "netlify-blobs" : "memory";
}
