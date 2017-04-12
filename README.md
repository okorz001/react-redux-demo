# react-redux-demo

A simple demonstration of React and Redux.

This is not meant to be a starting template for serious projects. Instead it
demonstrates how various components and tools can be put together.

## Usage

To launch a production instance:
```sh
$ npm run clean # optional
$ npm run build
$ npm start
```

To launch a development instance:
```sh
$ npm run dev
```

## Features

### Production

* Compile modern JavaScript to target browsers unless supported natively
* Compile or prefix modern CSS to target browsers unless supported natively
* Single static JS asset
* Single static CSS asset
* Assets have build hash, allowing high max-age

### Development

* Single node process (no orphans, reuse webpack cache)
* Hot replace JS: React components
* Hot replace CSS
* Hot replace JS: Redux reducer
* Redux devtools (ctrl-h to hide, ctrl-n to switch monitors)
* Hot reload routes in server
