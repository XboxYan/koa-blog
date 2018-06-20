import React, { PureComponent, Fragment } from 'react';
import fetchData from '../util/Fetch';
import Markview from '../components/markview';

class CategoryGroup extends PureComponent {

    state = {
        checked: this.props.checked,
        categories:[]
    }

    getCategories = async () => {
        this.setState({ isrender: true });
        const categories = await fetchData(`/api/category`);
        this.setState({ categories: categories.data, isrender: false });
    }

    onChange = (ev) => {
        const checked = [...this.state.checked];
        const target = ev.target;
        if (target.checked) {
            checked.push(target.id);
        } else {
            checked.splice(checked.findIndex((d) => d === target.id), 1);
        }
        this.props.onChange && this.props.onChange(checked);
        this.setState({ checked });
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        const { checked,categories } = this.state;
        return (
            <Fragment>
                {
                    categories.length > 0 ? categories.map((d) => (
                        <Fragment key={d._id}>
                            <input className="checkbox" type="checkbox" onChange={this.onChange} checked={checked.indexOf(d._id) >= 0} id={d._id} />
                            <label className="article-tag" htmlFor={d._id} >{d.name}</label>
                        </Fragment>
                    ))
                        :
                        <label className="article-tag article-tag-loading">正在加载...</label>
                }
            </Fragment>
        )
    }
}

class MarkdownEditor extends PureComponent {

    state = {
        value: 'Hello, **world**!'
    };

    onChange = (e) => {
        const value = e.target.value;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({ value });
            this.props.onChange && this.props.onChange(value);
        }, 300)
    }

    render() {
        const { value } = this.state;
        const { className,rows,placeholder } = this.props;
        return (
            <div className={"mark-body "+className}>
                <textarea placeholder={placeholder} spellCheck={false} onChange={this.onChange} defaultValue={value} rows={rows} className="mark-textarea edit-input" />
                <div className="mark-preview"><Markview value={value} /></div>
            </div>
        )
    }
}

export default class extends PureComponent {
    state = {
        isrender: true
    }

    onChangeCategories = (value) => {
        console.log(value)
    }

    onChangeContent = (value) => {
        console.log(value)
    }

    render() {
        return (
            <div className="container admin-container">
                <section className="main sildeUpMin">
                    <div className="admin-title">标题</div>
                    <input spellCheck={false} className="edit-input" />
                    <div className="admin-title">分类</div>
                    <CategoryGroup onChange={this.onChangeCategories} checked={[]} />
                    <div className="admin-title">简介</div>
                    <MarkdownEditor pla rows={3} placeholder="一些简介~" />
                    <div className="admin-title">正文</div>
                    <MarkdownEditor className="admin-content" rows={10} placeholder="开始写文章吧!" onChange={this.onChangeContent} />
                </section>
            </div>
        )
    }
}