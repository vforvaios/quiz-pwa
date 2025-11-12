import { useState } from "react";
import { useCrud } from "@/hooks/useCrud";
import { CrudTable } from "@/components/common/CrudTable";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

// interface Question {
//   id: number;
//   question: string;
// }

const Questions = () => {
  const { fetchAll, remove } = useCrud<any>("api/admin/questions");
  const [criteria, setCriteria] = useState({ question: "" });
  const [pagination, setPagination] = useState({
    page: 1,
    size: 5,
    total: null,
  });
  const [data, setData] = useState<any>([]);
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
      <div className="flex gap-2 items-center">
        <TextField
          label="Ερώτηση"
          value={criteria.question}
          onChange={(e) =>
            setCriteria({ ...criteria, question: e.target.value })
          }
        />
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="question_category">Κατηγορία</InputLabel>
          <Select
            labelId="question_category"
            id="question_category"
            value={null}
            label="Age"
            onChange={() => {}}
          >
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <CrudTable
          data={data?.questions}
          columns={[
            { key: "id", label: "ID" },
            { key: "question", label: "Ερώτηση" },
          ]}
          onDelete={(u) => remove(u.id)}
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Questions;
