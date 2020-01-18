import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import UsersTable from "./components/UsersTable";
import Form from "./components/Form";
import Footer from "./components/Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App py-3 bg-dark text-light">
          <div className="container">
            <Header />
            <Switch>
              <Route exact path="/" component={UsersTable} />
              <Route path="/add" component={Form} />
              <Route path="/edit/:id">
                <Form mode="edit" />
              </Route>
            </Switch>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
