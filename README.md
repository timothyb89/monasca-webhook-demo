Monasca WebHook Demo
====================

A small server and web app to show off Monasca WebHook notifications. It uses
WebSockets to show notifications in realtime when a notification is received.

Building and Running
--------------------

Both the client and server are written in Node and require v6 or later.

Install:

    yarn
    # or
    npm install

To build:

    yarn run build
    # or
    npm run build

To run the server:

    cd srv/
    yarn # or npm install
    npm index.js

It will start the server on port 3030. Point your webhook at
`http://server:3030/post` and alarms should show up on the screen in realtime.
