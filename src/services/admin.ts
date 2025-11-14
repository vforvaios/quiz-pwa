import makeRequest from "@/utils/makeRequest";

const getAdminCategories = async () => {
  return makeRequest({
    method: "GET",
    url: `api/admin/categories`,
  });
};

export { getAdminCategories };
