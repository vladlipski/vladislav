import React, {PropTypes} from 'react';
import {RoleAwareComponent} from 'react-router-role-authorization';
import {Select} from 'formsy-react-components';


class AdminUserForm extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.allowedRoles = ['admin'];
        this.userRoles = [this.props.currentUserRole];

        this.state = { userRole: this.props.user.role };
        this.changeRole = this.changeRole.bind(this);
    }

    changeRole(event, value) {
        this.setState({
            userRole: value
        })
    }

    render() {
        const rolesOptions = [
            {value: 'admin', label: 'Admin'},
            {value: 'mentor', label: 'Mentor'},
            {value: 'student', label: 'Student'}
        ];
        const user =  this.props.user;

        const jsx = (
            <fieldset>
                <Select
                    name="roles"
                    value={user.role}
                    label="Roles: "
                    options={rolesOptions}
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

export default AdminUserForm
