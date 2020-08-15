import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

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

    ]
  }

  onKeyDown = (e) => {
    if(e.which === 13){ //check enter press
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

  render(){
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
            this.state.todos.map((item) => {
              return(
                <li key={item.id} className={item.checked ? 'checked' : ''}>
                    <input 
                      type = "checkbox" 
                      checked = {item.checked}
                      onChange = {(e) => {
                        this.onTodoChecked(item.id, e)
                      }}
                    />
                    {item.title}
                    <span onClick={() => {
                      this.deleteTodo(item.id);
                    }}>
                      [x]
                    </span>
                </li>
              )
            })
          }
        </ul>
        

        <footer>
          
        </footer>


      </div>
    );
  }
}

export default App;
