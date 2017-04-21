import React, {Component, PropTypes} from 'react';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";


class List extends Component {

    renderList(entityList){
        const {entityName, displayedProp} = this.props;

        if (entityList.isFetching) {
            return <h1>Loading...</h1>;
        } else if(entityList.errorMessage) {
            return (
                <Alert bsStyle="danger">
                    {entityList.errorMessage}
                </Alert>
            )
        } else if(!entityList[entityName]) {
            return <span />
        }
        return entityList[entityName].map((entity) => {
            return (
                <LinkContainer key={entity.id} to={"/" + entityName + "/" + entity.id}>
                    <ListGroupItem>{entity[displayedProp]}</ListGroupItem>
                </LinkContainer>
            );
        });
    }

    render() {
        const entityList = this.props.entityList;
        return (
            <ListGroup>
                {this.renderList(entityList)}
            </ListGroup>
        )
    }
}

List.propTypes = {
    entityList: PropTypes.object,
    entityName: PropTypes.string,
    displayedProp: PropTypes.string

};

export default List
