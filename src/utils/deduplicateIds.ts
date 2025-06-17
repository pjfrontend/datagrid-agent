type ObjectWithId = { id: string | number; [key: string]: any };

export const deduplicateIds = (items: ObjectWithId[]): ObjectWithId[] => {
  const idCounts: Record<string, number> = {};
  const result: ObjectWithId[] = [];

  for (const item of items) {
    const baseId = String(item.id);
    const count = idCounts[baseId] || 0;

    // If already seen, append suffix
    const newId = count > 0 ? `${baseId}-${count}` : baseId;

    // Update count
    idCounts[baseId] = count + 1;

    // Push item with updated ID
    result.push({ ...item, id: newId });
  }

  return result;
};
