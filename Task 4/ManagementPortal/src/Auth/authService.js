import * as jwt from "jsonwebtoken";
const JWT_SECRET = 'suzuki';

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

function createToken(payload) {
    return jwt.sign(payload, JWT_SECRET);
}

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