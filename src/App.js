import React, {Component} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Gflix from "./components/Gflix";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import './App.css';


class App extends Component {
    state = {}

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({user});
    }

    render() {
        const {user} = this.state;
        return (
            <React.Fragment>
                <NavBar user={user} />
                <ToastContainer/>
                <main className="container">
                    <Switch>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/logout" component={Logout}/>
                        <ProtectedRoute path="/gflix/:id" component={MovieForm}/>
                        <Route path="/gflix"
                               render={(props => <Gflix {...props} user = {this.state.user} />)}
                        />
                        <Route path="/customers" component={Customers}/>
                        <Route path="/rentals" component={Rentals}/>
                        <Route path="/notFound" component={NotFound}/>
                        <Redirect from="/" exact to="/gflix"/>
                        <Redirect to="/notFound"/>
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
