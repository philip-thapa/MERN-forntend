import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";
import empytyBasket from "../Images/emptyBasket.svg";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2 className="text-info text-left">Proceed to Buy</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addToCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-12 col-md-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <div className="row">
              <div className="col-6">
                <img src={empytyBasket} alt="" />
              </div>
              <div className="col-6">
                <h3 className="text-warning">Your Philbah basket is Empty</h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-12 col-md-6">
          <PaymentB products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
