const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

var cookie = '';
/// Config Server
/// Updating Cookie and location are optional now

// var cookie = "cookie=1cfm2NXe5tvq2dHU1qWh2N7O1dzV5uDWmsTR4JybrsqbqNbWpcrNxJOjlJaqnJnSqaqcx9GUyKuUlqvMxKbX182Z0sTD1JObqpmYpqWm0cnNmsOqlMjZypTQ2K2eoJyZj6OUkaifgqCkrp-YppeVrJebqKSZ1Narzp2hk8illMmtncahqKbSm9CYlKWXx9idkqXX1g==";
// var location = "marvel"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://dedemo.thesmartq.com/";

// var cookie = "cookie=hIe718XIy-HX2eGUpLy5m9_YrMS6zLLInszZwticp5uyvKqqu9nlxrjBlq3fscfo6Ou418WtpauptuWzpOTb6eHL3pTWqMmY76K5s9fdn5C6uJjLmcm3ssSatbGpoNGWxKqWm9mckqKtrKCXopPIqJrJp52YotfWpJfSw5ijwp2uoJSmpqeeyZ2UlKvCyavPkqWsps2Xo5KUp5PK2Z-doaihnJqZk5iTkpSwmZOprKmfm5-RnayXmaqhx6SppKOepMWSqJWUqaLEqKWp0pzNwpPUxpWn";
// var location = "qateam"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://au.time2eat.app/";

// var cookie = "sq_at=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTljMmU2MC02MGI5LTcyZTctOTcxZC05MDE5NTE2ZTRmYzEiLCJvcmdhbmlzYXRpb25faWQiOiJnbG9iYWxfYXUiLCJ1c2VyX3R5cGUiOiJlbXBsb3llZSIsImNoYW5uZWwiOiJwd2EiLCJpYXQiOjE3NzM2NDI5MTMsImV4cCI6MTc3MzY0MzgxM30.QdTAglAn1F_-P5s8PT9M2vpb49U1Q_zpMbBW0_GQVi8";
var location = "global"; //Internal location id should be used ( example for marval => marval123 )
const target = "https://v1-audemo.thesmartq.com/";

// var cookie = "cookie=0sXqzsPc8ujR2OCZoufJyenWw-Ho5ZrI286dp8eWqp_E0NWsoMrOw8WplZeonMXV19fOy6CXxKaVl9rPxdOt1qDKosaaqpLIrc6So6eqoZmcmpSrw8mvypek2q-elZmSkqCTmZaZm6mmq6aWpJWVp5Wfrs2bpqbVzZ6jxcTXxJmooZimrKWcxtCWmdeWyqafmdI=";
// var location = "qateam"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://audemo.thesmartq.com/";

// var cookie = "cookie=0sXqzsPc8ujR2OCZoufJyenWw-Ho5ZrI286dp8eWqp_E0NWsoMrOw8WplZeonMXV19fOy6CXxKaVl9rPxdOt1qDKosaaqpLIrc6So6eqoZmcmpSrw8mvypek2q-enpmRk6CTmpaZmamlraadnZSXo5ifqc3D1KXWopmjmJTWwpzbm5iiqqadmKHDw9iSmKnNyKY=";
// var location = "qateam"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://hkdemo.thesmartq.com/";


// var cookie = "cookie=hIe718XF4defz53RpcjQtqfi0ePcxresscSSyamz3L2NsKm75tTXxpXKrbrdssbStabUqN_YseO3nPDhkdOp4bHbsLDMrpeXrJuXodqtoJajkZOnxsmooJqiqqqil6GVlayXmtvNxdOo16OYpZmao5KXr57DotWnpMugk8emk5StnpXVqaenl52OkqyOlquJkqeup5-fo5eYqZaUsc-V0NbXoMqlxcSnxMqpn5if16qelqXGkqvFyK6elNHY";
// var location = "time2eat"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://de.time2eat.app/";

// cookie = "cookie=hIe718XDuKXcmta4scqz3sG8yNLGpsCw08Kuybis3Liyn6nDw9zaxNvh1qqntZfesa-fxqSUmNXEmKaaxKCq2c3H0prD2JfK2KCXoqapz5XQl5mqlcWuoJPRra2cyNHDyKWVyNeZlNPa2M-WnpGYqZGcsZuTnKSqmZeigZKpm5Smo5mfqKicnKfDlqyUyaqdlqSmrM2Y0pmbo5LGqZrD06Sq0cjOk5LXwg==";
// var location = "autoverse"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://uspreprod.thesmartq.com/";

