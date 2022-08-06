export default async function Form(data) {
  const url = 'https://mustseeum.com/api/account/login';

  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });

  return response.json();
}
