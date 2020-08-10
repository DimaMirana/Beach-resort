//esversion: 6
/* jshint ignore:end */
/* jshint ignore:start */

import React from 'react';

import loadingGif from '../images/gif/loading-arrow.gif';

function Loading() {
    return (
        <div className = "loading">
            <h4>rooms data loading...</h4>
            <img src = {loadingGif} alt = "loading" />
        </div>
    )
}

export default Loading;
