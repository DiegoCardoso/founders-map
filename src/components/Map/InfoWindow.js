import React, { PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';

class InfoWindow extends React.Component {

  componentDidUpdate(prevProps) {

    this.renderInfoWindow();


    if (this.props.children !== prevProps.children) {
      this.updateContent();
    }

    if ((this.props.visible !== prevProps.visible) ||
        (this.props.marker !== prevProps.marker)) {
      if (this.props.visible) {
        this.showWindow();
      } else {
        this.hideWindow();
      }
    }
  }

  renderInfoWindow () {
    let { google } = this.props;

    this.infoWindow = new google.maps.InfoWindow({
      content: '',
    });

    google.maps.event.addListener(this.infoWindow, 'closeclick', this.onClose);
    google.maps.event.addListener(this.infoWindow, 'domready', this.onOpen);
  }

  onOpen = () => {
    return this.props.onOpen && this.props.onOpen();
  }

  onClose = () => {
    return this.props.onClose && this.props.onClose();
  }

  updateContent () {
    const content = this.renderContent();
    this.infoWindow.setContent(content);
  }

  renderContent () {
    const { children } = this.props;
    return ReactDOMServer.renderToString(children);
  }

  showWindow () {
    this.infoWindow.open(this.props.map, this.props.marker);
  }

  hideWindow () {
    this.infoWindow.close();
  }

  render () {
    return null;
  }
}

InfoWindow.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  marker: PropTypes.object.isRequired,
};

export default InfoWindow;
