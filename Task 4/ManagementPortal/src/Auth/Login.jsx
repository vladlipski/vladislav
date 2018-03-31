import React, {Component, PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import {Alert, Grid, PageHeader} from 'react-bootstrap';
import {connect} from "react-redux";
import {browserHistory} from 'react-router';
import {bindActionCreators} from "redux";
import {loginUser} from "./authActions";
import {Form, Input, Row} from 'formsy-react-components';
import "./login-form.css";


class Login extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
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
                <Col className="login-form" smOffset={2} sm={7}>
                    <Form
                        onValidSubmit={this.loginClick.bind(this)}
                        noValidate
                    >
                        <Input
                            label="Username:"
                            name="username"
                            placeholder="Username"
                            required
                            validationErrors={{
                                isDefaultRequiredValue: 'Username is required.'
                            }}
                        />

                        <Input
                            label="Password:"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            validationErrors={{
                                isDefaultRequiredValue: 'Password is required.'
                            }}
                        />

                        {errorMessage &&
                            <Row layout={'horizontal'}>
                                <Alert bsStyle="danger">
                                    {errorMessage}
                                </Alert>
                            </Row>
                        }

                        <Row layout={'horizontal'}>
                            <Button type="submit">
                                Log in
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Grid>
        );
    }
}

Login.propTypes = {
    user: PropTypes.object,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
    return {
        user: state.getIn(['auth', 'user']),
        errorMessage: state.getIn(['auth', 'errorMessage'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: bindActionCreators(loginUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
