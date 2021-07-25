module.exports = (sequelize, Sequelize) => {
    const tbl_ingredient_recipe = sequelize.define("tbl_ingredient_recipe", {
        ir_id: {
            type:  Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        ir_amount: {
            type:  Sequelize.INTEGER
        },
        recipe_id: {
            type: Sequelize.INTEGER
        },
        ingredient_id: {
            type: Sequelize.INTEGER
        }
        });
        return tbl_ingredient_recipe;
    };