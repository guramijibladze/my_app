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

  onTodoChecked = () => {

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
                <li key={item.id}>
                    <input 
                      type = "checkbox" 
                      checked = {item.checked}
                      onChange = {(e) => {
                        this.onTodoChecked(item.id)
                      }}
                    />
                    {item.title}
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
