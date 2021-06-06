module.exports = {
    UserResponseFactor: ( {user_id, user_name, user_password, user_age} ) => {
        return {user_id, user_name, user_password, user_age}
    },

    UserRequestFactor: ( {user_id} ) => {
        if (!user_id) {
            throw new Error("user_id key not define")
        }
        return {user_id}
    },

    AddUserFactor: ({ user_name, user_password, user_email }) => {
        console.log(user_name, user_password, user_email)
        if(!user_name || !user_password || !user_email)
        {
            throw new Error("user is not define")
        }
        return { user_name, user_password, user_email }
    }
}