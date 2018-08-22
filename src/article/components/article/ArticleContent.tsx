import * as React from 'react';
import { CodeBlock, ImageBlock } from '../md_block';
import * as ReactMarkdown from "react-markdown";

const ArticleContent = ({ content }) => {
    return (
        <main>
            <ReactMarkdown
                source={content}
                className="markdown-body"
                renderers={{code: CodeBlock, image: ImageBlock}}
            />
        </main>
    );
};

export default ArticleContent;
