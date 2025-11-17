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
import AdminModal from "../AdminModal";
import QuestionForm from "./QuestionForm";
import { allCategories } from "@/models/selectors/adminSelectors";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { userLoggedIn } from "@/models/selectors/loginSelectors";

const Questions = () => {
  const initialItemToBeCrud = {
    id: null,
    question: "",
    difficultyId: null,
    answers: [],
  };
  const adminCategories = useSelector(allCategories);
  const loggedUser = useSelector(userLoggedIn);

  const { fetchAll, remove, update, states } = useCrud<any>(
    "api/admin/questions"
  );
  const [itemToBeCrud, setItemToBeCrud] = useState<any>(null);
  const [criteria, setCriteria] = useState<any>({
    question: "",
    category: null,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
  });
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const result = await fetchAll({ ...criteria, ...pagination });
      setData(result);
    } catch (err: any) {
      enqueueSnackbar(err?.toString(), {
        variant: "error",
        autoHideDuration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (delta: number) => {
    setPagination({ ...pagination, page: delta });
  };

  const handleOK = async () => {
    try {
      await update({
        id: itemToBeCrud.id,
        item: itemToBeCrud,
        token: loggedUser.token,
      });
    } catch (err: any) {
      enqueueSnackbar(err.toString(), {
        variant: "error",
        autoHideDuration: 4000,
      });
    }
  };

  const handleCreateNewQuestion = () => {
    setItemToBeCrud(initialItemToBeCrud);
    setOpen(true);
  };

  useEffect(() => {
    handleSearch();
  }, [pagination]);

  return (
    <div className="space-y-6">
      <AdminModal
        handleOK={handleOK}
        title="Ερώτηση"
        buttonLabel="Αποθήκευση"
        open={open}
        onClose={handleClose}
        loading={
          states?.createIsPending ||
          states?.updateIsPending ||
          states?.removeIsPending
        }
        disabledButton={
          states?.createIsPending ||
          states?.updateIsPending ||
          states?.removeIsPending ||
          !itemToBeCrud?.question ||
          !itemToBeCrud?.difficultyId ||
          !itemToBeCrud?.categoryId ||
          itemToBeCrud?.answers?.every((ans: any) => ans.isCorrect === 0) ||
          itemToBeCrud?.answers.length <= 1
        }
      >
        <QuestionForm
          loading={
            states?.createIsPending ||
            states?.updateIsPending ||
            states?.removeIsPending
          }
          item={itemToBeCrud}
          setItem={setItemToBeCrud}
        />
      </AdminModal>
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
            {adminCategories?.map((cat: any) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.category_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSearch}>
          ΑΝΑΖΗΤΗΣΗ
        </Button>
        <Button variant="contained" onClick={handleCreateNewQuestion}>
          ΠΡΟΣΘΗΚΗ ΕΡΩΤΗΣΗΣ
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <CrudTable
          data={data?.questions}
          count={data?.total || 0}
          columns={[
            { key: "id", label: "ID" },
            { key: "question", label: "Ερώτηση" },
          ]}
          onDelete={(u) => remove(u.id)}
          onEdit={(item) => {
            setItemToBeCrud(item);
            setOpen(true);
          }}
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Questions;
