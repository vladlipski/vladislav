import React, {Component, PropTypes} from 'react';
import {Input, Select} from 'formsy-react-components';
import {getDepartments} from "../../Departament/deprtmentActions";
import {connect} from "react-redux";
import {getAllPlans, getPlansByAuthor} from "../../Plan/planActions";
import {bindActionCreators} from "redux";
import {GET_MENTORS, getCertainUsers} from "../selectors";
import {getAllUsers} from "../userActions";
import {Role} from "../../Auth/roles";
import {List} from "immutable";

const DEFAULT_ROLE = Role.STUDENT;


class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: this.props.user.get('role') || DEFAULT_ROLE
        };
        this.changeRole = this.changeRole.bind(this);
    }

    componentWillMount() {
        if (Role.isAdmin(this.props.currentUserRole)) {
            this.props.getDepartments();
            if (this.props.mentors.size === 0) {
                this.props.getAllUsers();
            }
            this.props.getAllPlans();
        } else {
            this.props.getPlansByAuthor(this.props.currentUserId);
        }
    }

    changeRole(event, value) {
        this.setState({
            userRole: value
        })
    }

    generateOptions(array, labelProperty) {
        return array.map((element) => {
            return ({
                value: element.get('id'),
                label: element.get(labelProperty)
            });
        });
    }

    renderAdminInputs() {
        const rolesOptions = List([
            {value: Role.ADMIN, label: 'Admin'},
            {value: Role.MENTOR, label: 'Mentor'},
            {value: Role.STUDENT, label: 'Student'}
        ]);

        const departmentsOptions = this.generateOptions(this.props.departmentsList.get('departments'), 'title');
        const mentorsOptions = this.generateOptions(this.props.mentors, 'username');
        const {currentUserRole, user} = this.props;

        return (
            <fieldset
                className={Role.isAdmin(currentUserRole) ? '' : 'hidden'}
            >
                <Select
                    name="role"
                    value={user.get('role') || Role.STUDENT}
                    label="Roles: "
                    options={rolesOptions}
                    onChange={this.changeRole}
                />
                {Role.isMentor(this.state.userRole) &&
                < Select
                    name="department"
                    label="Department: "
                    value={user.get('department') || (departmentsOptions.size > 0 ?
                        departmentsOptions.get(0).value :
                        '')}
                    options={departmentsOptions}
                    disabled={departmentsOptions.size === 0}
                />
                }
                {Role.isStudent(this.state.userRole) &&
                <Select
                    name="mentor"
                    label="Mentor: "
                    value={user.get('mentor') || (mentorsOptions.size > 0 ?
                        mentorsOptions.get(0).value :
                        '')}
                    options={mentorsOptions}
                    disabled={mentorsOptions.size === 0}
                />
                }
            </fieldset>
        )
    }

    render() {
        const {user, plansList} =  this.props;
        var plansOptions = List([
            {value: '', label: '---'}
        ]);
        plansOptions = plansOptions.concat(this.generateOptions(plansList.get('plans'), 'title'));
        return (
                <fieldset>
                    <Input
                        name="username"
                        value={user.get('username') || ''}
                        label="Username:"
                        type="text"
                        placeholder="username"
                        required
                    />
                    <Input
                        name="password"
                        value={user.get('password') || ''}
                        label="Password:"
                        type="password"
                        placeholder="password"
                        required
                    />

                    {this.renderAdminInputs()}

                    {Role.isStudent(this.state.userRole) &&
                        <Select
                            name="plan"
                            label="Plan: "
                            value={user.get('plan') || (plansOptions.size > 0 ?
                                plansOptions.get(0).value : ''
                            )}
                            options={plansOptions}
                            disabled={plansOptions.size === 0}
                        />
                    }
                </fieldset>
        );
    }
}

UserForm.propTypes = {
    currentUserRole: PropTypes.string,
    currentUserId: PropTypes.number,
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserRole: state.getIn(['auth', 'user', 'role']),
        departmentsList: state.getIn(['departmentsManager', 'departmentsList']),
        plansList: state.getIn(['plansManager', 'plansList']),
        mentors: getCertainUsers(state, GET_MENTORS)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDepartments: bindActionCreators(getDepartments, dispatch),
        getAllPlans: bindActionCreators(getAllPlans, dispatch),
        getPlansByAuthor: bindActionCreators(getPlansByAuthor, dispatch),
        getAllUsers: bindActionCreators(getAllUsers, dispatch)
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(UserForm)
