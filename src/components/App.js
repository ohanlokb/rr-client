import React, { Component } from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../store/actions';

import StreamCreate from '../components/streams/StreamCreate';
import StreamShow from '../components/streams/StreamShow';
import StreamEdit from '../components/streams/StreamEdit';
import StreamDelete from '../components/streams/StreamDelete';
import StreamList from '../components/streams/StreamList';
import Header from '../components/Header';
import history from '../history';

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogon();
  }

  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Header isAuthenticated={this.props.isAuthenticated} />
            <Switch>
              <Route path="/streams/new" component={StreamCreate} />
              <Route path="/streams/edit/:id" component={StreamEdit} />
              <Route path="/streams/delete/:id" component={StreamDelete} />
              <Route path="/streams/:id" component={StreamShow} />
              <Route path="/" exact component={StreamList} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null
  };
} 

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogon: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);