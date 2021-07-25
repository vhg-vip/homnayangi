module.exports = (sequelize, Sequelize) => {
    const tbl_recipe = sequelize.define("tbl_recipe", {
    recipe_td: {
        type:  Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    recipe_name: {
        type: Sequelize.STRING
    },
    recipe_tutorior: {
        type: Sequelize.STRING
    },
    recipe_image:{
        type: Sequelize.STRING
    },
    user_id: {
        type:  Sequelize.INTEGER 
    },
    recipe_time: {
        type: Sequelize.DATE 
    }
    
    });
    
    tbl_recipe.belongsToMany(tbl_user,{through:'tbl_rating'});
    tbl_recipe.belongsToMany(tbl_ingredient, {through: 'tbl_ingredient_recipe'});
    return tbl_recipe;
    
};
