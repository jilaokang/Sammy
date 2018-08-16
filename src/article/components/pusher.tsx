import * as React from 'react';

import Push from 'push.js';

const withWebPush = (Component: React.ComponentClass) => (props) => {
    return (
        <Component {...props} webPush={Push}/>
    );
};

export default withWebPush;
