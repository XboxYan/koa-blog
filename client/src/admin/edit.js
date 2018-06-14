import React, { PureComponent } from 'react';
import { Control } from 'react-keeper';
import fetchData from '../util/Fetch';

export default class extends PureComponent {

    onSubmit = async (ev) => {
        ev.preventDefault();
        const { id } = Control.state||{};
        const categoryInfo = await fetchData(`/api/category`,{
            method:'PUT',
            body:JSON.stringify({
                id,
                name:this.input.value
            })
        });
        if(categoryInfo.success){
            Control.go(-1)
        }
    }

    render() {
        const { name } = Control.state||{};
        return (
            <div className="mask">
                <form className="edit-container sildeUpMin" onSubmit={this.onSubmit} >
                    <input ref={node=>this.input=node} autoFocus={true} type="text" placeholder="修改分类" defaultValue={name} className="edit-input" />
                    <span className="edit-cancel iconfont icon-cancel" onClick={() => Control.go(-1)}></span>
                </form>
            </div>
        )
    }
}