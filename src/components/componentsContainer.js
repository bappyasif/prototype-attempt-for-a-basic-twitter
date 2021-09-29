import React, { Component, useEffect, useState } from 'react'
import AllRoutes from './all-routes'
import ContainerForSignupPage from './signup-page/containerForLoginPage'

function ComponentsContainer ({count, handleCount}) {
    // let [tweetData, setTweetData] = useState([]);
    // let [count, setCount] = useState(0)
    // let count = 0;

    // let handleCount = () => setCount(count+1);

    useEffect(() => handleCount, [count])
        return (
            <div id='components-container'>
                {/* <ContainerForSignupPage /> */}
                {/* <AllRoutes tweetData={tweetData} setTweetData={setTweetData}/> */}
                <AllRoutes count={count} handleCount={handleCount}/>
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
