import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Alert, Col, PageHeader} from "react-bootstrap";
import {Row} from "formsy-react-components";
import {browserHistory} from 'react-router';
import {
    getDepartment, requestDepartmentDeletion, requestDepartmentUpdate, resetDeletedDepartment,
    resetSelectedDepartment, resetUpdatedDepartment
} from "./deprtmentActions";
import DepartmentForm from "./DepartmentForm";
import UsersTable from "../User/UsersList/UsersTable";
import {Role} from "../Auth/roles";
import CrudForm from "../Shared/Components/CrudForm";


class Department extends Component {
    constructor(props) {
        super(props);
        this.submitUpdatedDepartment = this.submitUpdatedDepartment.bind(this);
        this.deleteDepartmentClick = this.deleteDepartmentClick.bind(this);
    }

    reset() {
        this.props.resetSelectedDepartment();
        this.props.resetUpdatedDepartment();
        this.props.resetDeletedDepartment();
    }

    componentWillMount() {
        this.reset();
        const departmentId = this.props.params.id;
        if (departmentId) {
            this.props.getDepartment(departmentId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updatedDepartment.get('success') || nextProps.deletedDepartment.get('success')) {
            browserHistory.push('/departments');
        }
    }

    submitUpdatedDepartment(updatedDepartment) {
        const department = this.props.selectedDepartment.get('department');
        updatedDepartment.id = department.get('id');
        this.props.updateDepartment(updatedDepartment);
    }

    deleteDepartmentClick() {
        const department = this.props.selectedDepartment.get('department');
        this.props.deleteDepartment(department.get('id'));
    }

    render() {
        const selectedDepartment = this.props.selectedDepartment;
        const errorMessage = this.props.updatedDepartment.get('errorMessage') || this.props.deletedDepartment.get('errorMessage');

        if (selectedDepartment.get('isFetching')) {
            return <h1>Loading...</h1>;
        } else if(selectedDepartment.get('errorMessage')) {
            return (
                <Alert bsStyle="danger">
                    {selectedDepartment.get('errorMessage')}
                </Alert>
            )
        } else if(!selectedDepartment.get('department')) {
            return <span />
        }
        return (
            <Row>
                <PageHeader>Department: {selectedDepartment.getIn(['department', 'title'])}</PageHeader>
                {errorMessage &&
                    <Row>
                        <Alert bsStyle="danger">
                            {errorMessage}
                        </Alert>
                    </Row>
                }
                <h2>Students:</h2>
                <UsersTable
                    users={selectedDepartment.getIn(['department', 'users']).filter(
                        (user) => user.get('role') === Role.STUDENT).toJS()}
                />
                <h2>Mentors:</h2>
                <UsersTable
                    users={selectedDepartment.getIn(['department', 'users']).filter(
                        (user) => user.get('role') === Role.MENTOR).toJS()}
                />
                <br/>
                <Col smOffset={2} sm={8}>
                    <CrudForm
                        creation={false}
                        onSubmit={this.submitUpdatedDepartment}
                        onDeleteClick={this.deleteDepartmentClick}
                        popupHeader={'Delete department'}
                        popupBody={'Would you like to delete ' + selectedDepartment.getIn(['department', 'title']) + '?'}
                    >
                        <DepartmentForm
                            department={selectedDepartment.get('department').toJS()}
                        />
                    </CrudForm>
                </Col>
            </Row>
        );
    }
}

Department.propTypes = {
    selectedDepartment: PropTypes.object,
    updatedDepartment: PropTypes.object,
    deletedDepartment: PropTypes.object
};

function mapStateToProps(state) {
    return {
        selectedDepartment: state.getIn(['departmentsManager', 'selectedDepartment']),
        updatedDepartment: state.getIn(['departmentsManager', 'updatedDepartment']),
        deletedDepartment: state.getIn(['departmentsManager', 'deletedDepartment'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDepartment: bindActionCreators(getDepartment, dispatch),
        updateDepartment: bindActionCreators(requestDepartmentUpdate, dispatch),
        deleteDepartment: bindActionCreators(requestDepartmentDeletion, dispatch),
        resetSelectedDepartment: bindActionCreators(resetSelectedDepartment, dispatch),
        resetUpdatedDepartment: bindActionCreators(resetUpdatedDepartment, dispatch),
        resetDeletedDepartment: bindActionCreators(resetDeletedDepartment, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Department)
