import Header from "./components/header/header";
import Task from "./components/task/task";
import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Header></Header>
        </div>

        <Task />
      </div>
    </Router>
  );
}

export default App;
