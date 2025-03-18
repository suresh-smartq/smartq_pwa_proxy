# SmartQ PWA Proxy

This project provides a proxy setup for the SmartQ PWA application and preconfigured for Web postman browser client

## Getting Started

Follow these instructions to get the proxy server up and running on your local machine.

### Prerequisites

- Node.js 18 or latest : [Install Node.js](https://nodejs.org/)
- Npm 10 or or latest : [Install npm](https://www.npmjs.com/get-npm)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/suresh-smartq/smartq_pwa_proxy
   cd smartq_pwa_proxy
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Configuration for Flutter PWA

- Ensure all API requests from PWA are rerouted to `localhost:3000` through the proxy by adding the following line in `lib/setup_page.dart` or `lib/network/api_dio_client.dart`:

  ```dart
  @override
  void initState() {
  // existing code...
  AppUtils().baseUrl = 'http://localhost:3000/'; // <- Added here
  }
  ```

  OR

  ```dart
  Uri _getUrl(
    String url,
    Map<String, dynamic>? queryParameters,) {
    AppUtils().baseUrl = 'http://localhost:3000/'; // <- Added here
    // existing code...
  }

  ```

- To configure VS Code for Flutter Pwa project, create a `.vscode/launch.json` file with the following content:

  ```json
  {
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Flutter Web (Debug)",
        "request": "launch",
        "type": "dart",
        "flutterMode": "debug",
        //4000 to 4003 multiple instance support
        //update --web-renderer base on your project
        "args": ["--web-port=4000", "--web-renderer=canvaskit"]
      }
    ]
  }
  ```

### Proxy Configuration [ Optional after version V2]

To change the cookie and location settings, update the `proxy-server.js` file :

```javascript
/// Updating Cookie and location are optional now
const cookie = "cookie=2NPiz9LQ*****==";
const location = "qateam"; //Internal location id should be used ( example for marval => marval123 )

// existing code...
const target = "https://ukdemo.thesmartq.com/";
```

### Running the Proxy

To start the proxy server, run the following command:

```sh
// Prod
node proxy-server.js

//Dev [Auto restart support]
nodemon proxy-server.js
```

### Running the Flutter Web App

1. To run the Flutter web app, use the following command:

```sh

launch.json [Preferable]

OR

flutter run -d chrome --web-port=4000

```

2. To set up Flutter local cache for the API, go to the `accessCode` page and enter the access code.

3. [ Auto cookie setup ] Then Login as normal to setup server cookie once done you will redirected to home screen

- [ Optional Browser cookie support ] Update `lib/network/api_dio_client.dart`
   on postApiCall function > Options => `extra: {'withCredentials': true} `

OR

3. [ Manual cookie setup ] once you have landed on the login page, you can edit the URL from `login` to `home` to access the contents directly.


5. Restarting Server requires to kill the terminal or PID thread

### Contact

For any questions or feedback, please contact us at suresh.s@thesmartq.com

### Versions

V1 - Base proxy version

V2 -

```
- setup browser cookie support
- added automatic Cookie setter so updating Cookie and location are optional now
- update server url with target constant
- added morgan logger [helps to debug]
```

V3 - Convert as binary tool and portforward support to debug PWA mobile live
