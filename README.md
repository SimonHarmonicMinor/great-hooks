# Great Hooks

## A bunch of useful react-hooks to make your components less verbose and cleaner


## Table of Contents
* [Quick Start](#quick-start)
* [Status](#status)
* [Usage](#usage)
  * [useAutoUpdateRef](#useautoupdateref)
  * [useInterval](#useinterval)
  * [useEventListener](#useeventlistener)

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

> :heavy_check_mark: The library has been written in TypeScript. So, it supports types checking.

### useAutoUpdateRef
How many times have you written this?
```typescript
function MyComponent(props) {
  const ref = useRef<string>(props.value);

  useEffect(() => {
    ref.current = props.value;
  }, [props.value]);
  ...
}
```
Forget about it. That's all you need now.
```typescript
import { useAutoUpdateRef } from '@kirekov/great-hooks';

function MyComponent(props) {
  const ref = useAutoUpdateRef<string>(props.value);
  ...
}
```

### useInterval
If you need to start an interval inside your component, `useInterval` might be handy.

```typescript
import { useInterval } from '@kirekov/great-hooks';

function EndlessTimer(props) {
  ...
  const onUpdate = () => { ... };
  useInterval({ callback: onUpdate, interval: 5000 })
}
...
type UseIntervalParams = {
  callback: () => any
  interval: number
  delay?: number
}
```

`delay` attribute defines the pause time before the first `callback` invocation.


### useEventListener
Although `React` provides us with convenient API to bind event listeners to the DOM,
sometimes it's required to come up with custom solutions. For example, we can do it like this.

```typescript
function CustomEventComponent(props) {
  ...
  useEffect(() => {
    document.addEventListener('click', onCustomClick);
    return () => {
      document.removeEventListener('click', onCustomClick);
    };
  }, [])
}
```

Thankfully `great-hooks` gives much simpler solution.
```typescript
import { useEventListener } from '@kirekov/great-hooks';

function CustomEventComponent(props) {
  ...
  useEventListener({ eventName: 'click', onEventTriggered: onCustomClick, eventTarget: document });
}
```
