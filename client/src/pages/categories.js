import React, { PureComponent } from 'react';
import { Control,CacheLink,Route } from 'react-keeper';
import Footer from '../components/footer';
import Loader from '../components/loader';
import Pager from '../components/pager';
import fetchData from '../util/Fetch';
import moment from 'moment';

class Category extends PureComponent {

    pagesize = 5;

    state = {
        isrender:true,
        total:1,
        renderPage:true,
        articles:[]
    }

    getArticle = (category='') => async (page=1) => {
        if(category){
            this.setState({isrender:true});
            const articles = await fetchData(`/api/article?page=${page}&pagesize=${this.pagesize}&category=${category}`);
            this.setState({articles:articles.data,total:articles.counts,isrender:false,renderPage:true});
        }
    }

    async componentDidMount() {
        const category = Control.path.split("/categories/")[1]||"";
        this.category = category;
        this.getArticle(category)();
    }

    componentWillReceiveProps(nextProps) {
        if( this.category!==nextProps.params.category && nextProps.pathname.indexOf('search')<0 && nextProps.pathname.indexOf('categories/')>=0 && this.props.pathname!==nextProps.pathname){
            const {category} = nextProps.params;
            this.category = category;
            this.setState({renderPage:false});
            this.getArticle(category)();
        }
    }

    render(){
        const {articles,total,isrender,renderPage} = this.state;
        const category = this.category||"";
        return (
            <section className="slideDownMin">
                {
                    isrender?
                    <Loader/>
                    :
                    (
                        articles.length>0?
                        articles.map(article=>(
                            <article className="item" key={article._id}>
                                <time className="item-date"> {moment(article.createdAt).utcOffset(8).format("YYYY年M月D日")}</time>
                                <CacheLink className="item-title" to={"/article/"+article._id}>{article.title}</CacheLink>
                            </article>
                        ))
                        :
                        <div className="iconfont icon-nofound empty"></div>
                    )
                }
                {
                    renderPage&&<Pager
                        total={total}
                        pagesize={this.pagesize}
                        fetch={this.getArticle(category)}
                    />
                }
            </section>
        )
    }
}

export default class extends PureComponent {
    state = {
        categories: []
    }

    async componentDidMount() {
        const categories = await fetchData(`/api/category`);
        this.setState({ categories: categories.data });
    }

    render() {
        const {categories} = this.state;
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    <section>
                        <h2 className="page-title">分类</h2>
                        <CacheLink activeClassName="tag-active" to="/categories/unknown" className="tag-wrap">
                            <span className="iconfont icon-tag-inner"></span>
                            <span className="tag-name"> 未分类 </span>
                        </CacheLink>
                        {
                            categories.map(d=>(
                                <CacheLink key={d._id} activeClassName="tag-active" to={ "/categories/"+ d._id } className="tag-wrap">
                                    <span className="iconfont icon-tag-inner"></span>
                                    <span className="tag-name"> {d.name} </span>
                                </CacheLink>
                            ))
                        }
                    </section>
                    <Route cache='parent' component={Category} path="/:category" />                
                </section>
                <Footer />
            </div>
        )
    }
}