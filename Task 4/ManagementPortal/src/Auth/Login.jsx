import React, { Component, PropTypes } from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import {ControlLabel, Grid, PageHeader} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loginUser} from "./authActions";
import * as ReactDOM from "react-dom";


class Login extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
            nextProps.router.push('/');
        }
    }

    loginClick() {
        const username = ReactDOM.findDOMNode(this.refs.username);
        const password = ReactDOM.findDOMNode(this.refs.password);

        const creds = {
            username: username.value.trim(),
            password: password.value.trim()
        };
        this.props.loginUser(creds);
    }

    render() {
        const {  errorMessage } = this.props;

        return (
            <Grid>
                <PageHeader>Students Lab Management Portal</PageHeader>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Username
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" placeholder="Username" ref="username"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={3}>
                            Password
                        </Col>
                        <Col sm={6}>
                            <FormControl type="password" placeholder="Password" ref="password"/>
                        </Col>
                    </FormGroup>

                    {errorMessage &&
                        <p style={{color:'red'}}>{errorMessage}</p>
                    }

                    <FormGroup>
                        <Col smOffset={3} sm={6}>
                            <Button onClick={() => this.loginClick()}>
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
