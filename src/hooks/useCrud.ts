import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useCrud<T>(endpoint: string) {
  const queryClient = useQueryClient();

  const fetchAll = async (): Promise<T[]> => {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  };

  const {
    data = [],
    isLoading,
    error,
  } = useQuery<T[]>({
    queryKey: [endpoint],
    queryFn: fetchAll,
  });

  const createMutation = useMutation({
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

  const updateMutation = useMutation({
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

  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      return res.text();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [endpoint] }),
  });

  return {
    data,
    isLoading,
    error,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    remove: deleteMutation.mutateAsync,
  };
}
