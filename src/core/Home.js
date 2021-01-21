import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import CarouselFunc from "./Carousel";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch();
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Home" className="">
      <CarouselFunc />
      <div>
        <h3 className="text-danger">All Products</h3>
      </div>
      <div className="row pb-5 mb-4">
        {products.map((product) => {
          return (
            <div key={product._id} className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <Card product={product} addToCart={true} removeFromCart={false} />
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default Home;
