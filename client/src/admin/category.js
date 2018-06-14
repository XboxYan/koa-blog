import React, { PureComponent } from 'react';
import fetchData from '../util/Fetch';
import Footer from '../components/footer';
import Loader from '../components/loader';
import moment from 'moment';
import { CacheLink } from 'react-keeper';

export default class extends PureComponent {

    state = {
        categories: [],
        isrender: true
    }

    async componentDidMount() {
        const categories = await fetchData(`/api/category`);
        this.setState({ categories: categories.data, isrender: false });
    }

    render() {
        const { categories, isrender } = this.state;
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    <span className="page-title">共{categories.length}个分类</span>
                    <table className="table-con">
                        <thead>
                            <tr>
                                <th>_id</th>
                                <th>名称</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !isrender && categories.map(category => (
                                    <tr key={category._id}>
                                        <td>{category._id}</td>
                                        <td><CacheLink to={"/categories/" + encodeURI(category.name)}>{category.name}</CacheLink></td>
                                        <td>{moment(category.createdAt).utcOffset(8).format("YYYY年M月D日 , HH:mm:ss")}</td>
                                        <td>
                                            <CacheLink className="tag-wrap" state={{name:category.name,id:category._id}} to="/admin/category/edit">编辑</CacheLink>
                                            <a className="tag-wrap">删除</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        isrender && <Loader />
                    }
                </section>
                <Footer />
            </div>
        )
    }
}