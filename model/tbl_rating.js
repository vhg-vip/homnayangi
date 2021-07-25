module.exports = (sequelize, Sequelize) => {
    const tbl_rating = sequelize.define("tbl_rating", {
        rating_id: {
            type:  Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        rating_point: {
            type:  Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        recipe_id: {
            type: Sequelize.INTEGER
        }
        });
        return tbl_rating;
    };