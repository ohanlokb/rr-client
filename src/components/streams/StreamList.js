import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../store/actions';

class StreamList extends Component {
    componentDidMount() {
        this.props.onFetchStreams();
    }

    renderAdmin = (stream) => {
        if ( stream.userId === this.props.currentUserId ) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            );
        }
    };

    render() {
        const entries = this.props.streams.map( (stream) => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>                        
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });

        const createButton = this.props.isAuthenticated ? (
            <div style={{textAlign: "right"}}>
                <Link className="ui button primary" to="/streams/new">Create Stream</Link>
            </div>
        ) : null;

        return (
            <div>
                <h1>Streams</h1>
                <div className="ui celled list">
                    {entries}
                </div>
                {createButton}
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
      streams: Object.values(state.streams),
      currentUserId: state.auth.userId,
      isAuthenticated: state.auth.token !== null
  };
} 

const mapDispatchToProps = dispatch => {
  return {
    onFetchStreams: () => dispatch(actions.fetchStreams())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(StreamList);
