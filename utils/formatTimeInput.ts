export function formatTimeInput(input: string): string {
  // Remove all non-digits
  input = input.replace(/[^\d]/g, '');

  // Auto-insert colon after two digits (e.g. 12 -> 12:)
  if (input.length > 2) {
    input = input.slice(0, 2) + ':' + input.slice(2, 4);
  }

  // Limit to 5 chars (HH:mm)
  input = input.slice(0, 5);

  // Only allow valid HH:mm
  const match = input.match(/^(\d{1,2}):?(\d{0,2})$/);
  if (!match) return input;
  let hours = Number(match[1]);
  let minutes = match[2] ? Number(match[2]) : 0;
  if (
    isNaN(hours) ||
    hours > 23 ||
    (match[2] && (isNaN(minutes) || minutes > 59))
  ) {
    return input;
  }
  // Pad hours and minutes if both are present
  if (match[2].length === 2) {
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }
  // If only hours or partial minutes, return as typed
  return input;
}
