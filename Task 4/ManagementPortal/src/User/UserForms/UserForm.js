import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import {Form, Input, Row, Select} from 'formsy-react-components';
import {getDepartments} from "../../Departament/deprtmentActions";
import {connect} from "react-redux";
import {getPlans} from "../../Plan/planActions";
import {bindActionCreators} from "redux";
import {GET_MENTORS, getCertainUsers} from "../selectors";
import {getAllUsers} from "../userActions";
import {ButtonToolbar, Modal} from "react-bootstrap";
import {Role} from "../../Auth/roles";


class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: this.props.user.role || Role.STUDENT,
            showModal: false
        };
        this.changeRole = this.changeRole.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    componentWillMount() {
        if (Role.isAdmin(this.props.currentUserRole)) {
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

    generateOptions(array, labelProperty) {
        return array.map((element) => {
            return ({
                value: element.id,
                label: element[labelProperty]
            });
        });
    }

    renderAdminInputs() {
        const rolesOptions = [
            {value: Role.ADMIN, label: 'Admin'},
            {value: Role.MENTOR, label: 'Mentor'},
            {value: Role.STUDENT, label: 'Student'}
        ];
        const departmentsOptions = this.generateOptions(this.props.departmentsList.departments, 'title');
        const mentorsOptions = this.generateOptions(this.props.mentors, 'username');
        const {currentUserRole, user} = this.props;

        return (
            <fieldset
                className={Role.isAdmin(currentUserRole) ? '' : 'hidden'}
            >
                <Select
                    name="role"
                    value={user.role || Role.STUDENT}
                    label="Roles: "
                    options={rolesOptions}
                    onChange={this.changeRole}
                />
                {Role.isMentor(this.state.userRole) &&
                < Select
                    name="department"
                    label="Department: "
                    value={user.department || (departmentsOptions.length > 0 ?
                        departmentsOptions[0].value :
                        '')}
                    options={departmentsOptions}
                    disabled={departmentsOptions.length === 0}
                />
                }
                {Role.isStudent(this.state.userRole) &&
                <Select
                    name="mentor"
                    label="Mentor: "
                    value={user.mentor || (mentorsOptions.length > 0 ?
                        mentorsOptions[0].value :
                        '')}
                    options={mentorsOptions}
                    disabled={mentorsOptions.length === 0}
                />
                }
            </fieldset>
        )
    }

    render() {
        const {user, plansList} =  this.props;
        const plansOptions = this.generateOptions(plansList.plans, 'title');

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
                        type="password"
                        placeholder="password"
                        required
                    />

                    {this.renderAdminInputs()}

                    {Role.isStudent(this.state.userRole) &&
                        <Select
                            name="plan"
                            label="Plan: "
                            value={user.plan || (plansOptions.length > 0 ?
                                plansOptions[0].value :
                                '')}
                            options={plansOptions}
                            disabled={plansOptions.length === 0}
                        />
                    }

                    <Modal show={this.state.showModal} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete user</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Would you like to delete {this.props.user.username}?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                onClick={() => {
                                    this.props.onDeleteClick();
                                    this.closeModal();
                                }}
                                bsStyle="danger"
                            >
                                Yes
                            </Button>
                            <Button onClick={this.closeModal}>No</Button>
                        </Modal.Footer>
                    </Modal>
                </fieldset>
                <Row layout={'horizontal'}>
                    <ButtonToolbar>
                        <Button type="submit">Ok</Button>
                        <Button
                            onClick={this.openModal}
                            bsStyle="danger"
                            className={this.props.user.id ? '' : 'hidden'}
                        >
                            Delete
                        </Button>
                    </ButtonToolbar>
                </Row>
            </Form>
        );
    }
}

UserForm.propTypes = {
    currentUserRole: PropTypes.string,
    user: PropTypes.object,
    onSubmit: PropTypes.func,
    onDeleteClick: PropTypes.func
};

function mapStateToProps(state) {
    return {
        currentUserRole: state.auth.user.role,
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
