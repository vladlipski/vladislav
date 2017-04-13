import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import {Form, Input, Row, Select} from 'formsy-react-components';
import AdminUserForm from "./AdminUserForm";


class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = { userRole: this.props.user.role };
        this.changeRole = this.changeRole.bind(this);
    }

    getPlansOptions() {
        return this.props.plans.map((plan) => {
            return ({
                value: plan.id,
                label: plan.title
            });
        });
    }

    changeRole(event, value) {
        this.setState({
            userRole: value
        })
    }

    render() {
        const {currentUserRole, user} =  this.props;
        const plansOptions = this.getPlansOptions();
        const rolesOptions = [
            {value: 'admin', label: 'Admin'},
            {value: 'mentor', label: 'Mentor'},
            {value: 'student', label: 'Student'}
        ];

        return (
            <Form
                onValidSubmit={this.props.onSubmit}
                noValidate
            >
                <fieldset>
                    <Input
                        name="username"
                        value={user.username || ''}
                        label="Username:"
                        type="text"
                        placeholder="username"
                        required
                    />
                    <Input
                        name="password"
                        value={user.password || ''}
                        label="Password:"
                        type="text"
                        placeholder="password"
                        required
                    />
                    <Select
                        name="roles"
                        value={user.role}
                        label="Roles: "
                        options={rolesOptions}
                        onChange={this.changeRole}
                        required
                        disabled={currentUserRole !== 'admin'}
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
                            disabled={currentUserRole !== 'admin'}
                        />
                        <Select
                            name="plan"
                            label="Plan: "
                            value={user.plan ? user.plan.id : ''}
                            options={plansOptions}
                        />
                    </fieldset>
                    }
                </fieldset>
                <Row layout={'horizontal'}>
                    <Button type="submit">
                        Ok
                    </Button>
                </Row>
            </Form>
        );
    }
}

UserForm.propTypes = {
    currentUserRole: PropTypes.string,
    user: PropTypes.object,
    onSubmit: PropTypes.func,
    plans: PropTypes.array
};

export default UserForm
