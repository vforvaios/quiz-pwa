// @ts-nocheck
const allCategories = ({ categoriesReducer }) => categoriesReducer?.categories;
const selectedCategory = ({ categoriesReducer }) => categoriesReducer?.category;

export { allCategories, selectedCategory };
