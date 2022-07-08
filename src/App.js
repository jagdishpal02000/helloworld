import React, { useState, useRef, useCallback } from "react";
import ProductBox from "./ProductBox";
import Loading from "./loading";
import useProduct from "./useProducts";
import Error from "./Error";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState({limit:9,skip:0});
  const { load, prod, error } = useProduct(pageNumber);

  const observer = useRef();
  const lastProdRef = useCallback(
    (node) => {
      if (load) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting ) {
          setPageNumber((prevPage) => {
            return {limit:prevPage.limit + 5 , skip:prevPage.skip}
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [load]
  );

  return (
    <>
      <section className="main-container">
      <div className="ProductBox">

        {prod.map((product, index) => {
          if (prod.length === index + 1) {
            return (
              <ProductBox
                ref={lastProdRef}
                product={product}
                key={product.id}
              />
            );
          } else {
            return <ProductBox product={product} key={product.id} />;
          }
        })}
        {load && <Loading />}
        {error && <Error />}
      </div>
      </section>
    </>
  );
};

export default App;
