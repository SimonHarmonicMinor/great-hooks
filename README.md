# Great Hooks

## A bunch of useful react-hooks to make your components less verbose and cleaner


## Table of Contents
* [Quick Start](#quick-start)
* [Status](#status)
* [Usage](#usage)
  * [useAutoUpdateRef](#useautoupdateref)

## Quick Start
Install with `npm`
```shell script
npm install @kirekov/great-hooks
```
Or with `yarn`
```shell script
yarn add @kirekov/great-hooks
```

## Status
[![NPM](https://img.shields.io/npm/v/@kirekov/great-hooks)](https://www.npmjs.com/package/@kirekov/great-hooks)
[![Build Status](https://travis-ci.com/SimonHarmonicMinor/great-hooks.svg?branch=master)](https://travis-ci.com/SimonHarmonicMinor/great-hooks)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=SimonHarmonicMinor_great-hooks&metric=alert_status)](https://sonarcloud.io/dashboard?id=SimonHarmonicMinor_great-hooks)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=SimonHarmonicMinor_great-hooks&metric=coverage)](https://sonarcloud.io/dashboard?id=SimonHarmonicMinor_great-hooks)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

### useAutoUpdateRef
How many times have you written this?
```js
function MyComponent(props) {
  const ref = useRef(props.value);

  useEffect(() => {
    ref.current = props.value;
  }, [props.value]);
  ...
}
```
Forget about it. That's all you need now.
```js
import { useAutoUpdateRef } from '@kirekov/great-hooks';

function MyComponent(props) {
  const ref = useAutoUpdateRef(props.value);
  ...
}
```
