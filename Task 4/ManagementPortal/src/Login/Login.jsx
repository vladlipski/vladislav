import React, { Component, PropTypes } from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import {ControlLabel, PageHeader} from 'react-bootstrap';

class Login extends Component {
    render() {
        return (
            <div>
                <PageHeader>Students Lab Management Portal</PageHeader>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Email
                        </Col>
                        <Col sm={6}>
                            <FormControl type="email" placeholder="Email" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={3}>
                            Password
                        </Col>
                        <Col sm={6}>
                            <FormControl type="password" placeholder="Password" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={3} sm={6}>
                            <Button type="submit">
                                Sign in
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default Login;
