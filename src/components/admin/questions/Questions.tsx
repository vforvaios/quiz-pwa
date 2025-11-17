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
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { userLoggedIn } from "@/models/selectors/loginSelectors";
import { updateQuestion } from "@/services/admin";

const Questions = () => {
  const adminCategories = useSelector(allCategories);
  const loggedUser = useSelector(userLoggedIn);
  const {
    mutateAsync: updateQuestionMutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["update-question"],
    mutationFn: () => updateQuestion(itemToBeCrud, loggedUser.token),
  });

  const { fetchAll, remove } = useCrud<any>("api/admin/questions");
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
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (delta: number) => {
    setPagination({ ...pagination, page: delta });
  };

  const handleOK = async () => {
    try {
      await updateQuestionMutate();
    } catch (err: any) {
      enqueueSnackbar(err.toString(), {
        variant: "error",
        autoHideDuration: 4000,
      });
    }
  };

  const handleCreateNewQuestion = () => {};

  useEffect(() => {
    handleSearch();
  }, [pagination]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      enqueueSnackbar("Η ερώτηση ενημερώθηκε επιτυχώς!", {
        variant: "success",
        autoHideDuration: 4000,
      });
    }
  }, [isSuccess]);

  return (
    <div className="space-y-6">
      <AdminModal
        handleOK={handleOK}
        title="Ενημέρωση ερώτησης"
        buttonLabel="Αποθήκευση"
        open={open}
        onClose={handleClose}
        loading={isPending}
      >
        <QuestionForm
          loading={isPending}
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
