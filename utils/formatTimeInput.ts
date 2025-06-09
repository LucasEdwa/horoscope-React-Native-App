export function formatTimeInput(input: string): string {
  // Remove all non-digits and colons
  input = input.replace(/[^\d:]/g, '');
  // If user types 4 digits, auto-insert colon (e.g. 1245 -> 12:45)
  if (/^\d{3,4}$/.test(input)) {
    const padded = input.padStart(4, '0');
    input = `${padded.slice(0, 2)}:${padded.slice(2, 4)}`;
  }
  // Only allow HH:mm format
  const match = input.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return input;
  let hours = Number(match[1]);
  let minutes = Number(match[2]);
  if (isNaN(hours) || isNaN(minutes) || hours > 23 || minutes > 59) return input;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