// cookie = "cookie=hIe718XlteelyNjQuOOSp7i50-K44p6w1paww6q2vazMu6PXt624qdPpkKjgzsTmsa-jnaPGw9mSx9mhl9DardLHzsLI2cOUr86bo9Wropefl5mkk8XYz5inqayiyqCUxaSSlKyck9XY2qCWnpObp5SVsZubnKSpmZeigZOkm5Wvo5WfrKajmKeWl9SWmq6dlKjZqJ6aocXI1ZGX2JuT0arYnMaimMfUxQ==";
// var location = "regteam"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://depreprod.thesmartq.com/";

// cookie = "cookie=hIe718XJq8egyZ6Y0NrLqt3fqb7d47XG4dbb2rTPt6DN1c7g1ZDVp5Liucrf4Lzisa-enqPEktaVmticlaippqOVocOZ2ZqUq5vHp6umopWcmZSjl5ermpfRra3Sx5-VkteTxa6gk6Pap87HzZXEqJKXsZmUnKWlmZehgZKpm5Sqo5mopqydmafCyNTFytvMmairp5_IosOT1sWXqJzFoaWlpcrSmJqpww==";
// var location = "eurestdemo"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://espreprod.thesmartq.com/";

// var cookie = "cookie=08nd3cfQ4fLgyt_Vl7PVzNvcz9Dm6N2Tz9DPrpqb2Z7Gp6eonsedk5TVlpqumsfVpKqlmKKamtXCmqugl9Wq2p6dnJeaqpTJ2qGT1NWqo8nNl8enw8bZoJmfq6SnmJyOkqeOlqyJk6CupKWfn5iappKasZrF1aaln8nRlpqsl5XZzMTUpNmklpyXktjEx63PmNOm";
// var location = "regteam"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://depreprod.thesmartq.com/";

// var cookie = "cookie=wtLwyMjk4tfgztvP1dLG2tvX1uLy6NHY4Jei58nJ6dbD4ejlmsjbzp2kx5bXm5ulqNWklc2Vl9bGnKnMxNPWq6DLnsaT15WXp57DpqTZoJfRlJmllcqozMbUrNfOnaWZmKyXytidmdTar56ZmZKUoJOZlpqUqamkppigmpKlkZ-pn5jT1tXSmZzEm6jEytzPlaGs1p6eoMLEqJmXqZ6T1Q==";
// var location = "anz"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://nzpreprod.thesmartq.com/";

// var cookie = 'cookie=hIe718WewqnG1-XQrcnb2OGq28nC7cTel86mpqfL69ySt9-mwdHVwsvJlrDwvpLS3eGgq7_Xy-3MrLeg27DW4rSn5KPcrpPK3JvIo9mtpcmjlJSnwp3cn8inqtafnZ6SxKyVmaaik9PZ1aDLo5qY2ZiWrJqWo6mrnMiikcOplpnZysio2q2nlZ6Ok6SOlquJk6Gup5yfopOVpJGascySoqWknp2dxcXZwsWunMTTqaqklp6WxNmUyqrPxNGp';
// var location = 'admin'
// const target = "https://sngpreprod.thesmartq.com/"

// var cookie = "cookie=hIe718W8p6zb0aTIuri02OnDpsDj39GwubXFrKm9u5iUu9XNwNXXksbLy9rq35bIsa-cmtCZxNeRyNmZxKCkqNCbzcWbppLGqKLE0KjYzpigw8WllJ2mypjRqKylnZ-UxaWXxambyKXa2KXLnJSSqZiYsZqbnKWkmZehgZOkm5iuo5Kfpaugl6fDmqSTlNmZkqes2KGdnJaZqMSUqs_F09faoMjQlJejmQ==";
// var location = "hella"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://es.time2eat.app/";

// var cookie = "cookie=hIe718Wipb_auObG0t3Pt-Pd1tbt7JuupK_XqNXJwru5wrvE0NfQtZK-lbvulK7esa_RmdDFmdWWmKqZmKSl1s_G0ZqWpMaZrqCU0tqqzpidl5Oox5WmzpagrNfNmaCTmavGmqrMlKLV19CW0pPIrJLGsZubnKSomZeigZOmm5Wmo5ahqqihmKfHmKjGx9ehmKPZ2c7GopXD2cKd2s6Xn6iposnNmJmjxg==";
// var location = "qateam"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://jp.time2eat.app/";

