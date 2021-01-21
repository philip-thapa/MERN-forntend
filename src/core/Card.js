import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";
import { toast } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import "react-toastify/dist/ReactToastify.css";

const Card = ({
  product,
  addToCart,
  removeFromCart,
  setReload = (f) => f,
  // function(f)= return f
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "Default name";
  const cartDesc = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "Default Price";

  const addToCartMethod = () => {
    if (isAuthenticated()) {
      console.log("Added to cart");
      // toast(`${product.name} added to cart`, { type: "success" });
      addItemToCart(product, () => setRedirect(true));
    } else {
      return toast("Please, signin to buy the products", { type: "warning" });
    }
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addToCartMethod}
          className="btn btn-block btn-outline-info my-1"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromToCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
            toast(`${product.name} removed from the cart`, { type: "info" });
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card rounded shadow-sm border-0">
      <div className="card-body p-4">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <div className="text-dark">{cartTitle}</div>
        <p className="small text-muted font-italic">{cartDesc}</p>
        <p className="text-left">Rs {cartPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromToCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
