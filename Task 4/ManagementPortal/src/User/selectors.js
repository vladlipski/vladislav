import { createSelector } from 'reselect'

export const GET_MENTORS = 'GET_MENTORS';

const getUserFilter = (state, filter) => filter;
const getUsers = (state) => state.usersManager.usersList.users;

export const getCertainUsers = createSelector(
    [ getUserFilter, getUsers ],
    (userFilter, users) => {
        switch (userFilter) {
            case GET_MENTORS:
                return users.filter((user) => user.role === 'mentor')
        }
    }
);