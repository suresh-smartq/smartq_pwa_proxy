# SmartQ PWA Proxy

This project provides a proxy setup for the SmartQ PWA application and preconfigured for Web postman browser client

## Getting Started

Follow these instructions to get the proxy server up and running on your local machine.

### Prerequisites

- Node.js 18.20.5: [Install Node.js](https://nodejs.org/)
- Mpm 10.8.2: [Install npm](https://www.npmjs.com/get-npm)

### Configuration for Flutter PWA

- Ensure all API requests from PWA are rerouted to `localhost:3000` through the proxy by adding the following line in `lib/setup_page.dart`:

  ```dart
  AppUtils().baseUrl = 'http://localhost:3000/';
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

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/smartq_pwa_proxy.git
   cd smartq_pwa_proxy
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Proxy

To start the proxy server, run the following command:

```sh
node proxy-server.js
```

### Configuration

To change the cookie and location settings, update the `proxy-server.js` file at line 9 and 10 to include the necessary configuration:

```javascript
//Update the cookie and location below
const cookie = "cookie=2NPiz9LQ*****==";
const location = "qateam";

// existing code...
```

### Contact

For any questions or feedback, please contact us at suresh.s@thesmartq.com
