import React, { Component, useEffect, useState } from 'react'
import './app.css';
import ComponentsContainer from './components/componentsContainer';

function App() {
    let [count, setCount] = useState(0)

    let handleCount = () => setCount(count+1);

    // useEffect(() => handleCount, [count])

    return (
        <div>
            <ComponentsContainer count={count} handleCount={handleCount}/>
        </div>
    )

}


// class App extends Component {

//     render() {
//         return (
//             <div>
//                 <ComponentsContainer />
//             </div>
//         )
//     }
// }

export default App
