import React, { PureComponent } from 'react';
import fetchData from '../util/Fetch';
import { Control,CacheLink } from 'react-keeper';
import Donate from '../components/donate';
import Loader from '../components/loader';
import Footer from '../components/footer';
import moment from 'moment';

export default class extends PureComponent {

    state = {
        article: {},
        isrender: true
    }

    componentDidMount() {
        const id = Control.path.split('article/')[1];
        this.getArticle(id);
    }

    getArticle = async (id) => {
        this.setState({isrender:true});
        const article = await fetchData(`/api/article/${id}`);
        this.setState({ article: article, isrender: false });
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.pathname.indexOf('article')>=0 && nextProps.pathname.indexOf('article')>=0 && this.props.pathname!==nextProps.pathname){
            const {id} = nextProps.params;
            this.getArticle(id);
        }
    }

    render() {
        const { article:{data,prev,next}, isrender } = this.state;
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    {
                        isrender?
                        <Loader/>
                        :
                        <article className="post">
                            <div className="post-header">
                                <p className="post-title">{data.title}</p>
                                <div className="meta-info"><span>{moment(data.createTime).utcOffset(8).format("YYYY年M月D日 , HH:mm:ss")}</span>
                                    <i className="iconfont icon-eye"></i><span>{data.views}</span>
                                </div>
                            </div>
                            <div className="post-content slideDownMin">
                                {data.content}
                            </div>
                            <div className="post-meta">
                                <i className="iconfont icon-tag-inner"></i>
                                {
                                    data.categories && data.categories.map((category, i) => <CacheLink key={i} className="category-link" to={"/categories/"+encodeURI(category)}>{category}</CacheLink>)
                                }
                            </div>
                        </article>
                    }
                    <div className="post-footer">
                        <div className="pf-left">
                            <img className="pf-avatar" alt="XboxYan" src={require("../img/header.png")} />
                            <p className="pf-des">hi,i am XboxYan</p>
                        </div>
                        <div className="pf-right">
                            <div className="pf-links">
                                <Donate />
                            </div>
                            {
                                !isrender&&
                                <nav className="pf-paginator">
                                    {
                                        prev&&<CacheLink to={"/article/"+prev._id} data-hover={prev.title}>上一篇</CacheLink>
                                    }
                                    {
                                        next&&<CacheLink to={"/article/"+next._id} data-hover={next.title}> 下一篇</CacheLink>
                                    }
                                </nav>
                            }
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}