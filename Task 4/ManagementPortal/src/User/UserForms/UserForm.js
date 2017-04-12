import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import {Form, Input, Row, Select} from 'formsy-react-components';
import AdminUserForm from "./AdminUserForm";


class UserForm extends Component {
    render() {
        const {currentUserRole, activeUser} =  this.props;

        return (
            <Form
                onValidSubmit={() => {}}
                noValidate
            >
                <fieldset>
                    <Input
                        name="username"
                        value={activeUser.user.username}
                        label="Username:"
                        type="text"
                        placeholder="username"
                        required
                    />
                    <Input
                        name="password"
                        value={activeUser.user.password}
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
                <AdminUserForm />
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
    activeUser: PropTypes.object
};

export default UserForm
