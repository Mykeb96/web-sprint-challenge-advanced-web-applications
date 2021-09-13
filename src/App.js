import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";
import axios from 'axios'


function App() {

  const logOut = (e) => {
    axios.post(`http://localhost:5000/api/logout`)
      .then(res => { console.log(res) })
      .catch(err => { console.log(err) })
    localStorage.removeItem('authtoken')
    window.location.href = ('http://localhost:3000/login')
  }
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="#" onClick={() => logOut()}>logout</a>
        </header>

        <Route path="/">
          <Redirect to="/login"/>
        </Route>

        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/bubbles'>
          <PrivateRoute component={BubblePage} />
        </Route>

      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.