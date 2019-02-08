import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
    renderInput = ({ input, label, meta }) => {
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
        this.props.onSubmit(formProps);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="title" component={this.renderInput} label="Enter Title" value={'test'} />
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

export default reduxForm({form: 'streamForm', validate:validate})(StreamForm);
