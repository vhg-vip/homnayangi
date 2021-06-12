const mysql = require('mysql2');

const settings = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db-homnayangi',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(settings);

const promisePool = pool.promise();

const getUsers = async () => {
    let sql = "SELECT * FROM  tbl_user";
    const [rows, fields] = await promisePool.query(sql);
    return rows;
}

const getIngredientByIngredientName = async (ingredient_name) => {
    let sql = "SELECT * FROM tbl_ingredient WHERE ingredient_name=?"
    const [rows, fields] = await promisePool.query(sql, [ingredient_name]);
    return rows;
}

const getIngredients = async () => {
    let sql = "SELECT * FROM tbl_ingredient"
    const [rows, fields] = await promisePool.query(sql);
    return rows;
}

const getRecipes = async () => {
    let sql = "SELECT * FROM tbl_recipe";
    const [rows, fields] = await promisePool.query(sql);
    return rows;
}

const getUserByUsername = async ( user_name, user_email ) => {
    let sql = "SELECT * FROM  tbl_user WHERE user_name = ? OR user_email = ?";
    const [rows, fields] = await promisePool.query(sql, [user_name, user_email]);
    return rows;
}

const getUsernameAndEmail = async (user_name, user_email) => {
    let sql = "SELECT * FROM tbl_user WHERE user_name = ? AND user_email = ?";
    const [rows, fields] = await promisePool.query(sql, [user_name, user_email]);
    return rows;
}

const getUserById = async ( user_id ) => {
    let sql = "SELECT * FROM  tbl_user WHERE user_id = ?";
    const [rows, fields] = await promisePool.query(sql, [user_id]);
    return rows;
}

const getUserLogin = async({ user_name, user_password }) => {
    let sql = "SELECT * FROM tbl_user WHERE user_name = ? AND user_password = ?";
    const [rows, fields] = await promisePool.query(sql, [user_name, user_password]);
    return rows;
}

const addNewUser = async ({user_name, user_password, user_email}) => {
    const sql = "INSERT INTO tbl_user (user_name, user_password, user_email) VALUES (?, ?, ?)";
    await promisePool.query(sql, [user_name, user_password, user_email]);
}

const updatePassword = async (user_id, user_password) => {
    let sql = "UPDATE tbl_user SET user_password = ? WHERE user_id = ?";
    await promisePool.query(sql, [user_password, user_id]);
}

const updateVerifyCode = async (user_id, verify_code) => {
    let sql = "UPDATE tbl_user SET verify_code = ? WHERE user_id = ?";
    await promisePool.query(sql, [verify_code, user_id]);
}

const getIngredientRecipe = async () => {
    let sql = "SELECT * FROM tbl_ingredient_recipe";
    const [rows, fields] = await promisePool.query(sql);
    return rows;
}

const getIngredientRecipeByRecipeId = async (recipe_id) => {
    let sql = "SELECT * FROM tbl_ingredient_recipe WHERE recipe_id = ?";
    const [rows, fields] = await promisePool.query(sql, [recipe_id]);
    return rows;
}

const getAllIngredients = async () => {
    let sql = "SELECT * FROM tbl_ingredient";
    const [rows, fields] = await promisePool.query(sql);
    return rows;
}

const getIngredientById = async (ingredient_id) => {
    let sql = "SELECT * FROM tbl_ingredient WHERE ingredient_id = ?";
    const [rows, fields] = await promisePool.query(sql, [ingredient_id]);
    return rows;
}

const deleteRecipe = async (recipe_id) => {
    let sql = "DELETE FROM tbl_recipe WHERE recipe_id = ?";
    await promisePool.query(sql, [recipe_id]);
}

const deleteIngredient = async (ingredient_id) => {
    let sql = "DELETE FROM tbl_ingredient WHERE ingredient_id = ?";
    await promisePool.query(sql, [ingredient_id]);
}

const updateIngredient = async ({ingredient_id, ingredient_name, ingredient_measure}) => {
    let sql = "UPDATE tbl_ingredient SET ingredient_name = ?, ingredient_measure = ? WHERE ingredient_id = ?";
    await promisePool.query(sql, [ingredient_name, ingredient_measure, ingredient_id]);
}

const getRcipeById = async (recipe_id) => {
    let sql = "SELECT * FROM tbl_recipe WHERE recipe_id = ?";
    const [rows, fields] = await promisePool.query(sql, [recipe_id]);
    return rows;
}

module.exports = {
    getUsers: getUsers,
    getRecipes: getRecipes,
    addNewUser: addNewUser,
    getUserByUsername: getUserByUsername,
    getUserLogin: getUserLogin,
    getUserById: getUserById,
    updatePassword: updatePassword,
    getUsernameAndEmail: getUsernameAndEmail,
    updateVerifyCode: updateVerifyCode,
    getIngredientByIngredientName: getIngredientByIngredientName,
    getIngredients: getIngredients,
    getIngredientRecipe: getIngredientRecipe,
    getAllIngredients: getAllIngredients,
    getIngredientRecipeByRecipeId: getIngredientRecipeByRecipeId,
    getIngredientById: getIngredientById,
    deleteRecipe: deleteRecipe,
    deleteIngredient: deleteIngredient,
    updateIngredient: updateIngredient,
    getRcipeById: getRcipeById
}