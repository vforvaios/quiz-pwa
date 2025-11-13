import makeRequest from "@/utils/makeRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Pagination {
  page: number;
}

export interface SearchCriteria {
  [key: string]: string | number | undefined | null;
}

export function useCrud<T>(endpoint: string) {
  const queryClient = useQueryClient();

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

    return makeRequest({ method: "GET", url: fullUrl });
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
    }: {
      id: string | number;
      item: Partial<T>;
    }) => {
      return makeRequest({
        method: "POST",
        url: `${endpoint}/${id}`,
        body: JSON.stringify(item),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [endpoint] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string | number) => {
      return makeRequest({
        method: "DELETE",
        url: `${endpoint}/${id}`,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [endpoint] }),
  });

  return {
    fetchAll, // 👈 Θα το καλέσουμε manual από το component
    create: create.mutateAsync,
    update: update.mutateAsync,
    remove: remove.mutateAsync,
  };
}
