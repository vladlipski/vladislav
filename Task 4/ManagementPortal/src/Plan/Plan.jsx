import React, {PropTypes, Component} from 'react'
import TreeView from "./TreeView/TreeView";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Row} from "react-bootstrap";


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
                        href: '/tasks/1',
                        nodes: [
                            {
                                text: 'Task Functional Javascript',
                                href: '/tasks/1'
                            },
                            {
                                text: 'Javascript',
                                href: '/tasks/2'
                            },
                            {

                                text: 'Unit testing',
                                href: '/tasks/3'
                            },
                            {
                                text: 'FP',
                                href: '/tasks/4'
                            }
                        ]
                    },
                    {
                        text: 'CSS',
                        href: '/tasks/2'
                    },
                    {

                        text: 'Software Development basics',
                        href: '/tasks/3'
                    },
                    {
                        text: 'Web development basics',
                        href: '/tasks/4'
                    }
                ]
            }, {
                text: 'Javascript',
                nodes: [
                    {
                        text: 'Task Functional Javascript',
                        href: '/tasks/1'
                    },
                    {
                        text: 'Javascript',
                        href: '/tasks/2'
                    },
                    {

                        text: 'Unit testing',
                        href: '/tasks/3'
                    },
                    {
                        text: 'FP',
                        href: '/tasks/4'
                    }
                ]
            }
        ];

        return (
            <Row>
                <Col sm={4}>
                    <TreeView
                        levels={1}
                        data = {data}
                        enableLinks={true}
                        showBorder={false}
                        highlightSelected={false}
                        selectable={false}
                        allowNew={true}
                        removable={true}
                    />
                </Col>
                <Col sm={8}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Title
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Email" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Description
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" placeholder="Password" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalEmail1">
                            <Col componentClass={ControlLabel} sm={2}>
                                Status
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Email" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword1">
                            <Col componentClass={ControlLabel} sm={2}>
                                Type
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" placeholder="Password" />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="button">
                                    Save
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        );
    }
}

Plan.propTypes = {
    // selectedDepartment: PropTypes.object,
    // updatedDepartment: PropTypes.object,
    // deletedDepartment: PropTypes.object
};


export default Plan
