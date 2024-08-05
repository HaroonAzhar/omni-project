# Omni 
## First setup

- Add `http://dev-omni-ui.com/` to file `/etc/hosts` at line `127.0.0.1 localhost`. The final result should be `127.0.0.1 localhost dev-omni-ui.com`
- Create file `.env` based on files `.env.sample` and `/env.development` , correctly file for development should include keys:

```
REACT_APP_GOOGLE_API_KEY
REACT_APP_RUN_PDF_VIEWER_APP
REACT_APP_USE_LOCAL_API
REACT_APP_LOCAL_API_PORT
REACT_APP_COMPANIES_HOUSE_USERNAME
REACT_APP_ROLLBAR_CLIENT_ACCESS_TOKEN
REACT_APP_REQUIRE_AUTHENTICATION
```

- Create file `.env.development.local` with key and value `REACT_APP_LOCAL_API_PORT=3000`
- Run `yarn` for install project dependencies
- Run `yarn start`
- Application should be available at: `http://dev-omni-ui.com:3000`

## Setting up templates
The web.config in the build folder needs to set ODT files to be served as static files

To do this successfully this also needs .odt to have a registered MIME type - this will generally be done on the MIME Types config in IIS at the Server level (rather than site level). The MIME type for ODT should be application/vnd.oasis.opendocument.text - if ODT/Docxpresso document generation requests are failing to return the template then either the web.config UrlRewrite setting change or the MIME Type change is missing.

Another cause for this failing would be if the settings are locked at server level so the site instance cannot change the UrlRewrite settings.

## Companies house request

In order to successfully run request to companies house from dev machine it is required to:

- add to file `/etc/hosts` line `127.0.0.1 http://dev-omni-ui.com/`
- open in browser `http://dev-omni-ui.com:3000/`

## Redux states

- pre_application - used for saving enquiry or dip data

## Available Scripts

- yarn start
- yarn test
- yarn build
- yarn eject

## Env

REACT_APP_RUN_PDF_VIEWER_APP=dip|facility|false
