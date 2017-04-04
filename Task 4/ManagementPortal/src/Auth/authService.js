import * as jwt from "jsonwebtoken";
const JWT_SECRET = 'suzukigsf600s';
import Cookies from 'js-cookie';

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
            const id_token = createToken({
                id: user.id,
                username: user.username,
                roles: user.roles
            });
            Cookies.set('id_token', id_token);
            return id_token
        }
        return null;
    });