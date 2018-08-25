import { withLoadable } from '../../../common';

const CodeBlock = withLoadable(() => import('./CodeBlock'));

const ImageBlock = withLoadable(() => import('./ImageBlock'));

export {
    CodeBlock,
    ImageBlock
};
