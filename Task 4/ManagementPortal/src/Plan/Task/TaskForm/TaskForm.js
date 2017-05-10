import React, {Component, PropTypes} from 'react';
import {Input, Select, Textarea} from 'formsy-react-components';


class TaskForm extends Component {

    render() {
        const typesOptions = [
            {value: 'coding', label: 'Coding'},
            {value: 'theory', label: 'Theory'}
        ];

        const task = this.props.task;

        return (
            <fieldset>
                <Input
                    name="title"
                    value={task.title || ''}
                    label="Title:"
                    type="text"
                    placeholder="title"
                    required
                />

                <Textarea
                    rows={5}
                    name="description"
                    value={task.description || ''}
                    label="Description:"
                    type="text"
                    placeholder="description"
                />

                <Select
                    name="type"
                    label="Type: "
                    value={task.type || (typesOptions.length > 0 ?
                            typesOptions[0] : ''
                    )}
                    options={typesOptions}
                    disabled={typesOptions.length === 0}
                />
            </fieldset>
        );
    }
}

TaskForm.propTypes = {
    task: PropTypes.object
};

export default TaskForm
