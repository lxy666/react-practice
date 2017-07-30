'use strict';

import React, { PropTypes } from 'react';
import ReactDOM             from 'react-dom';
import Popup                from 'components/PopupComponent';
import { Promise }          from 'es6-promise';
import cx                   from 'classnames';

require('styles/ui/Confirm.scss');

class ConfirmComponent extends React.Component {
  render() {
    return (
      <Popup className={cx('confirm', this.props.className)}>
        <section className="confirm-component">
          <div>{this.props.children}</div>
          {this.props.subTitle?
            <div className="confirm-subMsg">{this.props.subTitle}</div> : null
          }
          <div>{this.props.subMsg}</div>
          <footer>
            { this.props.withCancel ?
              <button onClick={this.props.onCancel}>{this.props.cancelCaption}</button>
              : null }
            { this.props.withOK ?
              <button onClick={this.props.onConfirm}>{this.props.confirmCaption}</button>
              : null }
          </footer>
        </section>
      </Popup>
    );
  }
}

ConfirmComponent.displayName = 'UiConfirmComponent';

// Uncomment properties you need
ConfirmComponent.propTypes = {
  cancelCaption  : PropTypes.string.isRequired,
  confirmCaption : PropTypes.string.isRequired,
  className     : PropTypes.string,
  subTitle       : PropTypes.string
};

ConfirmComponent.defaultProps = {
  withCancel     : true,
  withOK         : true,
  cancelCaption  : '取消',
  confirmCaption : '确定',
  className     : '',
  subTitle       : null
};

function Confirm(msg, opts) {
  return new Promise((resolve, reject) => {
    const node = document.createElement('div');
    const onConfirm = ()=> {
      ReactDOM.unmountComponentAtNode(node);
      resolve();
    };

    const onCancel = ()=> {
      ReactDOM.unmountComponentAtNode(node);
      reject();
    };

    ReactDOM.render(
      <ConfirmComponent onConfirm={onConfirm} onCancel={onCancel} {...opts}>
        {msg}
      </ConfirmComponent>,
      node
    );
  });
}

function Alert(msg, opts) {
  return new Promise((resolve) => {
    const node = document.createElement('div');
    const onConfirm = ()=> {
      ReactDOM.unmountComponentAtNode(node);
      resolve();
    };

    ReactDOM.render(
      <ConfirmComponent withCancel={false} onConfirm={onConfirm} {...opts}>
        {msg}
      </ConfirmComponent>,
      node
    );
  });
}

export { Confirm as default, Alert };