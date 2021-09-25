import React, { Component, useState } from 'react'
import AllRoutes from './all-routes'
import ContainerForSignupPage from './signup-page/containerForLoginPage'

function ComponentsContainer () {
    // let [tweetData, setTweetData] = useState([]);
        return (
            <div id='components-container'>
                {/* <ContainerForSignupPage /> */}
                {/* <AllRoutes tweetData={tweetData} setTweetData={setTweetData}/> */}
                <AllRoutes />
            </div>
        )
}

export default ComponentsContainer

/**
 * 
 * 
 class ComponentsContainer extends Component {
    constructor(props) {
        this.state={
            data: []
        }
        this.setData = this.setData.bind(this);
    }

    setData = (value) => this.setState({data: [...this.state.data, value]})

    render() {
        return (
            <div id='components-container'>
                {/* <ContainerForSignupPage /> *}
                <AllRoutes tweetData={this.state.data} setTweetData={this.setData}/>
            </div>
        )
    }
}
 */
