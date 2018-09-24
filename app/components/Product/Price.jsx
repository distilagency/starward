import React from 'react';

export function Price(props) {
  const {
    priceHtml,
    productType,
    activeVariation
  } = props;
  let { salePrice, regularPrice } = props;
  if (productType === 'variable' && activeVariation) {
    const { variation_regular_price: varRegPrice, variation_sale_price: varSalePrice } = activeVariation;
    regularPrice = varRegPrice;
    salePrice = varSalePrice;
  }
  if (salePrice || regularPrice) {
    return salePrice ? (
      <div className="price">
        <del>
          <span className="woocommerce-Price-amount amount">
            <span className="woocommerce-Price-currencySymbol">$</span>{`${parseFloat(regularPrice).toFixed(2)}`}
          </span>
        </del>
        <span>{' '}</span>
        <ins>
          <span className="woocommerce-Price-amount amount">
            <span className="woocommerce-Price-currencySymbol">$</span>{`${parseFloat(salePrice).toFixed(2)}`}
          </span>
        </ins>
      </div>
    ) : (
      <div className="price">
        <span className="woocommerce-Price-amount amount">
          <span className="woocommerce-Price-currencySymbol">$</span>
          {`${parseFloat(regularPrice).toFixed(2)}`}
        </span>
      </div>
    );
  }
  return <div className="price" dangerouslySetInnerHTML={{ __html: priceHtml }} />;
}
