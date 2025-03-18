const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

/// Config Server
/// Updating Cookie and location are optional now
var cookie = "";
var location = ""; //Internal location id should be used ( example for marval => marval123 )
const target = "https://ukdemo.thesmartq.com/";

// Enable CORS
var whitelist = [
  "http://localhost:4000",
  "http://localhost:4001",
  "http://localhost:4003",
  "https://web.postman.co",
];

// Enable logging
app.use(morgan("\n:method :status \n:url :response-time ms"));

// //Issue with body-parser
// // Enable body parsing
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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
  req.headers["cookie"] ??= cookie;
  req.headers["smartq_location"] ??= location;

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
    target: target,
    changeOrigin: true,
    logLevel: "debug",
    secure: false,
    on: {
      proxyReq: (proxyReq, req, res) => {
        // console.log("\nProxyReq headers:", proxyReq._headers);
        // console.log("\nProxyReq body:", req.body);
      },
      proxyRes: (proxyRes, req, res, next) => {
        //Verify user and get the cookie & location
        try {
          if (
            req.url === "/v2/app/user/verify" &&
            proxyRes.headers["set-cookie"]?.length > 0
          ) {
            // Set cookie to Server
            cookie = proxyRes.headers["set-cookie"][0].split(";")[0];
            // Set location to Server
            location = req.headers["smartq_location"];
            //Try to set cookie to client
            res.cookie("cookie", cookie.split("=")[1], {
              maxAge: 900000,
              httpOnly: true,
              SameSite: "none",
            });
          }
        } catch (error) {
          console.log("Error on Verify user => " + error);
        }
        // console.log("\nProxyRes statusCode:", proxyRes.statusCode);
        // console.log("\nProxyRes res:", res.body);
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
