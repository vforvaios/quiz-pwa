import {
  allCategories,
  allDifficulties,
} from "@/models/selectors/adminSelectors";
import generateUniqueId from "@/utils/generateUniqueId";
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
  Button,
  Radio,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useSelector } from "react-redux";

const QuestionForm = ({ item, setItem, loading }: any) => {
  const adminCategories = useSelector(allCategories);
  const adminDifficulties = useSelector(allDifficulties);

  return (
    <Box display="flex" flexDirection="column" gap={3} sx={{ mt: 1 }}>
      {/* Question */}
      <Box display="flex" flexDirection="column" gap={2}>
        <FormControlLabel
          control={
            <Switch
              checked={Boolean(item?.isActive)}
              value={item?.isActive}
              onChange={(e) => setItem({ ...item, isActive: e.target.checked })}
            />
          }
          label="Ενεργή ερώτηση?"
        />
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
        <FormControl fullWidth size="small">
          <InputLabel id="question_difficulty_edit">Δυσκολία</InputLabel>
          <Select
            disabled={loading}
            labelId="question_difficulty_edit"
            id="question_difficulty_edit"
            value={item.difficultyId || ""}
            label="Δυσκολία"
            onChange={(e) =>
              setItem({ ...item, difficultyId: e.target.value as any })
            }
          >
            {adminDifficulties?.map((diff: any) => (
              <MenuItem key={diff.id} value={diff.id}>
                {diff.difficulty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider />
      <Box>
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          onClick={() =>
            setItem({
              ...item,
              answers: [
                ...item.answers,
                { id: generateUniqueId(), answer: "", isCorrect: 0 },
              ],
            })
          }
        >
          Προσθήκη απάντησης
        </Button>
      </Box>
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
              <Radio
                checked={Boolean(ans.isCorrect)}
                onChange={() => {
                  const updated = item.answers.map((a: any) => ({
                    ...a,
                    isCorrect: a.id === ans.id ? 1 : 0,
                  }));
                  setItem({ ...item, answers: updated });
                }}
              />
              <TextField
                fullWidth
                size="small"
                value={ans.answer}
                sx={{
                  background: `${ans.isCorrect ? "var(--green-color)" : "inherit"}`,
                }}
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
