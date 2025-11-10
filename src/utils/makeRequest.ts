type MakeRequestType = {
  method: string;
  url: string;
  body?: any;
  responseFormat?: any;
};

const configureHeaders = (resFormat: string, isFormData?: boolean) => {
  if (resFormat === "json") {
    if (!isFormData) {
      return {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    } else {
      return { Accept: "application/json" };
    }
  } else if (resFormat === "blob") {
    return {
      "Content-Type": "application/json",
      Accept: "text/csv",
    };
  } else {
    return {
      Accept: "application/pdf",
    };
  }
};

const makeRequest = ({
  method,
  url,
  body = null,
  responseFormat = "json",
}: MakeRequestType) => {
  const isFormData = body instanceof FormData;

  return fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
    method,
    headers: configureHeaders(responseFormat, isFormData),
    ...(body && { body }),
  }).then(async (response) => {
    if (!response.ok) {
      return response.json().then((response) => {
        throw response?.error?.name || response?.message;
      });
    }

    if (response.status === 204) {
      return null;
    }

    switch (responseFormat) {
      case "blob":
        return response.blob();
      default: {
        const data = await response.json();
        if (data?.error) {
          throw (
            data.error.name || data.error.message || "Unknown logical error"
          );
        }
        return data;
      }
    }
  });
};

export default makeRequest;
