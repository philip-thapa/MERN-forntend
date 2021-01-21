import { API } from "../../backend";

export const getOrder = (userId, token) => {
  return fetch(`${API}orders/user/${userId}`, {
    method: "GET",
    headers: {
      //   Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
