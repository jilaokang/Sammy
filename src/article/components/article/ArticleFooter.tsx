import * as React from 'react';
import { WiredButton } from 'react-wired-element';
import { FormattedMessage } from 'react-intl';


const ArticleFooter = ({ onArticleJump }) => {
    return (
        <section className="footer-article-go">
            <WiredButton class="pre" onClick={onArticleJump(true)}><FormattedMessage id="Article.base.preArticle" /></WiredButton>
            <WiredButton class="next" onClick={onArticleJump(false)}><FormattedMessage id="Article.base.nextArticle" /></WiredButton>
        </section>
    );
};

export default ArticleFooter;
