import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Alert, PageHeader} from "react-bootstrap";
import {Row} from "formsy-react-components";
import {browserHistory} from 'react-router';
import CrudForm from "../CrudForm";
import {
    getDepartment, requestDepartmentDeletion, requestDepartmentUpdate, resetDeletedDepartment,
    resetSelectedDepartment, resetUpdatedDepartment
} from "./deprtmentActions";
import DepartmentForm from "./DepartmentForm";


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
        if (nextProps.updatedDepartment.success || nextProps.deletedDepartment.success) {
            browserHistory.push('/departments');
        }
    }

    submitUpdatedDepartment(updatedDepartment) {
        const department = this.props.selectedDepartment.department;
        updatedDepartment.id = department.id;
        this.props.updateDepartment(updatedDepartment);
    }

    deleteDepartmentClick() {
        const department = this.props.selectedDepartment.department;
        this.props.deleteDepartment(department.id);
    }

    render() {
        const selectedDepartment = this.props.selectedDepartment;
        const errorMessage = this.props.updatedDepartment.errorMessage || this.props.deletedDepartment.errorMessage;

        if (selectedDepartment.isFetching) {
            return <h1>Loading...</h1>;
        } else if(selectedDepartment.errorMessage) {
            return (
                <Alert bsStyle="danger">
                    {selectedDepartment.errorMessage}
                </Alert>
            )
        } else if(!selectedDepartment.department) {
            return <span />
        }

        return (
            <Row>
                <PageHeader>Department: {selectedDepartment.department.title}</PageHeader>
                {errorMessage &&
                <Row>
                    <Alert bsStyle="danger">
                        {errorMessage}
                    </Alert>
                </Row>
                }
                <CrudForm
                    creation={false}
                    onSubmit={this.submitUpdatedDepartment}
                    onDeleteClick={this.deleteDepartmentClick}
                    popupHeader={'Delete department'}
                    popupBody={'Would you like to delete ' + selectedDepartment.department.title + '?'}
                >
                    <DepartmentForm
                        department={selectedDepartment.department}
                    />
                </CrudForm>
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
        selectedDepartment: state.departmentsManager.selectedDepartment,
        updatedDepartment: state.departmentsManager.updatedDepartment,
        deletedDepartment: state.departmentsManager.deletedDepartment
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
