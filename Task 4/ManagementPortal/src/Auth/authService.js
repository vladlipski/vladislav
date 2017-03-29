import * as jwt from "jsonwebtoken";

const fakeDatabase = {
    users: [{
        id: 1,
        username: 'vlad',
        password: '123',
    }, {
        id: 1,
        username: 'dima',
        password: '111',
    }, {
        id: 1,
        username: 'denis',
        password: '000',
    }],
};

function createToken(username) {
    return jwt.sign( {username}, 'secret', { expiresIn: 60*60*5 });
}

function login(request) {

    let username = request.username,
        password = request.password;

    // if (!username || !password) {
    //     return response.status(400).send("You must send the username and the password");
    // }
    //
    // var user = _.find(users, userScheme.userSearch);
    //
    // if (!user) {
    //     return response.status(401).send("The username or password don't match");
    // }
    //
    // if (user.password !== request.body.password) {
    //     return response.status(401).send("The username or password don't match");
    // }

    return {
        id_token: createToken(username)
    };
}

export const authService = (type, request) => {
    switch (type) {
        case 'login':
            return login(request);
        default:
            return null;
    }
};