import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { Share } from '@material-ui/icons';


const ArticleFooter = ({ onArticleJump, onArticleShare }) => {
    return (
        <section className="footer-article-go">
            <Button className="pre" variant="outlined" onClick={onArticleJump(true)}><FormattedMessage id="Article.base.preArticle" /></Button>
            <Share nativeColor="#919191" onClick={onArticleShare}/>
            <Button className="next" variant="outlined" onClick={onArticleJump(false)}><FormattedMessage id="Article.base.nextArticle" /></Button>
        </section>
    );
};

export default ArticleFooter;
