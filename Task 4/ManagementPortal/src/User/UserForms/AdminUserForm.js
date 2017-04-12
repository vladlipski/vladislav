import React, {PropTypes} from 'react';
import {RoleAwareComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {Select} from 'formsy-react-components';


class AdminUserForm extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.allowedRoles = ['admin'];
        this.userRoles = [this.props.currentUserRole];

        this.state = { userRole: 'admin' };
        this.changeRole = this.changeRole.bind(this);
    }

    changeRole(event, value) {
        this.setState({
            userRole: value
        })
    }

    render() {
        const roles = [
            {value: 'admin', label: 'Admin'},
            {value: 'mentor', label: 'Mentor'},
            {value: 'student', label: 'Student'}
        ];

        const jsx = (
            <fieldset>
                <Select
                    name="roles"
                    value={'admin'}
                    label="Roles: "
                    options={roles}
                    onChange={this.changeRole}
                    required
                />
                {this.state.userRole === 'mentor' &&
                    < Select
                        name="department"
                        label="Department: "
                        options={[]}
                        required
                    />
                }
                {this.state.userRole === 'student' &&
                    <fieldset>
                        <Select
                            name="mentor"
                            label="Mentor: "
                            options={[]}
                        />
                        <Select
                            name="plan"
                            label="Plan: "
                            options={[]}
                        />
                    </fieldset>
                }
            </fieldset>
        );

        return this.rolesMatched() ? jsx : null;
    }
}

AdminUserForm.propTypes = {
    currentUserRole: PropTypes.string
};

function mapStateToProps(state) {
    return {
        currentUserRole: state.auth.user.role
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserForm)
