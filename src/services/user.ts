const registerUser = async ({ name, email, password }: any) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export { registerUser };
