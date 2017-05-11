import * as jwt from "jsonwebtoken";
const JWT_SECRET = 'suzukigsf600s';
import Cookies from 'js-cookie';
import {Role} from "./Auth/roles";

const fakeDatabase = {
    users: [{
        id: 1,
        username: 'vlad',
        password: '1',
        department: null,
        mentor: null,
        role: Role.ADMIN,
        plan: null
    }, {
        id: 2,
        username: 'dima',
        password: '1',
        department: 2,
        mentor: 4,
        role: Role.STUDENT,
        plan: 2
    }, {
        id: 3,
        username: 'misha',
        password: '1',
        department: 2,
        mentor: 5,
        role: Role.STUDENT,
        plan: 3
    }, {
        id: 4,
        username: 'denis',
        password: '1',
        department: 2,
        mentor: null,
        role: Role.MENTOR,
        plan: null
    }, {
        id: 5,
        username: 'ilya',
        password: '1',
        department: 2,
        mentor: null,
        role:  Role.MENTOR,
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
        title: 'D3Q1'
    }],
    plans: [{
        id: 1,
        title: 'Plan1',
        author: {id: 4}
    }, {
        id: 2,
        title: 'Plan2',
        author: {id: 4}
    }, {
        id: 3,
        title: 'Plan3',
        author: {id: 5}
    }],
    tasks: [{
        id: 1,
        title: 'HTML + CSS',
        plan: 1
    }, {
        id: 2,
        parent: 1,
        plan: 1,
        title: 'Task HTML + CSS',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et sodales leo, non eleifend tortor. Sed cursus vel lacus vestibulum congue. ' +
            'Nulla id leo fringilla, dignissim neque nec, egestas leo. Nam dignissim cursus convallis. Vestibulum laoreet vehicula aliquam. ' +
            'In luctus ante nisl, in pharetra velit iaculis vitae. Fusce sed pharetra arcu. Curabitur aliquam tortor id metus tincidunt scelerisque.',
        status: 'new',
        type: 'coding'
    }, {
        id: 3,
        parent: 1,
        plan: 1,
        title: 'CSS',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec metus magna, maximus ut quam vel, placerat lobortis eros. ' +
            'Morbi ullamcorper congue cursus. Nunc porta leo quis felis facilisis molestie. Donec sollicitudin nisl nec volutpat elementum. ' +
            'Proin a mauris nec mauris luctus scelerisque. Maecenas sed diam ut tortor tincidunt fringilla sit amet in eros. ' +
            'Suspendisse at orci quis ex finibus laoreet vitae et justo. Curabitur sagittis diam et odio ornare, eu dictum mauris gravida. ' +
            'Morbi vehicula quam mauris, quis suscipit nisi pellentesque a. Nam porta ipsum et rhoncus vehicula. Morbi id posuere mi. In hac habitasse platea dictumst. ' +
            'Duis ut vehicula augue, sit amet blandit nisl. Morbi eget aliquam neque, porta pellentesque tortor. Morbi semper vehicula nibh, id posuere est malesuada scelerisque. ' +
            'Praesent bibendum volutpat metus, at pulvinar nisi.',
        status: 'new',
        type: 'theory'
    }, {
        id: 4,
        parent: 1,
        plan: 1,
        title: 'Software Development basics',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et sodales leo, non eleifend tortor. Sed cursus vel lacus vestibulum congue. ' +
            'Nulla id leo fringilla, dignissim neque nec, egestas leo. Nam dignissim cursus convallis. Vestibulum laoreet vehicula aliquam. ' +
            'In luctus ante nisl, in pharetra velit iaculis vitae. Fusce sed pharetra arcu. Curabitur aliquam tortor id metus tincidunt scelerisque.',
        status: 'new',
        type: 'theory'
    }, {
        id: 5,
        parent: 1,
        plan: 1,
        title: 'Web development basics',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et sodales leo, non eleifend tortor. Sed cursus vel lacus vestibulum congue. ' +
            'Nulla id leo fringilla, dignissim neque nec, egestas leo. Nam dignissim cursus convallis. Vestibulum laoreet vehicula aliquam. ' +
            'In luctus ante nisl, in pharetra velit iaculis vitae. Fusce sed pharetra arcu. Curabitur aliquam tortor id metus tincidunt scelerisque.',
        status: 'new',
        type: 'theory'
    }, {
        id: 6,
        title: 'Javascript',
        plan: 1
    }, {
        id: 7,
        parent: 6,
        plan: 1,
        title: 'Task Functional Javascript',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et sodales leo, non eleifend tortor. Sed cursus vel lacus vestibulum congue. ' +
            'Nulla id leo fringilla, dignissim neque nec, egestas leo. Nam dignissim cursus convallis. Vestibulum laoreet vehicula aliquam. ' +
            'In luctus ante nisl, in pharetra velit iaculis vitae. Fusce sed pharetra arcu. Curabitur aliquam tortor id metus tincidunt scelerisque.',
        status: 'new',
        type: 'coding'
    }, {
        id: 8,
        parent: 6,
        plan: 1,
        title: 'Javascript',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et sodales leo, non eleifend tortor. Sed cursus vel lacus vestibulum congue. ' +
            'Nulla id leo fringilla, dignissim neque nec, egestas leo. Nam dignissim cursus convallis. Vestibulum laoreet vehicula aliquam. ' +
            'In luctus ante nisl, in pharetra velit iaculis vitae. Fusce sed pharetra arcu. Curabitur aliquam tortor id metus tincidunt scelerisque.',
        status: 'new',
        type: 'theory'
    }, {
        id: 9,
        parent: 6,
        plan: 1,
        title: 'Unit testing',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et sodales leo, non eleifend tortor. Sed cursus vel lacus vestibulum congue. ' +
            'Nulla id leo fringilla, dignissim neque nec, egestas leo. Nam dignissim cursus convallis. Vestibulum laoreet vehicula aliquam. ' +
            'In luctus ante nisl, in pharetra velit iaculis vitae. Fusce sed pharetra arcu. Curabitur aliquam tortor id metus tincidunt scelerisque.',
        status: 'new',
        type: 'theory'
    }, {
        id: 10,
        parent: 6,
        plan: 1,
        title: 'FP',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et sodales leo, non eleifend tortor. Sed cursus vel lacus vestibulum congue. ' +
            'Nulla id leo fringilla, dignissim neque nec, egestas leo. Nam dignissim cursus convallis. Vestibulum laoreet vehicula aliquam. ' +
            'In luctus ante nisl, in pharetra velit iaculis vitae. Fusce sed pharetra arcu. Curabitur aliquam tortor id metus tincidunt scelerisque.',
        status: 'new',
        type: 'theory'
    }],
    completePlans: [{
        id: 1,
        author: 4,
        plansData: [
            {
                id: 1,
                title: 'HTML + CSS',
                nodes: [
                    {
                        id: 2,
                        title: 'Task HTML + CSS',
                        href: '/plans/1/tasks/2'
                    },
                    {
                        id: 3,
                        title: 'CSS',
                        href: '/plans/1/tasks/3'
                    },
                    {
                        id: 4,
                        title: 'Software Development basics',
                        href: '/plans/1/tasks/4'
                    },
                    {
                        id: 5,
                        title: 'Web development basics',
                        href: '/plans/1/tasks/5'
                    }
                ]
            }, {
                id: 6,
                title: 'Javascript',
                nodes: [
                    {
                        id: 7,
                        title: 'Task Functional Javascript',
                        href: '/plans/1/tasks/7'
                    },
                    {
                        id: 8,
                        title: 'Javascript',
                        href: '/plans/1/tasks/8'
                    },
                    {
                        id: 9,
                        title: 'Unit testing',
                        href: '/plans/1/tasks/9'
                    },
                    {
                        id: 10,
                        title: 'FP',
                        href: '/plans/1/tasks/10'
                    }
                ]
            }
        ]
    }]
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
                role: user.role,
                department: user.department
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
    return Role.isAdmin(user.role);
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
        const users = fakeDatabase.users.filter((user) => user.mentor == mentorId);
        return {
            status: 200,
            users
        };
    });

