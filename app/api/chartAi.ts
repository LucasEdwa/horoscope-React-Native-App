// ...create this helper file or add to your API utilities...

export async function fetchAiChart(email: string): Promise<string | null> {
  try {
    const res = await fetch('http://localhost:3001/chart-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data.chart || null;
  } catch (e) {
    return null;
  }
}
