import React, { useState, useEffect } from "react";
import { cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import {
  getMeToken,
  processPayment,
  sendConfirmationEmail,
} from "./helper/paymentBHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const email = isAuthenticated() && isAuthenticated().user.email;

  const getToken = (userId, token) => {
    getMeToken(userId, token)
      .then((info) => {
        // console.log("INFORMATION", info);
        if (info.error) {
          setInfo({ ...info, error: info.error });
        } else {
          const clientToken = info.clientToken;
          setInfo({ clientToken });
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
        toast("Payment Failed", { type: "error" });
      });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(async () => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            setInfo({ ...info, success: response.success, loading: false });
            console.log("PAYMENT SUCCESS");
            toast("Order Success", { type: "success" });
            const orderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
            };
            createOrder(userId, token, orderData);
            sendConfirmationEmail(token, email, userId)
              .then((res) => {
                console.log("EMAIL SENT");
                console.log(res);
              })
              .catch((error) => console.log(error));
            cartEmpty(() => {
              console.log("Did we got a crash?");
            });

            setReload(!reload);
          })
          .catch((error) => {
            setInfo({ loading: false, success: false });
            console.log("PAYMENT FAILED");
            toast("Payment Failed", { type: "error" });
          });
      })
      .catch((err) => {
        console.log("Error", err);
        toast("Payment failed, please try again", { type: "error" });
      });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>
        Your Bill is <span className="text-danger">{getAmount()}</span>$
      </h3>
      {showbtdropIn()}
    </div>
  );
};

export default PaymentB;
