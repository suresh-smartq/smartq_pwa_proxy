const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

//Update the cookie and location below
const cookie ="cookie=0sXqzsPc8ujR2OCZoufJyenWw-Ho5ZrI286dp8eWqp_E0NWsoMrOw8WplZeonMXV19fOy6CXxKaVl9rPxdOt1qDKosaaqpLIrc6So6eqoZmcmpSrw8mvypek2q-flpmRk6CTmZaZmqmmraaenJqZqJifq57D06bXoZmik5OomZuqn5KmpKyemdGRkqSanayalqA=";
const location = "qateam";

app.use(morgan("\n:method :status \n:url :response-time ms"));

// //Issue with body-parser
// // Enable body parsing
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
var whitelist = [
  "http://localhost:4000",
  "http://localhost:4001",
  "http://localhost:4003",
  "https://web.postman.co",
];

app.use(
  cors({
    origin: whitelist, // Allow requests only from this origin
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed methods
  })
);

// Middleware to update the request headers
const requestConverterMiddleWare = (req, res, next) => {
  req.headers["cookie"] = cookie;
  req.headers["smartq_location"] = location;

  try {
    if (req.url.split("?").isNotEmpty) {
      let queryParams = req.url.split("?")[1].split("&"); // Get the query parameters as array
      let queryParamsMap = new Map(
        queryParams.map((param) => param.split("="))
      );
      if (!queryParamsMap.has("location"))
        queryParamsMap.set("location", location);
      queryParams = Array.from(queryParamsMap).map((param) => param.join("="));
      req.url = req.url.split("?")[0] + "?" + queryParams.join("&"); // Update the query parameters
      console.log("query pram:", req.path.split("?")[1].split("&"));
    }
  } catch (error) {
    console.log("\n crashed On RequestConverter MiddleWare :", error.message);
  }
  next();
};

// Proxy configuration
app.use(
  requestConverterMiddleWare,
  createProxyMiddleware({
    target: "https://ukpreprod.thesmartq.com",
    changeOrigin: true,
    logLevel: "debug",
    on: {
      proxyReq: (proxyReq, req, res) => {
        // console.log("\nProxyReq headers:", proxyReq._headers);
        // console.log("\nProxyReq body:", req.body);
      },
      proxyRes: (proxyRes, req, res, next) => {
        // console.log("\nProxyRes statusCode:", proxyRes.statusCode);
        // console.log("\nProxyRes res:", res.body);
        // next()
      },
      error: (err, req, res) => {
        /* handle error */
        // console.log("\nProxyError:", err.message);
      },
    },
  })
);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});
