import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';

import * as actions from '../../store/actions';

class StreamCreate extends Component {
    renderInput = ({ input, label, meta }) => {
        console.log(meta);
        let classnames = ['field'];
        if (meta.error && meta.touched) {
            classnames.push('error');
        }
        return (
            <div className={classnames.join(' ')}>
                <label>{label}</label>
                <input {...input} placeholder={meta.error}/>
            </div>
        );
    };

    onSubmit = (formProps) => {
        this.props.onCreateStream(formProps);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors ={};
    if( !formValues.title ) {
        errors.title = 'You must enter a title';
    }

    if( !formValues.description ) {
        errors.description = 'You must enter a description';
    }
    return errors;
}

// const mapStateToProps = state => {
//   return {
//       isAuthenticated: state.auth.token !== null
//   };
// } 

const mapDispatchToProps = dispatch => {
  return {
    onCreateStream: (formProps) => dispatch(actions.createStream(formProps))
  }
}

const formWrapped = reduxForm({form: 'streamCreate', validate:validate})(StreamCreate);
export default connect(null,mapDispatchToProps)(formWrapped);
