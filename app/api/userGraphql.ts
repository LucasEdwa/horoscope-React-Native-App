export async function fetchUserGraphql(email: string) {
  const res = await fetch('http://localhost:3001/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          user(email: "${email}") {
            id
            email
            username
            birthdate
            birthtime
            birth_city
            birth_country
            chartPoints {
              pointType
              sign
              house
            }
          }
        }
      `
    })
  });
  const data = await res.json();
  return data.data.user;
}

export default {};
