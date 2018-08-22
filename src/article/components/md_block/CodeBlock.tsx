import * as React from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
import {atelierSulphurpoolLight} from "react-syntax-highlighter/styles/hljs";

const CodeBlock = ({ language, value }) => {
    return (
        <SyntaxHighlighter language={language} style={atelierSulphurpoolLight}>
                {value}
        </SyntaxHighlighter>
    );
};

export default CodeBlock;
