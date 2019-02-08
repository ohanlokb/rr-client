import React from 'react';
import ReactDOM from 'react-dom';

//This createPortal approach requires a div being added to the index.html with
// a matching div element id.  i've used the id modal in this example.

const ModalPortal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onClickBackdrop} className="ui dimmer modals visable active">
            <div onClick={e => e.stopPropagation()} className="ui standard modal visable active">
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
}

export default ModalPortal;