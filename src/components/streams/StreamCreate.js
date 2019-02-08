import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions';
import StreamForm from './StreamForm';

class StreamCreate extends Component {
    onSubmit = (formProps) => {
        this.props.onCreateStream(formProps);
    }

    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>            
        );
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateStream: (formProps) => dispatch(actions.createStream(formProps))
  }
}

export default connect(null,mapDispatchToProps)(StreamCreate);
