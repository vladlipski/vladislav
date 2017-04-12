import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import {Form, Input, Row, Select} from 'formsy-react-components';
import AdminUserForm from "./AdminUserForm";


class UserForm extends Component {
    render() {
        const {currentUserRole, user} =  this.props;

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
                    {currentUserRole === 'mentor' &&
                        <Select
                            name="plan"
                            label="Plan: "
                            options={[]}
                        />
                    }
                </fieldset>
                <AdminUserForm
                    currentUserRole={currentUserRole}
                    user={user}
                />
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
    activeUser: PropTypes.object,
    onSubmit: PropTypes.func
};

export default UserForm
