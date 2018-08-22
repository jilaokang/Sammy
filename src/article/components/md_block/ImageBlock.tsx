import * as React from 'react';
import Zmage from 'react-zmage';

const ImageBlock = ({ alt, src }) => {
    return (
        <Zmage src={src} alt={alt} />
    );
};

export default ImageBlock;
