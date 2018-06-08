import React, { PureComponent } from 'react';
import { Control,CacheLink } from 'react-keeper';
import Footer from '../components/footer';
import Loader from '../components/loader';
import fetchData from '../util/Fetch';

export default class extends PureComponent {
    state = {
        categories: [],
        category:'全部',
        isrender:true,
        articles:[]
    }

    getArticle = async (category="") => {
        this.setState({isrender:true});
        const articles = await fetchData(`/api/article?category=${category}`);
        this.setState({articles:articles.data,isrender:false});
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
        this.setCategory(true);
    }

    setCategory = (bool=false) => {
        const category = Control.state&&Control.state.category;
        if(category){
            this.setState({category})
            this.getArticle(category);
        }else{
            bool && this.getArticle("");
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setCategory();
    }

    render() {
        const {categories,articles,category,isrender} = this.state;
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    <section>
                        <h2 className="page-title"># {category}</h2>
                        {
                            categories.map(d=>(
                                <a key={d._id} onClick={this.onhandle(d.name)} className={"tag-wrap"+(category===d.name?" tag-active":"")}>
                                    <span className="iconfont icon-tag-inner"></span>
                                    <span className="tag-name"> {d.name} </span>
                                </a>
                            ))
                        }
                    </section>
                    <section className="slideDownMin">
                        {
                            isrender?
                            <Loader/>
                            :
                            articles.map(article=>(
                                <article className="item" key={article._id}>
                                    <time className="item-date"> {article.addTime}</time>
                                    <CacheLink className="item-title" to={"/article/"+article._id}>{article.title}</CacheLink>
                                </article>
                            ))
                        }
                    </section>
                </section>
                <Footer />
            </div>
        )
    }
}