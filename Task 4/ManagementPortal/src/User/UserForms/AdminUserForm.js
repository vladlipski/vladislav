import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import {connect} from "react-redux";
import {Form, Input, Row, Select} from 'formsy-react-components';


class AdminUserForm extends Component {
    constructor() {
        super();
        this.state = { userRole: 'admin' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value) {
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

        return (
            <Form
                onValidSubmit={() => {}}
                noValidate
            >
                <fieldset>
                    <Select
                        name="roles"
                        value={'admin'}
                        label="Roles: "
                        options={roles}
                        onChange={this.handleChange}
                        required
                    />
                    <Input
                        name="username"
                        value=""
                        label="Username:"
                        type="text"
                        placeholder="username"
                        required
                    />
                    <Input
                        name="password"
                        value=""
                        label="Password:"
                        type="text"
                        placeholder="This is a date input."
                        required
                    />
                    {this.state.userRole === 'mentor' &&
                         < Select
                            name="department"
                            label="Department: "
                            options={[]}
                        />
                    }
                </fieldset>
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
                <Row layout={'horizontal'}>
                    <Button type="submit">
                        Ok
                    </Button>
                </Row>
            </Form>
        );
    }
}

AdminUserForm.propTypes = {
};

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserForm)
