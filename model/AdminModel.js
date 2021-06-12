module.exports = {
    UpdateIngredientRequest: ({ingredient_id, ingredient_name, ingredient_measure}) => {
        if (!ingredient_id || !ingredient_name || !ingredient_measure) {
            throw new Error("ingredient is not define")
        }
        return {ingredient_id, ingredient_name, ingredient_measure}
    }
}