import * as React from 'react';
import Axios from "axios";
import {fromJS} from 'immutable';
import {connect} from "react-redux";
import {setArticles} from "../actions";
import {Articles} from "../@types";

const fetchConfig = async dispatch => {
    const res = await Axios.get('https://sammy-1252377356.cos.ap-beijing.myqcloud.com/config.json');
    let id = 0;
    res.data.map(v => v.id = id++);
    dispatch(setArticles(fromJS(res.data)));
};

class ArticleListContainer extends React.Component<{ setArticles: any, articles: Articles }> {
    public test: any;

    public async componentDidMount() {
        this.props.setArticles();
    }

    public render() {

        return (
            <section>
                {
                    this.props.articles && this.props.articles.map(a => (
                        <section key={a.get('id')}>
                            <p>title: {a.get('title')}</p>
                        </section>
                    ))
                }
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    articles: state.get('articles')
});

const mapDispatchToProps = (dispatch) => ({
    setArticles: () => dispatch(fetchConfig)
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);

