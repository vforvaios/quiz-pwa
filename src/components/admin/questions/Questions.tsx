import { useEffect, useState } from "react";
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
import { CATEGORIES } from "@/constants";

const Questions = () => {
  const { fetchAll, remove } = useCrud<any>("api/admin/questions");
  const [criteria, setCriteria] = useState<any>({
    question: "",
    category: null,
  });
  const [pagination, setPagination] = useState({
    page: 1,
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
    setPagination({ ...pagination, page: delta });
  };

  useEffect(() => {
    handleSearch();
  }, [pagination]);

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
            value={criteria.category || ""}
            label="Κατηγορία"
            onChange={(e) =>
              setCriteria({ ...criteria, category: e.target.value as any })
            }
          >
            {Object.keys(CATEGORIES).map((cat) => (
              <MenuItem key={cat} value={(CATEGORIES as any)?.[cat]}>
                {cat}
              </MenuItem>
            ))}
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
          count={data?.total}
          columns={[
            { key: "id", label: "ID" },
            { key: "question", label: "Ερώτηση" },
          ]}
          onDelete={(u) => remove(u.id)}
          onEdit={(item) => {
            console.log(item);
            setCriteria({
              question: item.question,
              category: 2, // TODO CHANGE DYNAMICALLY
            });
          }}
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Questions;
