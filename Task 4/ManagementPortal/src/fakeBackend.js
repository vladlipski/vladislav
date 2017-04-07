import * as jwt from "jsonwebtoken";
const JWT_SECRET = 'suzukigsf600s';
import Cookies from 'js-cookie';

const fakeDatabase = {
    users: [{
        id: 1,
        username: 'vlad',
        password: '1',
        department: null,
        mentor: null,
        roles: ['admin']
    }, {
        id: 2,
        username: 'dima',
        password: '1',
        department: 1,
        mentor: 4,
        roles: ['student']
    }, {
        id: 3,
        username: 'misha',
        password: '1',
        department: 1,
        mentor: 4,
        roles: ['student']
    }, {
        id: 4,
        username: 'denis',
        password: '1',
        department: 1,
        mentor: null,
        roles: ['mentor']
    }],
    departments: [{
        id: 1,
        title: 'D1'
    }, {
        id: 2,
        title: 'D2'
    }, {
        id: 3,
        title: 'D3'
    }],
};

export const verifyToken = function (token) {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (e)
    {
        return null;
    }
};

const createToken = (payload) =>
    jwt.sign(payload, JWT_SECRET);

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const login = (username, password) =>
    delay(500).then(() => {
        const user = fakeDatabase.users.find((element) => element.username === username);
        const response = {
            status: 401
        };
        if (user && user.password === password)
        {
            const userData = {
                id: user.id,
                username: user.username,
                roles: user.roles
            };
            const id_token = createToken(userData);
            Cookies.set('id_token', id_token);
            response.status = 200;
            response.user = userData;
            return response;
        }
        response.errorMessage = 'Incorrect username or password.';
        return Promise.reject(response);
    });

export const getUsersByMentor = (mentorId) =>
    delay(500).then(() => {
        var users;
        if (mentorId === 0) {
            users = fakeDatabase.users;
        } else {
            users = fakeDatabase.users.filter((user) => user.mentor === mentorId);
        }
        return {
            status: 200,
            users
        };
    });