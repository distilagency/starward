import React from 'react';
import { WP_URL } from '../../../server/config/app';

export function Gallery({baseImage, images, variations, selectedOptions}) {
  console.log(selectedOptions);
  // If our selectedOptions matches a variation's attributes,
  // then display the matched variation's image
  const filteredVariations = variations.filter((variation) => {
    const variationAttributeTaxonomies = Object.keys(variation.attributes);
    const selectionOptionsTaxonomies = Object.keys(selectedOptions);
    // Variation must have all selectedOptions
    // check if same number of keys in variation attributes as there are
    // in the selection
    if (variationAttributeTaxonomies.length === selectionOptionsTaxonomies.length) {
      return selectionOptionsTaxonomies.every(taxonomy => {
        return selectedOptions[taxonomy] === variation.attributes[taxonomy];
      });
    }
    return null;
  });
  // Get image urls for matching variations
  const filteredVariationsImageUrls = filteredVariations.map((variation) => {
    return variation.image_url;
  });
  // If there are variation images to show, show them
  if (filteredVariationsImageUrls.length > 0) {
    return (
      <div className="gallery">
        { filteredVariationsImageUrls.map(url => {
          return <img src={`${WP_URL}${url}`} role="presentation" key={url} />;
        })}
      </div>
    );
  }
  return (
    <div className="gallery">
      { baseImage && <img src={`${WP_URL}${baseImage.src}`} alt={baseImage.src} /> }
      { images.length > 1 &&
        images.map(image => {
          return (
            <img src={`${WP_URL}${image.src}`} alt={image.alt} key={image.position} />
          );
        })}
    </div>
  );
}
