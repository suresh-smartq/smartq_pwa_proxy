# SmartQ PWA Proxy

This project provides a proxy setup for the SmartQ PWA application and preconfigured for Web postman browser client

## Getting Started

Follow these instructions to get the proxy server up and running on your local machine.

### Prerequisites

- Node.js 18.20.5: [Install Node.js](https://nodejs.org/)
- Mpm 10.8.2: [Install npm](https://www.npmjs.com/get-npm)

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

- Ensure all API requests from PWA are rerouted to `localhost:3000` through the proxy by adding the following line in `lib/setup_page.dart`:

  ```dart
  @override
  void initState() {
  // existing code...
  AppUtils().baseUrl = 'http://localhost:3000/';
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
        "args": ["--web-port=4000"] //4000 to 4003 multiple instance support
      }
    ]
  }
  ```

### Proxy Configuration

To change the cookie and location settings, update the `proxy-server.js` file at line 9 and 10 to include the necessary configuration:

```javascript
//Update the cookie and location below
const cookie = "cookie=2NPiz9LQ*****==";
const location = "qateam";

// existing code...
```

### Running the Proxy

To start the proxy server, run the following command:

```sh
node proxy-server.js
```

### Running the Flutter Web App

1. To run the Flutter web app, use the following command:

```sh
flutter run -d chrome --web-port=4000
or 
launch.json
```

2. To set up Flutter local cache for the API, go to the `accessCode` page and enter the access code.

3. once you have landed on the login page, you can edit the URL from `login` to `home` to access the contents directly.

### Contact

For any questions or feedback, please contact us at suresh.s@thesmartq.com