export const getUserById = (mentorId, userId) =>
    delay(500).then(() => {

        const user = Object.assign({}, fakeDatabase.users.find((user) => user.id == userId));
        if (!user.id) {
            return Promise.reject({
                errorMessage: "User doesn't exist"
            });
        }
        if (isAdmin(mentorId) || user.mentor == mentorId) {
            return {
                status: 200,
                user
            };
        }
        return Promise.reject({
            errorMessage: '403 Forbidden'
        });
    });

export const getAllPlans = () =>
    delay(500).then(() => {
        var plans = Object.assign([], fakeDatabase.plans);
        plans.map(plan => plan.author =  Object.assign({}, fakeDatabase.users.find(user => user.id == plan.author.id)));
        return {
            status: 200,
            plans
        };
    });

export const getPlansByAuthor = (authorId) =>
    delay(500).then(() => {
        var plans = Object.assign([], fakeDatabase.plans.filter((plan) => plan.author.id == authorId));
        plans.map(plan => plan.author = fakeDatabase.users.find(user => user.id == plan.author.id));
        return {
            status: 200,
            plans
        };
    });

export const getPlan = (authorId, planId) =>
    delay(500).then(() => {

        const plan = Object.assign({}, fakeDatabase.completePlans.find((plan) => plan.id == planId));
        if (!plan.id) {
            return Promise.reject({
                errorMessage: "Plan doesn't exist"
            });
        }

        if (isAdmin(authorId) || plan.author == authorId) {
            return {
                status: 200,
                plan
            };
        }

        return Promise.reject({
            errorMessage: '403 Forbidden'
        });
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
        return {
            status: 200
        };
    });

