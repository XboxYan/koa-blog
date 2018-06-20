import React, { PureComponent, Fragment } from 'react';
import Remarkable from 'remarkable';
import hljs from 'highlightjs'
import fetchData from '../util/Fetch';

class Checkbox extends PureComponent {

    state = {
        checked: this.props.checked
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

    render() {
        const { checked } = this.state;
        const { options } = this.props;
        return (
            <Fragment>
                {
                    options.length > 0 ? options.map((d) => (
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
        this.setState({ value: e.target.value });
    }

    getRawMarkup(value) {
        const md = new Remarkable({
            html:true,
            langPrefix:'',
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                  try {
                    hljs.configure({classPrefix:''});
                    return hljs.highlight(lang, str).value;
                  } catch (err) {}
                }
            
                try {
                  return hljs.highlightAuto(str).value;
                } catch (err) {}
            
                return ''; // use external default escaping
              }
        });
        return { __html: md.render(value) };
    }

    render() {
        const { value } = this.state;
        return (
            <div className="admin-body">
                <textarea spellCheck={false} onChange={this.onChange} defaultValue={value} rows="10" className="admin-textarea edit-input" />
                <div className="article-preview" dangerouslySetInnerHTML={this.getRawMarkup(value)}></div>
            </div>
        )
    }
}

export default class extends PureComponent {
    state = {
        categories: [],
        isrender: true
    }

    getCategories = async () => {
        this.setState({ isrender: true });
        const categories = await fetchData(`/api/category`);
        this.setState({ categories: categories.data, isrender: false });
    }

    onChange = (value) => {
        console.log(value)
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        const { categories } = this.state;
        return (
            <div className="container admin-container">
                <section className="main sildeUpMin">
                    <h2 className="admin-title">标题</h2>
                    <input spellCheck={false} className="edit-input" />
                    <h2 className="admin-title">分类</h2>
                    <Checkbox options={categories} onChange={this.onChange} checked={[]} />
                    <h2 className="admin-title">简介</h2>
                    <textarea spellCheck={false} rows="3" className="edit-input" />
                    <h2 className="admin-title">正文</h2>
                    <MarkdownEditor />
                </section>
            </div>
        )
    }
}