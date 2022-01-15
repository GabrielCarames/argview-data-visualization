import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Error from "./components/Error";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Weather from "./components/Weather";

function App() {
  return (
    <Router>
        <div className="app-container">
            {
                window.innerWidth >= 320 && window.innerWidth <= 1700 
                ? <Navbar />
                : <Sidebar />
            }
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route exact path="/weather"><Weather/></Route>
                <Route exact path="/error/:error"><Error/></Route>
                <Route path="*"><Home /></Route>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