export const updateUser = (updatedUser) =>
    delay(500).then(() => {
        fakeDatabase.users[updatedUser.id - 1] = updatedUser;
        return {
            status: 200
        };
    });

export const deleteUser = (id) =>
    delay(500).then(() => {
        fakeDatabase.users = fakeDatabase.users.filter(user => user.id != id);
        return {
            status: 200
        };
    });

export const getDepartment = (id) =>
    delay(500).then(() => {
        const department = Object.assign({}, fakeDatabase.departments.find((department) => department.id == id));
        department.users = fakeDatabase.users.filter((user) => user.department == department.id);
        if (!department.id) {
            return Promise.reject({
                errorMessage: "Department doesn't exist"
            });
        }
        return {
            status: 200,
            department
        };
    });

export const createDepartment = (department) =>
    delay(500).then(() => {
        department.id = fakeDatabase.departments.length + 1;
        fakeDatabase.departments.push(department);
        return {
            status: 200
        };
    });

export const updateDepartment = (updatedDepartment) =>
    delay(500).then(() => {
        fakeDatabase.departments[updatedDepartment.id - 1] = updatedDepartment;
        return {
            status: 200
        };
    });

export const deleteDepartment = (id) =>
    delay(500).then(() => {
        fakeDatabase.departments = fakeDatabase.departments.filter(department => department.id != id);
        return {
            status: 200
        };
    });

export const getTask = (authorId, taskId) =>
    delay(500).then(() => {

        const task = Object.assign({}, fakeDatabase.tasks.find((task) => task.id == taskId));
        if (!task.id) {
            return Promise.reject({
                errorMessage: "Task doesn't exist"
            });
        }

        const plan = Object.assign({}, fakeDatabase.plans.find((plan) => plan.id == task.plan));

        if (isAdmin(authorId) || plan.author.id == authorId) {
            return {
                status: 200,
                task
            };
        }

        return Promise.reject({
            errorMessage: '403 Forbidden'
        });
    });

export const updateTask = (updatedTask) =>
    delay(500).then(() => {
        fakeDatabase.tasks[updatedTask.id - 1] = updatedTask;
        return {
            status: 200
        };
    });


