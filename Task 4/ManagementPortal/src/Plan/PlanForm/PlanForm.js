import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {Input, Select} from "formsy-react-components";
import {Role} from "../../Auth/roles";
import {GET_MENTORS, getCertainUsers} from "../../User/selectors";
import {getAllUsers} from "../../User/userActions";
import {List} from "immutable";
import {bindActionCreators} from "redux";
import {generateOptions} from "../../Shared/utils";


class PlanForm extends Component {
    componentWillMount() {
        if (Role.isAdmin(this.props.currentUserRole)) {
            if (this.props.mentors.size === 0) {
                this.props.getAllUsers();
            }
        }
    }

    render() {
        const plan = this.props.plan;
        const mentorsOptions = generateOptions(this.props.mentors, 'username');

        return (
            <fieldset>
                <Input
                    name="title"
                    value={plan ? plan.get('title') : ''}
                    label="Title:"
                    type="text"
                    placeholder="title"
                    required
                />
                { Role.isAdmin(this.props.currentUserRole) &&
                    <Select
                        name="author"
                        label="Author: "
                        value={plan ? plan.get('author') : (mentorsOptions.size > 0 ?
                            mentorsOptions.get(0).value :
                            '')}
                        options={mentorsOptions}
                        disabled={mentorsOptions.size === 0}
                    />
                }
            </fieldset>
        );
    }
}

PlanForm.propTypes = {
    plan: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserRole: state.getIn(['auth', 'user', 'role']),
        mentors: getCertainUsers(state, GET_MENTORS)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUsers: bindActionCreators(getAllUsers, dispatch),

    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(PlanForm)
