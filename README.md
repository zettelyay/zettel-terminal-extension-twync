# Zettel Terminal Extension Twync

This repository contains both client-side and server-side implementation for \_Twitter sync (a.k.a. Twync) extension for [Zettel Terminal](https://app.zettel.ooo). You can read more about the product [here](http://zettel.ooo).

It's created based on the [seed project **zettelyay/zettel-terminal-extension-seed**](https://github.com/zettelyay/zettel-terminal-extension-seed) to speed-up the implementation. Feel free to develop this work further or start developing your own extension based on the same seed project.

The repository insists of two projects:

1. The `client` project, this is the main extension implementation which is about to be executed along with the actual web-based app itself.

   Here are the scripts to support that:

   - To upgrade the Zettel dependencies `@zettelproject/terminal-extension-api` and `@zettelproject/api-client` to their newest versions:
     ```sh
     client$ npm run upgrade
     ```
   - To build the extension and pack the zip file to be uploaded to [Zettel's Developer Console](https://app.zettel.ooo/developer):
     ```sh
     client$ npm run build
     ```
     > **Note:** The built extension goes to the `client/output` folder.

1. The `server` project, which is only needed for extensions which require their own server-side implementation.

   Here are the scripts to support that:

   - To upgrade the Zettel dependency `@zettelproject/api-server` to its newest version:
     ```sh
     server$ npm run upgrade
     ```
   - To start the server:
     ```sh
     server$ npm run dev   # For development, with hot reloads
     server$ npm start     # For production
     ```

For more information, please [contact the development team](mailto:ahs502@gmail.com).
