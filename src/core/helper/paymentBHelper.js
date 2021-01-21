import { API } from "../../backend";

export const getMeToken = (userId, token) => {
  return fetch(`${API}payment/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const processPayment = (userId, token, paymentInfo) => {
  return fetch(`${API}payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const sendConfirmationEmail = (token, email, userId) => {
  return fetch(`${API}order/sendconfirmationEmail/${userId}`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(email),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
