import { allCategories } from "@/models/selectors/adminSelectors";
import {
  TextField,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";

const QuestionForm = ({ item, setItem, loading }: any) => {
  const adminCategories = useSelector(allCategories);

  return (
    <Box display="flex" flexDirection="column" gap={3} sx={{ mt: 1 }}>
      {/* Question */}
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          size="small"
          label="Ερώτηση"
          disabled={loading}
          value={item.question}
          onChange={(e) => setItem({ ...item, question: e.target.value })}
        />

        <FormControl fullWidth size="small">
          <InputLabel id="question_category_edit">Κατηγορία</InputLabel>
          <Select
            disabled={loading}
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

      <Divider />

      {/* Answers */}
      {item.answers && (
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            Απαντήσεις
          </Typography>

          {item.answers?.map((ans: any) => (
            <Box
              key={ans.id}
              display="flex"
              alignItems="center"
              gap={1.5}
              width="100%"
            >
              <TextField
                fullWidth
                size="small"
                value={ans.answer}
                onChange={(e) =>
                  setItem({
                    ...item,
                    answers: item.answers.map((answer: any) => {
                      return ans.id !== answer.id
                        ? { ...answer }
                        : { ...answer, answer: e.target.value };
                    }),
                  })
                }
              />

              <IconButton
                size="small"
                color="error"
                onClick={() =>
                  setItem({
                    ...item,
                    answers: item.answers.filter(
                      (answer: any) => answer.id !== ans.id
                    ),
                  })
                }
              >
                <i className="icon-trash-empty" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default QuestionForm;
