import React, {PropTypes, Component} from 'react'
import TreeView from "./TreeView";


class Plan extends Component {

    doubleClickHandler () {
        console.log('double click');
    }

    render() {

        const data = [
            {
                text: 'HTML + CSS',
                nodes: [
                    {
                        text: 'Task HTML + CSS',
                        href: 'tasks/1'
                    },
                    {
                        text: 'CSS',
                        href: 'tasks/2'
                    },
                    {

                        text: 'Software Development basics',
                        href: 'tasks/3'
                    },
                    {
                        text: 'Web development basics',
                        href: 'tasks/4'
                    }
                ]
            }, {
                text: 'Javascript',
                nodes: [
                    {
                        text: 'Task Functional Javascript',
                        href: 'tasks/1'
                    },
                    {
                        text: 'Javascript',
                        href: 'tasks/2'
                    },
                    {

                        text: 'Unit testing',
                        href: 'tasks/3'
                    },
                    {
                        text: 'FP',
                        href: 'tasks/4'
                    }
                ]
            }
        ];

        return (
            <TreeView
                data = {data}
                enableLinks={true}
                showBorder={false}
                highlightSelected={false}
                selectable={false}
                allowNew={true}
                removable={true}
                onDoubleClick={this.doubleClickHandler}
            />
        );
    }
}

Plan.propTypes = {
    // selectedDepartment: PropTypes.object,
    // updatedDepartment: PropTypes.object,
    // deletedDepartment: PropTypes.object
};


export default Plan
