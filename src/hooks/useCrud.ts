import { userLoggedIn } from "@/models/selectors/loginSelectors";
import makeRequest from "@/utils/makeRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";

export interface Pagination {
  page: number;
}

export interface SearchCriteria {
  [key: string]: string | number | undefined | null;
}

export function useCrud<T>(endpoint: string) {
  const queryClient = useQueryClient();
  const loggedUser = useSelector(userLoggedIn);
  const fetchAll = async (
    params?: SearchCriteria & Pagination
  ): Promise<T[]> => {
    const cleanEndpoint = endpoint.replace(/^\//, "");
    let fullUrl = `${cleanEndpoint}`;

    if (params && Object.keys(params).length > 0) {
      const query = Object.entries(params)
        .filter(
          ([_, value]) => value !== undefined && value !== "" && value !== null
        )
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
        )
        .join("&");

      fullUrl += `?${query}`;
    }

    return makeRequest({
      method: "GET",
      url: fullUrl,
      token: loggedUser.token,
    });
  };

  // κρατάμε state για criteria/pagination εκτός του hook
  const create = useMutation({
    mutationFn: async (item: Partial<T>) => {
      return makeRequest({
        method: "POST",
        url: endpoint,
        body: JSON.stringify(item),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [endpoint] }),
  });

  const update = useMutation({
    mutationFn: async ({
      id,
      item,
      token,
    }: {
      id: string | number;
      item: Partial<T>;
      token: string;
    }) => {
      return makeRequest({
        method: "PUT",
        url: `${endpoint}/${id}`,
        body: JSON.stringify(item),
        token,
      });
    },
    onSuccess: (data) => {
      enqueueSnackbar(data.message, {
        variant: "success",
        autoHideDuration: 4000,
      });
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });

  const remove = useMutation({
    mutationFn: async ({
      id,
      item,
      token,
    }: {
      id: string | number;
      item: Partial<T>;
      token: string;
    }) => {
      return makeRequest({
        method: "DELETE",
        url: `${endpoint}/${id}`,
        body: JSON.stringify(item),
        token,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [endpoint] }),
  });

  return {
    fetchAll, // 👈 Θα το καλέσουμε manual από το component
    create: create.mutateAsync,
    update: update.mutateAsync,
    remove: remove.mutateAsync,
    states: {
      createIsPending: create.isPending,
      updateIsPending: update.isPending,
      removeIsPending: remove.isPending,
      updateIsSuccess: update.isSuccess,
    },
  };
}
