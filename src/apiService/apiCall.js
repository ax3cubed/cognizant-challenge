import axios from "axios";

export async function GET(url) {
  let response = [];
  response = await axios
    .get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
  return response;
}

export async function POST(url, request) {
  let response = await axios
    .post(url, request)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
  return response;
}
