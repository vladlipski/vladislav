import React, {Component, PropTypes} from 'react';
import {Input} from 'formsy-react-components';


class DepartmentForm extends Component {

    render() {
        const {department} =  this.props;

        return (
            <fieldset>
                <Input
                    name="title"
                    value={department.title || ''}
                    label="Title:"
                    type="text"
                    placeholder="title"
                    required
                />
            </fieldset>
        );
    }
}

DepartmentForm.propTypes = {
    department: PropTypes.object
};

export default DepartmentForm