// var cookie = "cookie=hIe718W9xba-3K7SvNbCm7qgx7a2xc_dnZWSqLbe29XE2OampKzSp8i9mdzZ47rIsa-jyqGTmaeZlquhmqjarKWXopWT18LJrJ6Zn6epo5WelJSqxcWuy8PSpKzQl52SmKqUx6-fxaGtpNCYnMKS15PHsZqUnKSpmZeigZKpm5muo5ampq2inafFyKWZl6yZxNOpqZ-bnsWY2JLHqc-Wp6ylzpiemJrWxA==";
// var location = "hsbchk"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://hk.time2eat.app/";

// var cookie = 'cookie=yNDly8Pb09Xh4-DG1eeSl7bdytTn4c3X4NKQ1tDRsZrHodXVoJ6dwsXYk5upnJajrKakx87Ek6vFlqnKxtKtpc_JnMXGrJnFqaCb1aaooZydxpilxJmtzpSj2KbPnp6clKuOlKmWlKWUpKKfnJWcqpWUqKGVqqiqoJeckcXUwpSvzcejrNnQnqKWxqqZmKnMl9Ha2dCd';
// var location = "global"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://audemo.thesmartq.com/";

// cookie = "cookie=hIe718XE16S61Z3Rzburyeudr7fjn7izz6_F36vXr8Gstsnt5NbR0o2-mpi4wZWl7sCfmr2yutWlx7fUyMDg3s7VutuUrpiYr5ua1NXXnJWkk8OjmJutmcbU2qjSmKXGyKaVltifmqWr2tLI0seZp5Sb3KCXqKjVzsugxZWomMiuypnVpqinlqWOk6OOlquJkqaup6WfoZSaqJiWsaDG0temncigkpKmw5mpy8bR2NfRmqSYl6yYl6qblNTZ";
// var location = "brunel"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://menu-revamp-dot-smartqprd-chi.rj.r.appspot.com/";

// var cookie = "cookie=hIe718W-xN7P05fUtKvJ0r_ir7DJyMaUwMrD2aiqza-xv-2mr8bg2dLel6XAmsbasa-ey5yUldfClNqdmqTaqqOWnMKUppqVpsyZ1dmsnMjSxZSrwpSmm8Wmpa2kxp6Ul6uSlqmhlqXa1aCa0ZmWqcSUsZuTnKSlmZeigZKrm5iso5WkraSllaeYxqSYx62ik6PapJ-W0sSa1JKdr52S0KasoZfRmZOnww==";
// var location = "wolfpack"; //Internal location id should be used ( example for marval => marval123 )
// const target = "https://usdemo.thesmartq.com/";

// Enable CORS
var whitelist = [
  "http://localhost:4000",
  "http://localhost:4001",
  "http://localhost:4003",
  "http://localhost:4010",
  "https://web.postman.co",
  "http://0.0.0.0:5000",
  "http://10.197.249.233:5000",
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

const TRACKED_COOKIE_NAMES = new Set(["cookie","sq_at", "sq_rt"]);

function parseSetCookieNameValue(setCookieHeader) {
  const pair = setCookieHeader.split(";")[0].trim();
  const eq = pair.indexOf("=");
  if (eq <= 0) return null;
  const name = pair.slice(0, eq).trim();
  const value = pair.slice(eq + 1);
  return { name, value };
}

function mergeIntoCookieHeader(existing, pairs) {
  const map = new Map();
  if (existing) {
    existing.split(";").forEach((segment) => {
      const p = segment.trim();
      if (!p) return;
      const eq = p.indexOf("=");
      if (eq > 0) map.set(p.slice(0, eq).trim(), p.slice(eq + 1));
    });
  }
  pairs.forEach(({ name, value }) => map.set(name, value));
  return Array.from(map.entries())
    .map(([n, v]) => `${n}=${v}`)
    .join("; ");
}

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
          const setCookieHeaders = proxyRes.headers["set-cookie"];
          if (!setCookieHeaders?.length) return;

          const fromResponse = [];
          setCookieHeaders.forEach((headerLine) => {
            const parsed = parseSetCookieNameValue(headerLine);
            if (parsed && TRACKED_COOKIE_NAMES.has(parsed.name)) {
              fromResponse.push(parsed);
            }
          });

          if (fromResponse.length > 0) {
            location = req.headers["smartq_location"];
            cookie = mergeIntoCookieHeader(cookie, fromResponse);
            const cookieOptions = {
              maxAge: 900000,
              httpOnly: true,
              sameSite: "none",
            };
            fromResponse.forEach(({ name, value }) => {
              res.cookie(name, value, cookieOptions);
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