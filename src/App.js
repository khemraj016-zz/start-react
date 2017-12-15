import React, { Component } from 'react';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import Todos from './Components/Todos';
import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      todos: []
    }
  }

  getTodos() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({todos: data}, function() {
          console.log(this.state)
      });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err)
      }
    });
  }

  getProjects() {
    this.setState({projects: [
      {
        title: "Business Website",
        category: "web design"
      },
      {
        title: "Social App",
        category: "Mobile Development"
      },
      {
        title: "Ecommerce shopping cart",
        category: "web design"
      }]
    });
  }

  componentWillMount() {
    this.getProjects();
    this.getTodos();
  }

  componentDidMount() {
    this.getTodos();
  }

  handleAddProject(project) {
    let projects = this.state.projects;
    projects.push(project)
    this.setState({projects:projects});
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <Projects projects={this.state.projects} />
        <hr />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
