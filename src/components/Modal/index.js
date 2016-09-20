import React, { PropTypes } from 'react'

import './index.css';

class Modal extends React.Component {
  state = {
    isShow: false,
    isOpened: false,
  }

  onOpenClick = (evt) => {
    evt.preventDefault();
    this.setState({
      isOpened: true,
    });

    setTimeout( () => this.setState({
      isShow: true,
    }), 100);
  }

  onCloseClick = (evt) => {
    evt.preventDefault();
    this.setState({
      isShow: false,
    });

    setTimeout(() => this.setState({
      isOpened: false,
    }), 200);
  }

  render () {
    let modalClassName = "modal";

    if (this.state.isShow) {
      modalClassName += " modal--show";
    }

    return (
      <div>
        <a href="#" onClick={this.onOpenClick}>{this.props.children}</a>
        {this.state.isOpened && (
          <div className={modalClassName}>
            <div className="modal-overlay" onClick={this.onCloseClick}></div>
            <div className="modal-container">
              <div className="modal-controls">
                <button onClick={this.onCloseClick}>close</button>
              </div>
              <div className="modal-content">
                {this.props.image && <img src={this.props.image} alt={this.props.imageDescription}/>}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

Modal.propTypes = {
  image: PropTypes.string,
  imageDescription: PropTypes.string,
}

export default Modal;
