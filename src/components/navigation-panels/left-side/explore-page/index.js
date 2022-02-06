import React, { useState } from 'react';
import CurrentTrends from '../../right-side/current-trends';

function RenderExplorePage() {
    let [contentCreators, setContentCreators] = useState([])
    let handleContentCreators = name => setContentCreators(prevData => prevData.concat(name))

    return (
        <div id='render-explore-page-container'>
            <CurrentTrends handleContentCreators={handleContentCreators} />
        </div>
    )
}

export default RenderExplorePage;
