// ######################################################################
// https://betterprogramming.pub/how-to-integrate-django-react-app-with-stripe-payments-95709b3f23e5
// ######################################################################

import axios from "axios";
export const API_URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

//   export default class ApiService{
//     static saveStripeInfo(data={}){
//       return api.post(`${API_URL}/payments/save-stripe-info/`, data)
//     }
//   }

// ######################################################################
// POST username and passwork to http://127.0.0.1:8000/api-token-auth/ to get a token
// the token has to be stored somewhere (localStorage?)
// ######################################################################

// // Example POST method implementation:
// async function postData(url = '', data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

// postData("http://127.0.0.1:8000/api-token-auth/", {
//   username: "fantas300@gmail.com",
//   password: "123456789",
// }).then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
// });
