import makeRequest from "@/utils/makeRequest";

const registerUser = async ({ name, email, password }: any) => {
  return makeRequest({
    method: "POST",
    url: `api/register`,
    body: JSON.stringify({ name, email, password }),
  });
};

export { registerUser };
