import makeRequest from "@/utils/makeRequest";

const getAdminCategories = async (token: string) => {
  return makeRequest({
    method: "GET",
    url: `api/admin/categories`,
    token,
  });
};

const getAdminDifficulties = async () => {
  return makeRequest({
    method: "GET",
    url: `api/admin/difficulties`,
  });
};

const updateQuestion = async (item: any, token: string) => {
  return makeRequest({
    method: "PUT",
    url: `api/admin/questions`,
    token,
    body: JSON.stringify(item),
  });
};

export { getAdminCategories, getAdminDifficulties, updateQuestion };
