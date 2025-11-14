import { allCategories } from "@/models/selectors/adminSelectors";
import {
  TextField,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";

const QuestionForm = ({ item, setItem }: any) => {
  const adminCategories = useSelector(allCategories);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        w-full
        label="Ερώτηση"
        value={item.question}
        onChange={(e) => setItem({ ...item, question: e.target.value })}
      />
      <FormControl w-full>
        <InputLabel id="question_category_edit">Κατηγορία</InputLabel>
        <Select
          labelId="question_category_edit"
          id="question_category_edit"
          value={item.categoryId || ""}
          label="Κατηγορία"
          onChange={(e) =>
            setItem({ ...item, categoryId: e.target.value as any })
          }
        >
          {adminCategories?.map((cat: any) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.category_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default QuestionForm;
