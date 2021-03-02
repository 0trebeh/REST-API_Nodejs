module.exports = {
    //Querys user
    getUsers:'SELECT * FROM app_user ORDER BY user_id ASC',
    getUserById: 'SELECT * FROM app_user WHERE user_id = $1',
    getLogin: 'SELECT * FROM app_user WHERE username = $1 AND password = $2',
    createUser: 'INSERT INTO app_user (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    updateUser: 'UPDATE app_user SET username = $1, email = $2, password = $3, avatar = $4 WHERE user_id = $5 RETURNING *',
    deleteUser: 'DELETE FROM app_user where user_id = $1',
}