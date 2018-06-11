import React, { PureComponent } from 'react';
import Loader from '../components/loader';
import Profile from '../components/profile';
import BackTop from '../components/backTop';
import Footer from '../components/footer';
import fetchData from '../util/Fetch';
import { CacheLink } from 'react-keeper';
import moment from 'moment';

export default class extends PureComponent {

    pagesize = 3;

    state = {
        articles:[],
        total:1,
        page:1,
        isrender:true
    }

    getArticle = async (page=1) => {
        this.setState({isrender:true});
        const articles = await fetchData(`/api/article?page=${page}&pagesize=${this.pagesize}`);
        this.setState({articles:articles.data,total:articles.counts,isrender:false});
    }

    onhandle = (dir) => () => {
        const { total, page } = this.state;
        let $page = Math.max(Math.min(page + dir,Math.ceil(total/this.pagesize)),1);
        this.setState({page:$page});
        this.getArticle($page);
    }
    
    componentDidMount () {
        this.getArticle();
    }
    
    render() {
        const {articles,page,total,isrender} = this.state;
        const max = Math.ceil(total/this.pagesize);
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    <Profile/>
                    {
                        isrender?
                        <Loader/>
                        :
                        articles.map((article)=>(
                            <article className="article" key={article._id}>
                                <div className="article-header">
                                    <CacheLink className="article-title" to={"/article/"+article._id}>{article.title}</CacheLink>
                                    <div className="article-meta">{ moment(article.createTime).utcOffset(8).format("YYYY年M月D日") }<span className="iconfont icon-star"></span>
                                        {
                                            article.categories.map((category,i)=>(
                                                <CacheLink key={i} className="article-tag" to={"/categories/"+encodeURI(category)}>{category}</CacheLink>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="article-excerpt">
                                    {article.description}
                                </div>
                                <div className="article-bottom">
                                    <CacheLink className="article-readmore" to={"/article/"+article._id}>阅读更多</CacheLink>
                                </div>
                            </article>
                        ))
                    }
                    <nav className="paginator scrollIn">
                        <a className="prev" data-hidden={page===1} onClick={this.onhandle(-1)}><i className="iconfont icon-left"></i>上一页</a>
                        <span className="page-number">Page {page} / {max}.</span>
                        <a className="next" data-hidden={page===max} onClick={this.onhandle(1)}>下一页<i className="iconfont icon-right"></i></a>
                    </nav>
                </section>
                <BackTop/>
                <Footer/>
            </div>
        )
    }
}