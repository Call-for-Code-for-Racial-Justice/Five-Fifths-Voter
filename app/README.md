# Five Fifths Voter site runs as a nuxt application on IBM Cloud

See the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
cd app # the directory with this README
npm install
```

## Development Server

Start the development server on `http://localhost:4007`:

```bash
npm run dev
```

If you are working on the "Journey" page, you will want to start 
the [mockoon](https://mockoon.com/tutorials/run-mock-api-anywhere-cli/) server to access the mock Google civis APIs.
1. **option 1** - `npm run dev`
   ```shell
   cd local-dev
   npm i
   npm run dev
   ```
   You should see something like this 
   > local-dev@1.0.0 dev
   > 
   > mockoon-cli start --data ./mock/civics.json
   > 
   > {"app":"mockoon-server","environmentName":"Civics API","environmentUUID":"c958f96e-2ff0-49a2-b0ab-e3b18fc585cc","level":"info","message":"Server started on port 4514","timestamp":"2024-02-29T18:54:17.809Z"}

2. **option 2** - Mockoon GUI
   - choose File / Open environment
   - Open `local-dev/mock/civics.json`
   - Start server
   **NOTE**: **⚠**  It is easy to make unintended changes to the civics.json while in the UI. Please do not include updates to this file in your PR unless you **intentionally** changed it. 

3. **option 3** - Mockoon CLI
   If you have already installed mockoon globally, you can run `mockoon-cli start --data local-dev/mock/civics.jsonn`

## Production

See the [deployment](../doc/DEPLOYMENT.md) documentation. 
This is only interesting if you are interested in deploying somewhere else.
You do not need this for doing local development.
