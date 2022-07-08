import React from "react";

const ProductBox = (product, ref) => {
  const { id, title, thumbnail } = product.product;
  return (
    <div key={id} ref={ref} className="product">
      <img className="product-img" src={thumbnail} alt={thumbnail} />
      <p>{title}</p>
    </div>
  );
};

const forwardedProductBox = React.forwardRef(ProductBox);

export default forwardedProductBox;
