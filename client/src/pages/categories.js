import React, { PureComponent } from 'react';
import { Control,CacheLink,Route } from 'react-keeper';
import Footer from '../components/footer';
import Loader from '../components/loader';
import fetchData from '../util/Fetch';
import moment from 'moment';

class Category extends PureComponent {

    state = {
        isrender:true,
        articles:[]
    }

    getArticle = async (category="") => {
        this.setState({isrender:true});
        this.props.setTitle(decodeURI(category)||'全部');
        const articles = await fetchData(`/api/article?category=${decodeURI(category)}`);
        this.setState({articles:articles.data,isrender:false});
    }

    async componentDidMount() {
        const category = Control.path.split("/categories/")[1]||"";
        this.getArticle(category);
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.category!==(nextProps.params.category||encodeURI('全部')) && nextProps.pathname.indexOf('search')<0 && nextProps.pathname.indexOf('categories')>=0 && this.props.pathname!==nextProps.pathname){
            const {category} = nextProps.params;
            this.getArticle(category);
        }
    }

    render(){
        const {articles,isrender} = this.state;
        return (
            <section className="slideDownMin">
                {
                    isrender?
                    <Loader/>
                    :
                    articles.map(article=>(
                        <article className="item" key={article._id}>
                            <time className="item-date"> {moment(article.createdAt).utcOffset(8).format("YYYY年M月D日")}</time>
                            <CacheLink className="item-title" to={"/article/"+article._id}>{article.title}</CacheLink>
                        </article>
                    ))
                }
            </section>
        )
    }
}

export default class extends PureComponent {
    state = {
        categories: [],
        category:'全部',
    }

    onhandle = (name) => () => {
        if(this.state.category !== name){
            this.setState({category:name})
            this.getArticle(name);
        }
    }

    async componentDidMount() {
        const categories = await fetchData(`/api/category`);
        this.setState({ categories: categories.data });
    }

    setTitle = (category) => {
        this.setState({category})
    }

    render() {
        const {categories,category} = this.state;
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    <section>
                        <h2 className="page-title"># {category}</h2>
                        {
                            categories.map(d=>(
                                <CacheLink key={d._id} activeClassName="tag-active" to={ "/categories/"+ encodeURI(d.name) } className="tag-wrap">
                                    <span className="iconfont icon-tag-inner"></span>
                                    <span className="tag-name"> {d.name} </span>
                                </CacheLink>
                            ))
                        }
                    </section>
                    <Route index component={Category} category={encodeURI(category)} setTitle={this.setTitle} path="/:category" />                
                </section>
                <Footer />
            </div>
        )
    }
}