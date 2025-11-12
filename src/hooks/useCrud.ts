import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Pagination {
  page: number;
  limit: number;
}

export interface SearchCriteria {
  [key: string]: string | number | undefined;
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

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  };

  // κρατάμε state για criteria/pagination εκτός του hook
  const create = useMutation({
    mutationFn: async (item: Partial<T>) => {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error("Create failed");
      return res.json();
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
      const res = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [endpoint] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      return res.text();
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
