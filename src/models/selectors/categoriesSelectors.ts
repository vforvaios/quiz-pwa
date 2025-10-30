// @ts-nocheck
const allCategories = ({ categoriesReducer }) => categoriesReducer?.categories;
const selectedCategory = ({ categoriesReducer }) => categoriesReducer?.category;
const selectedDifficulty = ({ categoriesReducer }) =>
  categoriesReducer?.difficulty;

export { allCategories, selectedCategory, selectedDifficulty };
