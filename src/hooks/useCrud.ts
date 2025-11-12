import makeRequest from "@/utils/makeRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Pagination {
  page: number;
  size: number;
  total: number | null;
}

export interface SearchCriteria {
  [key: string]: string | number | undefined | null;
}

export function useCrud<T>(endpoint: string) {
  const queryClient = useQueryClient();

  const fetchAll = async (
    params?: SearchCriteria & Pagination
  ): Promise<T[]> => {
    const url = new URL(endpoint, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return makeRequest({ method: "GET", url: url.toString() });
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
