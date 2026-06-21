export function toDate(value: string | null | undefined): Date {
  if (!value) return new Date(NaN);
  return new Date(value);
}

export function toDateInput(value: string | null | undefined): string {
  if (!value) return '';
  return value.includes('T') ? value.slice(0, 10) : value;
}

export function toDateDisplay(value: string | null | undefined): string {
  if (!value) return '';

  const parsed = toDate(value);
  if (Number.isNaN(parsed.getTime())) {
    return value.includes('T') ? value.replace('T', ' ') : value;
  }

  return parsed.toLocaleDateString('pl-PL');
}

export function today(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}
