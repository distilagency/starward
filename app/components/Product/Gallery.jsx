import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { WP_URL } from '../../config/app';
import './Gallery.scss';

export default class Gallery extends Component {
  state = {
    activeImageIndex: 0
  };
  selectImage = (event, selectedImaged) => {
    if (event) event.preventDefault();
    const { activeTab } = this.state;
    if (activeTab !== selectedImaged) {
      this.setState({ activeImageIndex: selectedImaged });
    }
  }
  render() {
    const {
      images,
      showGallery
    } = this.props;
    const { activeImageIndex } = this.state;
    const activeImage = showGallery ? images[activeImageIndex] : images[0];
    return (
      <div className="gallery">
        <img className="active-image" src={`${WP_URL}${activeImage.src}`} alt={activeImage.alt} />
        { showGallery &&
          <ul className="gallery-images">
            {(images && images.length > 1) && images.map((image, index) => {
              const { src, alt } = image;
              return (
                <li className="gallery-image" key={src}>
                  <Link
                    to="#"
                    onClick={event => this.selectImage(event, index)}>
                    <img className="inner-image" src={`${WP_URL}${src}`} alt={alt} />
                  </Link>
                </li>
              );
            })}
          </ul>
      }
      </div>
    );
  }
}
