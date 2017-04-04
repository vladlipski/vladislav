import React, {Component, PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import {Alert, ControlLabel, FormGroup, Grid, PageHeader} from 'react-bootstrap';
import {connect} from "react-redux";
import {browserHistory} from 'react-router';
import {bindActionCreators} from "redux";
import {loginUser} from "./authActions";
import {Form, Input, Row} from 'formsy-react-components';

class Login extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
            browserHistory.push('/');
        }
    }

    loginClick(values) {
        const username = values.username;
        const password = values.password;
        this.props.loginUser(username.trim(), password.trim());
    }

    render() {
        const { errorMessage } = this.props;

        return (
            <Grid>
                <PageHeader>Students Lab Management Portal</PageHeader>
                <Form
                    onValidSubmit={this.loginClick.bind(this)}>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Username
                        </Col>
                        <Col sm={6}>
                            <Input
                                layout={'elementOnly'}
                                name="username"
                                placeholder="Username"
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={3}>
                            Password
                        </Col>
                        <Col sm={6}>
                            <Input
                                layout={'elementOnly'}
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </Col>
                    </FormGroup>

                    {errorMessage &&
                        <FormGroup>
                            <Col smOffset={3} sm={6}>
                                <Alert bsStyle="danger">
                                    {errorMessage}
                                </Alert>
                            </Col>
                        </FormGroup>
                    }

                    <FormGroup>
                        <Col smOffset={3} sm={6}>
                            <Button type="submit">
                                Sign in
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Grid>
        );
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: bindActionCreators(loginUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
