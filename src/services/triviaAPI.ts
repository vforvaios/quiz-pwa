export async function getCategories() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
  const data = await res.json();
  return data.trivia_categories;
}

export async function getQuestions(
  categoryId: number,
  difficulty: string,
  amount = 5
) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/questions?difficulty=${difficulty}&category=${categoryId}&amount=${amount}`
  );
  const data = await res.json();
  return data.results;
}
