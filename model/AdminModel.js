module.exports = {
    UpdateIngredientRequest: ({ingredient_id, ingredient_name, ingredient_measure}) => {
        if (!ingredient_id || !ingredient_name || !ingredient_measure) {
            throw new Error("ingredient is not define")
        }
        return {ingredient_id, ingredient_name, ingredient_measure}
    },

    InsertIngredientRequest: ({ingredient_name, ingredient_measure}) => {
        if ( !ingredient_name || !ingredient_measure) {
            throw new Error("ingredient is not define")
        }
        return {ingredient_name, ingredient_measure}
    },

    UpdateRecipeRequest: ({recipe_id, recipe_name, recipe_tutorior}) => {
        if ( !recipe_id || !recipe_name || !recipe_tutorior) {
            throw new Error("recipe is not define")
        }
        return {recipe_id, recipe_name, recipe_tutorior}
    }
}