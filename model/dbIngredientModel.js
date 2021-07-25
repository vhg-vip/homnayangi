module.exports = (sequelize, Sequelize) => {
    const tbl_ingredient = sequelize.define("tbl_ingredient", {
        ingredient_id: {
            type:  Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        ingredient_name: {
            type: Sequelize.STRING
        },
        ingredient_measure: {
            type: Sequelize.STRING
        }
        });
        tbl_ingredient.belongsToMany(tbl_recipe, {through: 'tbl_ingredient_recipe'});
        return tbl_ingredient;
    };