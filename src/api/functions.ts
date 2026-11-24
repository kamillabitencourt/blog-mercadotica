import axios from "axios";

var url = "";

var isDev = false;

if (isDev) {
  url = "http://localhost:5001/mercadotica-blog/us-central1/default";
} else {
  url = "https://us-central1-mercadotica-blog.cloudfunctions.net/default";
}

const functions = axios.create({
  baseURL: url,
});

export default functions;
