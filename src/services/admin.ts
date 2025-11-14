import makeRequest from "@/utils/makeRequest";

const getAdminCategories = async (token: string) => {
  return makeRequest({
    method: "GET",
    url: `api/admin/categories`,
    token,
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

export { getAdminCategories, updateQuestion };
