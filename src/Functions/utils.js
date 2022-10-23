import { useEffect } from "react";
import SimpleCrypto from "simple-crypto-js";
const _ = require("lodash");
// truncate number of words by passing the paragraph and number
export function truncate(str, num = 12) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}
// to check the list of values is present in the array
export const listChecker = (arr, target) =>
  target.every((v) => arr.includes(v));

// to get index value from a array by passing array by passing the list of values and number
export const get_index = (list, id) => {
  let index = null;
  if (list) {
    // index = list.findIndex((i) => console.log(i.id, "FIXING BUG", id));
    index = list.findIndex((i) => i.id === id);
  }
  return index;
};

export const getDecryptedData = (ciphertext) => {
  let decryptedData = Decrypt(ciphertext);
  console.log("typeof", ciphertext, "ULLIL>>>>>>>>>>");
  return decryptedData;
};

export function Encrypt(word, key = "share") {
  var CryptoJS = require("crypto-js");
  let encJson = CryptoJS.AES.encrypt(JSON.stringify(word), key).toString();
  let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
  return encData;
}
export function Decrypt(word, key = "share") {
  var CryptoJS = require("crypto-js");
  let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8);
  let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
  return JSON.parse(bytes);
}

export function containsWhitespace(str) {
  return /\s/.test(str);
}

export function EncryptBase64(data) {
  var encoded = btoa(JSON.stringify(data));
  return encoded;
}

export function CheckEmail(users, email) {
  if (_.find(users, { email: email })) {
    return true;
  } else {
    return false;
  }
}

export function CheckAuthentication(users, email, password) {
  if (_.find(users, { email: email })) {
    let user = users.filter((i) => i.email === email)[0];
    let user_pswd = user.password;
    let response = {};
    if (Decrypt(user_pswd) === password) {
      response = { StatusCode: 6000, message: "success" };
    } else {
      response = { StatusCode: 6002, message: "incorrect password" };
    }
    return response;
  } else {
    return { StatusCode: 6001, message: "user not found" };
  }
}
