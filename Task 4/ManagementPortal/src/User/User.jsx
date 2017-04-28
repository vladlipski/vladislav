import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {
    getUser, requestUserDeletion, requestUserUpdate, resetSelectedUser, resetDeletedUser,
    resetUpdatedUser
} from "./userActions";
import {bindActionCreators} from "redux";
import {Alert, Col, PageHeader} from "react-bootstrap";
import UserForm from "./UserForm";
import {Row} from "formsy-react-components";
import {browserHistory} from 'react-router';
import CrudForm from "../Shared/Components/CrudForm";


class User extends Component {
    constructor(props) {
        super(props);
        this.submitUpdatedUser = this.submitUpdatedUser.bind(this);
        this.deleteUserClick = this.deleteUserClick.bind(this);
    }

    reset() {
        this.props.resetSelectedUser();
        this.props.resetUpdatedUser();
        this.props.resetDeletedUser();
    }

    componentWillMount() {
        this.reset();
        const userId = this.props.params.id;
        if (userId) {
            this.props.getUser(this.props.currentUserId, userId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updatedUser.get('success') || nextProps.deletedUser.get('success')) {
            browserHistory.push('/users');
        }
    }

    submitUpdatedUser(updatedUser) {
        const user = this.props.selectedUser.get('user');
        updatedUser.id = user.get('id');
        this.props.updateUser(updatedUser);
    }

    deleteUserClick() {
        const user = this.props.selectedUser.get('user');
        this.props.deleteUser(user.get('id'));
    }

    render() {
        const selectedUser = this.props.selectedUser.toJS();
        const errorMessage = this.props.updatedUser.get('errorMessage') || this.props.deletedUser.get('errorMessage');

        if (selectedUser.isFetching) {
            return <h1>Loading...</h1>;
        } else if(selectedUser.errorMessage) {
            return (
                <Alert bsStyle="danger">
                    {selectedUser.errorMessage}
                </Alert>
            )
        } else if(!selectedUser.user) {
            return <span />
        }

        return (
            <Row>
                <PageHeader>User: {selectedUser.user.username}</PageHeader>
                {errorMessage &&
                    <Row>
                        <Alert bsStyle="danger">
                            {errorMessage}
                        </Alert>
                    </Row>
                }
                <Col smOffset={2} sm={8}>
                    <CrudForm
                        creation={false}
                        onSubmit={this.submitUpdatedUser}
                        onDeleteClick={this.deleteUserClick}
                        popupHeader={'Delete user'}
                        popupBody={'Would you like to delete ' + selectedUser.user.username + '?'}
                    >
                        <UserForm
                            user={selectedUser.user}
                        />
                    </CrudForm>
                </Col>
            </Row>
        );
    }
}

User.propTypes = {
    currentUserId: PropTypes.number,
    selectedUser: PropTypes.object,
    updatedUser: PropTypes.object,
    deletedUser: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserId:  state.getIn(['auth', 'user', 'id']),
        selectedUser:  state.getIn(['usersManager', 'selectedUser']),
        updatedUser: state.getIn(['usersManager', 'updatedUser']),
        deletedUser: state.getIn(['usersManager', 'deletedUser'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: bindActionCreators(getUser, dispatch),
        updateUser: bindActionCreators(requestUserUpdate, dispatch),
        deleteUser: bindActionCreators(requestUserDeletion, dispatch),
        resetSelectedUser: bindActionCreators(resetSelectedUser, dispatch),
        resetUpdatedUser: bindActionCreators(resetUpdatedUser, dispatch),
        resetDeletedUser: bindActionCreators(resetDeletedUser, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
