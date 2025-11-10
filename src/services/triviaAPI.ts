import makeRequest from "@/utils/makeRequest";

export async function getCategories() {
  return makeRequest({ method: "GET", url: "api/categories" });
}

export async function getQuestions(
  categoryId: number,
  difficulty: string,
  amount = 5
) {
  return makeRequest({
    method: "GET",
    url: `api/questions?difficulty=${difficulty}&category=${categoryId}&amount=${amount}`,
  });
}
