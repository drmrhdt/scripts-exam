import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Table from "./components/Table";
import Form from "./components/Form";
import Footer from "./components/Footer";
import Main from "./components/Main";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App py-3 bg-dark text-light">
          <div className="container">
            <Header />
            <Switch>
              <Route exact path="/main" component={Main} />
              <Route exact path="/:type" component={Table} />
              <Route path="/:type/add" component={Form} />
              <Route path="/:type/edit/:id">
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
