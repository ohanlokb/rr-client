import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as actions from '../../store/actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
    componentDidMount() {
        this.props.onFetchStream(this.props.match.params.id);
    }

    onSubmit = (formProps) => {
        this.props.onEditStream(this.props.match.params.id, formProps);
    }

    render() {
        if ( !this.props.stream ) {
            return <div>Loading</div>;
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')} 
                    onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchStream: (id) => dispatch(actions.fetchStream(id)),
        onEditStream: (id,formProps)  => dispatch(actions.editStream(id,formProps))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);