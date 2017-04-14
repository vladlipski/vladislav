import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import {Form, Input, Row, Select} from 'formsy-react-components';
import {getDepartments} from "../../Departament/deprtmentActions";
import {connect} from "react-redux";
import {getPlans} from "../../Plan/planActions";
import {bindActionCreators} from "redux";
import {GET_MENTORS, getCertainUsers} from "../selectors";
import {getAllUsers} from "../userActions";


class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = { userRole: this.props.user.role || 'student' };
        this.changeRole = this.changeRole.bind(this);
    }

    componentWillMount() {
        if (this.props.currentUserRole === 'admin') {
            this.props.getDepartments();
            if (this.props.mentors.length === 0) {
                this.props.getAllUsers();
            }
        }
        this.props.getPlans();
    }

    changeRole(event, value) {
        this.setState({
            userRole: value
        })
    }

    getOptions(array) {
        return array.map((element) => {
            return ({
                value: element.id,
                label: element.title || element.username
            });
        });
    }

    renderAdminInputs() {
        const rolesOptions = [
            {value: 'admin', label: 'Admin'},
            {value: 'mentor', label: 'Mentor'},
            {value: 'student', label: 'Student'}
        ];
        const departmentsOptions = this.getOptions(this.props.departmentsList.departments);
        const mentorsOptions = this.getOptions(this.props.mentors);
        const user = this.props.user;

        return (
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
                    value={user.department || ''}
                    options={departmentsOptions}
                    required
                />
                }
                {this.state.userRole === 'student' &&
                <Select
                    name="mentor"
                    label="Mentor: "
                    value={user.mentor || ''}
                    options={mentorsOptions}
                />
                }
            </fieldset>
        )
    }

    render() {
        const {currentUserRole, user, plansList} =  this.props;
        const plansOptions = this.getOptions(plansList.plans);

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
                    {currentUserRole === 'admin' &&
                        this.renderAdminInputs()
                    }
                    {this.state.userRole === 'student' &&
                        <Select
                            name="plan"
                            label="Plan: "
                            value={user.plan || ''}
                            options={plansOptions}
                        />
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
    onSubmit: PropTypes.func
};

function mapStateToProps(state) {
    return {
        departmentsList: state.departmentsManager.departmentsList,
        plansList: state.plansManager.plansList,
        mentors: getCertainUsers(state, GET_MENTORS)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDepartments: bindActionCreators(getDepartments, dispatch),
        getPlans: bindActionCreators(getPlans, dispatch),
        getAllUsers: bindActionCreators(getAllUsers, dispatch)
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(UserForm)
