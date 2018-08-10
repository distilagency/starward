import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { isClient } from '../../config/app';
import './Modal.scss';

const appRoot = isClient ? document.getElementById('app') : null;

export default class Modal extends Component {
  componentDidMount() {
    if (isClient) {
      document.addEventListener('keydown', this.handleEscKey, false);
      window.addEventListener('beforeunload', this.onUnload);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.active && !nextProps.active) {
      this.onUnload();
    }
  }
  componentWillUnmount() {
    if (isClient) {
      document.removeEventListener('keydown', this.handleEscKey, false);
      window.removeEventListener('beforeunload', this.onUnload);
    }
  }
  onUnload = (event) => {
    const promptConfirm = document.querySelector('.loading') || this.props.warnBeforeClose;
    // eslint-disable-next-line
    if (promptConfirm && event) event.returnValue = 'Are you sure?';
  }
  handleEscKey = (event) => {
    if (event.keyCode === 27) this.props.closeModal(event);
  }
  handleModalBackgroundClick = (event) => {
    if (event.target.className.indexOf('modal ') !== -1) {
      this.props.closeModal(event);
    }
  }
  render() {
    const {
      active,
      closeModal,
      title,
      className,
      children
    } = this.props;
    if (!active) return null;
    return ReactDOM.createPortal(
      // eslint-disable-next-line
      <div
        className={`modal ${className || ''}`}
        onClick={event => this.handleModalBackgroundClick(event)}
        role="dialog">
        <div className="modal-content">
          <Link className="close-button" to="#close" onClick={event => closeModal(event)} />
          {title &&
            <div className="modal-content-title">
              <h3>{title}</h3>
            </div>
          }
          <div className="modal-content-body">
            {children}
          </div>
        </div>
      </div>,
      appRoot
    );
  }
}
