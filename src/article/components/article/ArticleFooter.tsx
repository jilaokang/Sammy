import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';


const ArticleFooter = ({ onArticleJump }) => {
    return (
        <section className="footer-article-go">
            <Button className="pre" variant="outlined" onClick={onArticleJump(true)}><FormattedMessage id="Article.base.preArticle" /></Button>
            <Button className="next" variant="outlined" onClick={onArticleJump(false)}><FormattedMessage id="Article.base.nextArticle" /></Button>
        </section>
    );
};

export default ArticleFooter;
