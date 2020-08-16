import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TodoItem from './TodoItem';

function todoFactory(id, title, checked = false){
  return{
    id, title, checked
  }
}

class App extends Component {
  state = {
    newTodo: '',
    todos: [
      todoFactory(1, 'test 1'),
      todoFactory(2, 'test 2', true)
    ],
    filter: 'ALL'
  }

  onKeyDown = (e) => {
    if(e.which == 13){ //check enter press
      let todo = todoFactory(
        this.state.todos.length + 1,
        this.state.newTodo,
      );

      this.setState({
        todos: [...this.state.todos, todo]
      });

      this.setState({
        newTodo: '' // ველის გასუფთავება
      });
    }
  }

  onTodoChecked = (todoId, e) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.id == todoId){
          return todoFactory(todo.id, todo.title, e.target.checked)
        }
        return todo;
      })
    });
  }

  deleteTodo = (todoId) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id != todoId)
    });
  }

  onTodoSave = (id, title) =>{
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.id ==id ){
          todo.title = title;
        }
        return todo;
      })
    })
  }

  onFilter = (filter) =>{
    this.setState({
      filter: filter
    });
  }


  render(){
    let {filter, todos} = this.state;
    let todosFiltered;


    if(filter == 'CHECKED'){
      todosFiltered = todos.filter(item => item.checked)
    }
    else if(filter == 'UNCHECKED'){
      todosFiltered = todos.filter(item => !item.checked)
    }
    else{
      todosFiltered = todos;
    }


    return (
      <div className="App">
        <header>
          <input 
            type = "text" 
            placeholder = "Todo title"
            onKeyDown = {this.onKeyDown}
            value = {this.state.newTodo}
            onChange = {(e) => {
              this.setState({
                newTodo: e.target.value
              });
            }}
            
          />
        </header>

        <ul>
          {
            todosFiltered.map((item) => {
              return(
                <TodoItem 
                  key = {item.id}
                  id = {item.id}
                  title = {item.title}
                  checked = {item.checked}
                  onDelete={this.deleteTodo} //transfer into TodoItem component delete method
                  onChecked={this.onTodoChecked}
                  onSave={this.onTodoSave}
                />
              )
            })
          }
        </ul>
        
        <footer>
          <button onClick={() => this.onFilter('ALL')}>ყველა</button>
          <button onClick={() => this.onFilter('CHECKED')}>მონიშნული</button>
          <button onClick={() => this.onFilter('UNCHECKED')}>მოუნიშნავი</button>
        </footer>

      </div>
    );
  }
}

export default App;
