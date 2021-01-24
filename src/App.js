import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import Quiz from "./components/Quiz";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      {/* <Route path="/quiz/:categoryId/:difficulty/:categoryName"> */}
      <Route path="/quiz">
        <Quiz />
      </Route>
    </Router>
  );
}

export default App;
