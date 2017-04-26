import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {Alert, PageHeader} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {browserHistory} from 'react-router';
import {Row} from "formsy-react-components";
import CrudForm from "../CrudForm";
import DepartmentForm from "./DepartmentForm/DepartmentForm";
import {requestDepartmentCreation, resetNewDepartment} from "./deprtmentActions";


class DepartmentNew extends Component {
    constructor(props) {
        super(props);
        this.submitNewDepartment = this.submitNewDepartment.bind(this);
    }

    componentWillMount() {
        this.props.resetNewDepartment();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newDepartment.success) {
            browserHistory.push('/departments');
        }
    }

    submitNewDepartment(newDepartment) {
        this.props.createDepartment(newDepartment);
    }

    render() {
        const errorMessage = this.props.newDepartment.errorMessage;
        return (
            <Row>
                <PageHeader>New department</PageHeader>
                {errorMessage &&
                <Row>
                    <Alert bsStyle="danger">
                        {errorMessage}
                    </Alert>
                </Row>
                }

                <CrudForm
                    creation={true}
                    onSubmit={this.submitNewDepartment}
                >
                    <DepartmentForm
                        department={{}}
                    />
                </CrudForm>
            </Row>
        );
    }
}

DepartmentNew.propTypes = {
    newDepartment: PropTypes.object
};

function mapStateToProps(state) {
    return {
        newDepartment: state.departmentsManager.newDepartment
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createDepartment: bindActionCreators(requestDepartmentCreation, dispatch),
        resetNewDepartment: bindActionCreators(resetNewDepartment, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentNew)