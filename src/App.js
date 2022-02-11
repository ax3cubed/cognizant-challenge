import Header from "./components/header/header";
import Task from "./components/task/task";
import Top3 from "./components/top3/top3";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Header></Header>
        </div>

        <Routes>
          <Route path="/" element={<Task />}></Route>
          <Route path="/top3" element={<Top3 />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
