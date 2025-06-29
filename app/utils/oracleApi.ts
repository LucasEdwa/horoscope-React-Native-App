// Utility for Oracle GraphQL API call
export async function askOracle(email: string, question: string): Promise<string> {
  const res = await fetch('http://localhost:3001/oracle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          oracle(email: "${email}", question: "${question.replace(/"/g, '\\"')}") {
            answer
          }
        }
      `
    })
  });
  const data = await res.json();
  return data?.data?.oracle?.answer || 'No answer received.';
}
