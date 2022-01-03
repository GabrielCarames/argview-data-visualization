import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
        <div className="app-container">
            <Sidebar />
            <Switch>
                <Route exact path="/"><Home/></Route>
                {/* <Route exact path="/search"><Search/> </Route> */}
                <Route path="*"><Home /></Route>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
