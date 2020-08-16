import React, { Component } from 'react';

export default class TodoItem extends Component
{
    state= {
        isEditing: false,
        title: ''
    }

    onDoubleClick = (e) => {
        this.setState({
            isEditing: true,
            title: this.props.title
        });
    }

    onChange = (e) =>{
        this.setState({
            title: e.target.value
        });
    }

    onKeyDown = (e) =>{
        if(e.which == 13){
            this.props.onSave(this.props.id, this.state.title);
            this.setState({
                isEditing: false
            })
        }
    }

    render()
    {
        return(
            <li className={this.props.checked ? 'checked' : ''}>
                    <input 
                      type = "checkbox" 
                      checked = {this.props.checked}
                      onChange = {(e) => {
                        this.props.onChecked(this.props.id, e)
                      }}
                    />
                    {
                        ! this.state.isEditing ? 
                        <span onDoubleClick={this.onDoubleClick}>
                            {this.props.title}
                        </span> : 
                        <input 
                            value={this.state.title}
                            onChange ={this.onChange}
                            onKeyDown={this.onKeyDown}
                        />
                    }
                   
                   
                    <span className="delete" onClick={() => {
                        this.props.onDelete(this.props.id);
                        }}>
                        [x]
                    </span>
            </li>
        )
    }
}