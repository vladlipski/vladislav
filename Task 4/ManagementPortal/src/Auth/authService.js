import * as jwt from "jsonwebtoken";
const JWT_SECRET = 'suzukigsf600s';

const fakeDatabase = {
    users: [{
        id: 1,
        username: 'vlad',
        password: '1',
        roles: ['admin']
    }, {
        id: 2,
        username: 'dima',
        password: '2',
        roles: ['student']
    }, {
        id: 3,
        username: 'denis',
        password: '3',
        roles: ['mentor']
    }],
};

export const verifyToken = function (token) {
    if (!token) {
        return false;
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return !!payload;
    }
    catch (e)
    {
        return false;
    }
};

const createToken = (payload) =>
    jwt.sign(payload, JWT_SECRET);

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const login = (username, password) =>
    delay(500).then(() => {
        const user = fakeDatabase.users.find((element) => element.username === username);
        if (!user) {
            return null;
        }
        if (user.password === password)
        {
            return createToken({
                id: user.id,
                username: user.username,
                roles: user.roles
            })
        }
        return null;
    });