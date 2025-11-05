export async function getCategories() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api_category.php`);
  const data = await res.json();
  return data.trivia_categories;
}

export async function getQuestions(
  categoryId: number,
  difficulty: string,
  amount = 5
) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api.php?amount=${amount}&difficulty=${difficulty}&category=${categoryId}&type=multiple`
  );
  const data = await res.json();
  return data.results;
}
