import { createSelector } from 'reselect'
import {Role} from "../Auth/roles";

export const GET_MENTORS = 'GET_MENTORS';

const getUserFilter = (state, filter) => filter;
const getUsers = (state) => state.usersManager.usersList.users;

export const getCertainUsers = createSelector(
    [ getUserFilter, getUsers ],
    (userFilter, users) => {
        switch (userFilter) {
            case GET_MENTORS:
                return users.filter((user) => Role.isMentor(user.role))
        }
    }
);