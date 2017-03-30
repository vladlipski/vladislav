import * as jwt from "jsonwebtoken";
const JWT_SECRET = 'super secret 228';

const fakeDatabase = {
    users: [{
        id: 1,
        username: 'vlad',
        password: '123',
        roles: ['admin']
    }, {
        id: 2,
        username: 'dima',
        password: '111',
        roles: ['student']
    }, {
        id: 3,
        username: 'denis',
        password: '000',
        roles: ['mentor']
    }],
};

function createToken(user) {
    return jwt.sign({ user_id: user.id }, JWT_SECRET, { expiresIn: 60*60*5 });
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