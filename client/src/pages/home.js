import React, { PureComponent } from 'react';
import Loader from '../components/loader';
import Profile from '../components/profile';
import BackTop from '../components/backTop';
import Footer from '../components/footer';
import Pager from '../components/pager';
import fetchData from '../util/Fetch';
import { CacheLink } from 'react-keeper';
import moment from 'moment';

export default class extends PureComponent {

    pagesize = 3;

    state = {
        articles:[],
        total:1,
        isrender:true
    }

    getArticle = async (page=1) => {
        this.goTop();
        this.setState({isrender:true});
        const articles = await fetchData(`/api/article?page=${page}&pagesize=${this.pagesize}`);
        this.setState({articles:articles.data,total:articles.counts,isrender:false});
    }

    toIndex = () => {
        this.getArticle(1);
    }
    
    componentDidMount () {
        this.getArticle(1);
    }

    goTop = () => {
        document.getElementById("index-con").scrollTo({top:0,behavior: 'smooth' })
    }
    
    render() {
        const {articles,total,isrender} = this.state;
        return (
            <div className="container" id="index-con">
                <section className="main sildeUpMin">
                    <Profile onClick={this.toIndex}/>
                    {
                        isrender?
                        <Loader/>
                        :
                        articles.map((article)=>(
                            <article className="article" key={article._id}>
                                <div className="article-header">
                                    <CacheLink className="article-title" to={"/article/"+article._id}>{article.title}</CacheLink>
                                    <div className="article-meta">{ moment(article.createdAt).utcOffset(8).format("YYYY年M月D日") }<span className="iconfont icon-star"></span>
                                        {
                                            article.categories.length>0
                                            ?
                                            article.categories.map((category,i)=>(
                                                <CacheLink key={i} className="article-tag" to={"/categories/"+category._id}>{category.name}</CacheLink>
                                            ))
                                            :
                                            <CacheLink className="article-tag" to="/categories">无分类</CacheLink>
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
                    <Pager
                        total={total}
                        pagesize={this.pagesize}
                        fetch={this.getArticle}
                    />
                </section>
                <BackTop onClick={this.goTop} />
                <Footer/>
            </div>
        )
    }
}