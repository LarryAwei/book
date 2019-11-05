import React, {Component} from 'react';
import './App.css';
import './bootstrap-4.3.1-dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {testCategories, testItems} from "./testData";
import Home from "./containers/Home";
import Create from "./containers/Create";
import {flatternArr} from "./utility";
console.log(flatternArr(testItems))

export const AppContext = React.createContext();
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      items: flatternArr(testItems),
      categories: flatternArr(testCategories)
    }
    this.actions = {
      deleteItem: (item) => {

        delete this.state.items[item.id]
        this.setState({
          items: this.state.items
        })
      }
    }
  }


  render() {
    return (
        <AppContext.Provider value={{state:this.state, actions: this.actions}}>
          <Router>
            <div className="App">
              <Route path={"/"} exact component={Home}/>
              <Route path={"/create"} component={Create}/>
              <Route path={"/edit/:id"} component={Create}/>
            </div>
          </Router>
        </AppContext.Provider>


    );
  }


}

export default App;
