import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Login from './Login';
import BestBooks from './BestBooks';
import Profile from './component/Profile';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {

  render() {
    console.log('app', this.props);
    return(
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
            <Switch>
              <Route exact path="/">
              {this.props.auth0.isAuthenticated ? <BestBooks /> : <Login /> }
              </Route>
              <Route path="/profile" component={Profile}/>
            </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
