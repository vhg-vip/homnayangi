module.exports = (sequelize, Sequelize) => {
    const tbl_user = sequelize.define("tbl_user", {
        user_id: {
            type:  Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        user_name: {
            type: Sequelize.STRING
        },
        user_email: {
            type: Sequelize.STRING
        },
        user_phone:{
            type: Sequelize.STRING
        },
        user_password: {
            type:  Sequelize.STRING
        }
    });
        
    tbl_user.belongsToMany(tbl_recipe,{through:'tbl_rating'});
    return tbl_user;
};