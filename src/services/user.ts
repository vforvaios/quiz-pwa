import makeRequest from "@/utils/makeRequest";

const registerUser = async ({ name, email, password }: any) => {
  return makeRequest({
    method: "POST",
    url: `api/register`,
    body: JSON.stringify({ name, email, password }),
  });
};

const loginUserReq = async ({ email, password }: any) => {
  return makeRequest({
    method: "POST",
    url: `api/login`,
    body: JSON.stringify({ email, password }),
  });
};

export { registerUser, loginUserReq };
