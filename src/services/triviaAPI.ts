export async function getCategories() {
  const res = await fetch("https://opentdb.com/api_category.php");
  const data = await res.json();
  return data.trivia_categories;
}

export async function getQuestions(categoryId: number, amount = 5) {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&type=multiple`
  );
  const data = await res.json();
  return data.results;
}
