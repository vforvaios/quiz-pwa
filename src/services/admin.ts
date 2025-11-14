import makeRequest from "@/utils/makeRequest";

const getAdminCategories = async (token: string) => {
  return makeRequest({
    method: "GET",
    url: `api/admin/categories`,
    token,
  });
};

export { getAdminCategories };
