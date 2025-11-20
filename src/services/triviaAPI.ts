import makeRequest from "@/utils/makeRequest";

const getCategories = () => {
  return makeRequest({ method: "GET", url: "api/categories" });
};

const getQuestions = (categoryId: number, difficulty: string, amount = 5) => {
  return makeRequest({
    method: "GET",
    url: `api/questions?difficulty=${difficulty}&category=${categoryId}&amount=${amount}`,
  });
};

const saveScore = ({ score, difficulty, category, userId }: any) => {
  return makeRequest({
    method: "POST",
    url: `api/save-score`,
    body: JSON.stringify({ score, difficulty, category, userId }),
  });
};

export { getCategories, getQuestions, saveScore };
