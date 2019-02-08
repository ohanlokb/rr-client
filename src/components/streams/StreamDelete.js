import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions';
import Modal from '../UI/Modal/Modal';
import ModalPortal from '../UI/ModalPortal';
import history from '../../history';

class StreamDelete extends Component {
    state = {
        showModal: true
    };

    componentDidMount() {
        this.props.onFetchStream(this.props.match.params.id);
    }

    onDeleteStreamCancel = () => {
        this.setState({showModal:false})
        history.push('/');
    }

    onDeleteStreamContinue = () => {
        this.setState({showModal:false})
        this.props.onDeleteStream(this.props.match.params.id)
    }

    render () {
        if ( !this.props.stream ) {
            return <div>Loading</div>;
        }
        
        // pass function to modalClosed to allow backdrop click to close modal.  
        // <Modal show={this.state.showModal} modalClosed={this.onDeleteStreamCancel}>
        const modal = (
            <Modal show={this.state.showModal} >
                <h2>Delete Stream</h2>
                <div className="ui two column centered grid">
                    <div className="one column centered row">
                        <div className="ui icon header">
                            <i className="question circle outline icon"></i>
                            <h3>Are you sure you want to delete this Stream?</h3>
                        </div>                        
                    </div>
                    <div className="two column centered row">
                        <button className="ui button negative" onClick={this.onDeleteStreamContinue}>Delete</button>
                        <button className="ui button" onClick={this.onDeleteStreamCancel}>Cancel</button>
                    </div>
                </div>
            </Modal>
        );

        const actionButtons = (
            <>
                <button className="ui button negative" onClick={this.onDeleteStreamContinue}>Delete</button>
                <button className="ui button" onClick={this.onDeleteStreamCancel}>Cancel</button>
            </>
        );
        const modalPortal = (
            <ModalPortal
                title="Delete Stream"
                content={`Are you sure you want to delete: '${this.props.stream.title}'`}
                actions={actionButtons}
                onClickBackdrop={()=> history.push('/')} >
            </ModalPortal>
        );

        return modalPortal;
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchStream: (id) => dispatch(actions.fetchStream(id)),
        onDeleteStream: (id)  => dispatch(actions.deleteStream(id))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);