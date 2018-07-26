import React from 'react';

export function Gallery(props) {
  const {
    baseImage,
    images,
    variations,
    selectedOptions
  } = props;
  // If our selectedOptions matches a variation's attributes,
  // then display the matched variation's image
  const filteredVariations = variations.filter((variation) => {
    const variationAttributeTaxonomies = Object.keys(variation.attributes);
    const selectionOptionsTaxonomies = Object.keys(selectedOptions);
    // Variation must have all selectedOptions
    // check if same number of keys in variation attributes as there are
    // in the selection
    if (variationAttributeTaxonomies.length === selectionOptionsTaxonomies.length) {
      return selectionOptionsTaxonomies.every((taxonomy) => {
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
        { filteredVariationsImageUrls.map((src) => {
          return <img src={src} alt="" key={src} />;
        })}
      </div>
    );
  }
  return (
    <div className="gallery">
      { baseImage && <img src={`${baseImage.src}`} alt={baseImage.src} /> }
      { images.length > 1 &&
        images.map((image) => {
          return (
            <img src={image.src} alt={image.alt} key={image.position} />
          );
        })}
    </div>
  );
}
