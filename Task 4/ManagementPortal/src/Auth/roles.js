const ROLES = {
    ADMIN: 'admin',
    MENTOR: 'mentor',
    STUDENT: 'student'
};

ROLES.isAdmin = role =>  role === ROLES.ADMIN;

ROLES.isMentor = role =>  role === ROLES.MENTOR;

ROLES.isStudent = role =>  role === ROLES.STUDENT;

export const Role = ROLES;