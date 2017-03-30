import React from 'react';
import { AuthorizedComponent } from 'react-router-role-authorization';

class Home extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles = [];
        this.notAuthorizedPath = '/login';
    }

    render() {
        return (
            <div>
                <h1>Home page!</h1>
            </div>
        );
    }
}

export default Home
