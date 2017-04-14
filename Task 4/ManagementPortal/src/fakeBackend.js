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
        role: 'admin',
        plan: null
    }, {
        id: 2,
        username: 'dima',
        password: '1',
        department: 2,
        mentor: 4,
        role: 'student',
        plan: 2
    }, {
        id: 3,
        username: 'misha',
        password: '1',
        department: 3,
        mentor: 5,
        role: 'student',
        plan: 3
    }, {
        id: 4,
        username: 'denis',
        password: '1',
        department: 2,
        mentor: null,
        role: 'mentor',
        plan: null
    }, {
        id: 5,
        username: 'ilya',
        password: '1',
        department: 3,
        mentor: null,
        role: 'mentor',
        plan: null
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
    plans: [{
        id: 1,
        title: 'Plan1'
    }, {
        id: 2,
        title: 'Plan2'
    }, {
        id: 3,
        title: 'Plan3'
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
                role: user.role
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

function isAdmin(id) {
    const user = fakeDatabase.users.find((user) => user.id === id);
    return user.role === 'admin';
}

export const getAllUsers = () =>
    delay(500).then(() => {
        const users = fakeDatabase.users;
        return {
            status: 200,
            users
        };
    });

export const getUsersByMentor = (mentorId) =>
    delay(500).then(() => {
        const users = fakeDatabase.users.filter((user) => user.mentor === mentorId);
        return {
            status: 200,
            users
        };
    });

export const getUserById = (mentorId, userId) =>
    delay(500).then(() => {
        const user = Object.assign({}, fakeDatabase.users.find((user) => String(user.id) === userId));
        if (!user) {
            return Promise.reject({
                errorMessage: "User doesn't exist"
            });
        }

        if (isAdmin(mentorId) || user.mentor === mentorId) {
            return {
                status: 200,
                user
            };
        }
        return Promise.reject({
            errorMessage: '403 Forbidden'
        });
    });

export const getPlans = () =>
    delay(500).then(() => {
        const plans = fakeDatabase.plans;
        return {
            status: 200,
            plans
        };
    });

export const getDepartments = () =>
    delay(500).then(() => {
        const departments = fakeDatabase.departments;
        return {
            status: 200,
            departments
        };
    });

export const createUser = (user) =>
    delay(500).then(() => {
        user.id = fakeDatabase.users.length + 1;
        fakeDatabase.users.push(user);
        console.log('User created!');
        return {
            status: 200
        };
    });