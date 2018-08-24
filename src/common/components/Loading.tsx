import * as React from 'react';

import ReactLoading from 'react-loading';

const Loading = ({ pastDelay }) => {
    if (pastDelay) {
        return (<ReactLoading type="bars" color="#919191" height={300}  className="loading-center" />);
    } else {
        return null;
    }
};

export default Loading;
