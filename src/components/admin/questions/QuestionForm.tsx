import { CATEGORIES } from "@/constants";
import {
  TextField,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

const QuestionForm = ({ item, setItem }: any) => {
  console.log(item);
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
          {Object.keys(CATEGORIES).map((cat) => (
            <MenuItem key={cat} value={(CATEGORIES as any)?.[cat]}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default QuestionForm;
