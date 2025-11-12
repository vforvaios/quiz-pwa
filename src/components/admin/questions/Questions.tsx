import { useState } from "react";
import { useCrud } from "@/hooks/useCrud";
import { Input } from "../Input";
import { Button } from "@/components/common/Button";
import { CrudTable } from "@/components/common/CrudTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const Questions = () => {
  const { fetchAll, remove } = useCrud<User>("/api/users");
  const [criteria, setCriteria] = useState({ name: "", email: "" });
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const result = await fetchAll({ ...criteria, ...pagination });
      setData(result);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (delta: number) => {
    const newPage = Math.max(1, pagination.page + delta);
    const updated = { ...pagination, page: newPage };
    setPagination(updated);
    setIsLoading(true);
    try {
      const result = await fetchAll({ ...criteria, ...updated });
      setData(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Ερωτήσεις</h1>

      {/* Search Criteria */}
      <div className="flex gap-2 items-end">
        <Input
          label="Name"
          value={criteria.name}
          onChange={(e) => setCriteria({ ...criteria, name: e.target.value })}
        />
        <Input
          label="Email"
          value={criteria.email}
          onChange={(e) => setCriteria({ ...criteria, email: e.target.value })}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <CrudTable
          data={data}
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
          ]}
          onDelete={(u) => remove(u.id)}
        />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="secondary"
          onClick={() => handlePageChange(-1)}
          disabled={pagination.page <= 1}
        >
          ← Προηγούμενο
        </Button>
        <span className="text-sm">
          Σελίδα {pagination.page} (εώς {pagination.limit})
        </span>
        <Button variant="secondary" onClick={() => handlePageChange(1)}>
          Επόμενο →
        </Button>
      </div>
    </div>
  );
};

export default Questions;
