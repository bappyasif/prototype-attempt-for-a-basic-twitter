import React, { Component } from 'react'
import AllRoutes from './all-routes'
import ContainerForSignupPage from './signup-page/containerForLoginPage'

class ComponentsContainer extends Component {
    render() {
        return (
            <div id='components-container'>
                {/* <ContainerForSignupPage /> */}
                <AllRoutes />
            </div>
        )
    }
}

export default ComponentsContainer
