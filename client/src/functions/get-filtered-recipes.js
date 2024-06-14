export const getFilteredRecipes = (query, recipes) => {
  if (!query) {
    return recipes;
  }
  return recipes.filter((recipe) => {
    let recipeName = recipe.name.toLowerCase();
    let lowerCaseQuery = query.toLowerCase();

    let queryIndex = 0;

    for (let char of recipeName) {
      if (char === lowerCaseQuery[queryIndex]) {
        queryIndex++;
      }
      if (queryIndex === lowerCaseQuery.length) {
        return true;
      }
    }
    return false;
  });
};
