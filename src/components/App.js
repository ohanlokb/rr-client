import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../store/actions';

import StreamCreate from '../components/streams/StreamCreate';
import StreamShow from '../components/streams/StreamShow';
import StreamEdit from '../components/streams/StreamEdit';
import StreamDelete from '../components/streams/StreamDelete';
import StreamList from '../components/streams/StreamList';
import Header from '../components/Header';

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogon();
  }

  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Header isAuthenticated={this.props.isAuthenticated} />
            <Switch>
              <Route path="/streams/new" component={StreamCreate} />
              <Route path="/streams/show" component={StreamShow} />
              <Route path="/streams/edit" component={StreamEdit} />
              <Route path="/streams/delete" component={StreamDelete} />
              <Route path="/" exact component={StreamList} />
              <Redirect to="/" />
            </Switch>
          </div>
        </BrowserRouter>
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