import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {Alert, Col, PageHeader} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {browserHistory} from 'react-router';
import {Row} from "formsy-react-components";
import DepartmentForm from "./DepartmentForm/DepartmentForm";
import {requestDepartmentCreation, resetNewDepartment} from "./deprtmentActions";
import CrudForm from "../Shared/Components/CrudForm";


class DepartmentNew extends Component {
    constructor(props) {
        super(props);
        this.submitNewDepartment = this.submitNewDepartment.bind(this);
    }

    componentWillMount() {
        this.props.resetNewDepartment();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newDepartment.get('success')) {
            browserHistory.push('/departments');
        }
    }

    submitNewDepartment(newDepartment) {
        this.props.createDepartment(newDepartment);
    }

    render() {
        const errorMessage = this.props.newDepartment.get('errorMessage');
        return (
            <Col smOffset={2} sm={7}>
                <PageHeader>New department</PageHeader>
                {errorMessage &&
                <Row>
                    <Alert bsStyle="danger">
                        {errorMessage}
                    </Alert>
                </Row>
                }
                <Col smOffset={2} sm={8}>
                    <CrudForm
                        creation={true}
                        onSubmit={this.submitNewDepartment}
                    >
                        <DepartmentForm
                            department={{}}
                        />
                    </CrudForm>
                </Col>
            </Col>
        );
    }
}

DepartmentNew.propTypes = {
    newDepartment: PropTypes.object
};

function mapStateToProps(state) {
    return {
        newDepartment: state.getIn(['departmentsManager', 'newDepartment'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createDepartment: bindActionCreators(requestDepartmentCreation, dispatch),
        resetNewDepartment: bindActionCreators(resetNewDepartment, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentNew)
