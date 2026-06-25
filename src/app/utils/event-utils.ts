export function toVisibilityLabel(value: number | null | undefined): string {
  switch (value) {
    case 1:
      return 'Publiczne';
    case 2:
      return 'Prywatne';
    default:
      return 'Nieznane';
  }
}
export function toEventTypeLabel(value: number | null | undefined): string {
  switch (value) {
    case 0:
      return 'Spotkanie';
    case 1:
      return 'Zlot';
    case 2:
      return 'Wyprawa';
    case 3:
      return 'Offroad';
    default:
      return 'Inne';
  }
}
export function toEventCategoryName(cat: number): string {
  switch (cat) {
    case 0: return "Biznesowe";
    case 1: return "Lifestyle";
    case 2: return "Klasyczne";
    case 3: return "Rodzinne";
    case 4: return "Offroad";
    case 5: return "Trackday";
    default: return "Inne";
  }
}
// category: Business, Lifestyle, Classic, Family, Trackday
export function isUserParticipant(
  participantIds: string[] | null | undefined,
  currentUserId: string | null | undefined
): boolean {
  if (!participantIds || !currentUserId) return false;
  return participantIds.includes(currentUserId);
}
