export function sumBy(items, field) {
  return items.reduce((sum, i) => sum + (i[field] || 0), 0);
}