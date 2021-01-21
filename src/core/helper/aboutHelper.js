import { API } from "../../backend";

export const aboutUs = () => {
  return fetch(`${API}about`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
