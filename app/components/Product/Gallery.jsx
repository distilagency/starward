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
        <img className="active-image" src={`${WP_URL}${activeImage.src}`} alt={activeImage.src} />
        { showGallery &&
          <ul className="gallery-images">
            {(images && images.length > 1) && images.map((image, index) => {
              const imageUrl = `${WP_URL}${image.src}`;
              return (
                <li className="gallery-image" key={imageUrl}>
                  <Link
                    to="#"
                    onClick={event => this.selectImage(event, index)}
                    className="inner-image"
                    style={{backgroundImage: `url('${imageUrl}')`}} />
                </li>
              );
            })}
          </ul>
      }
      </div>
    );
  }
}
