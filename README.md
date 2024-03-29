this repo initialized from [typescript-starter](https://github.com/bitjson/typescript-starter). lots of relevant docs there.

# @openstax/event-capture-client

send event data to event-capture-api. our event capture api is an event streaming and retention system designed to enable both research based on behavioral user data and dynamic product logic based on event processing.

## Installation
```
yarn add @openstax/event-capture-client
```

## Dispatching Events
```typescript
import {createCaptureContext} from '@openstax/event-capture-client/capture';
import {coolEvent} from '@openstax/event-capture-client/events';

const context = createCaptureContext({

  /*
   * if set to `false` or a function returning `false`
   * events will still be queued but they will not be
   * flushed to the backend
   */
  sendingEnabled: false,

  /*
   * if fetch returns a TypeError it indicates a connection
   * error and the payload will be retried, anything else
   * will get passed into here
   */
  reportError: sentry.captureException,

  /*
   * ms, defaults 1m
   */
  batchInterval: 60000,

  /*
   * ms, defaults 1m
   */
  retryInterval: 60000,

  /*
   * document object, used to detect browser close and attempt
   * reporting with a beacon. defaults to global document.
   */
  document: window.document,

  /*
   * set to false to delay sending events but still allow collecting them,
   * complete initialization by calling context.configure(clientConfig)
   */
  initialized: true,

  /*
   * additional options to pass into the client config. defaults are the production
   * base url and a fetchApi with `keepalive: true`
   */
  clientConfig: {
    basePath: 'staging.event-capture.openstax.org'
  },

});

context.capture(coolEvent());
context.configure({basePath: 'staging.event-capture.openstax.org'})
```

# Development

## Getting Started

install [nvm](https://github.com/creationix/nvm#installation)

```bash
# use the right version of node
nvm install

# install yarn, skip if you have it already
npm install -g yarn

# install dependencies
yarn

# build swagger files
./script/build-swagger-client.bash
```

## Workflow Scripts

```bash
# runs all tests (lint, spellcheck, unit)
yarn test

# fixes some linting issues automatically
yarn fix

# run the build, generate output files
yarn build

# rebuild when files change
yarn watch:build

# run tests, generate coverage reports, open the html report in a browser
yarn cov

# just regenerate the html report
yarn cov:html
```

## Building Swagger Files
```bash
# use default settings reading from swagger.json in root of repo
./script/build-swagger-client.bash

# using an alternative api server, with the option to use http instead of https
API_HOST="local.com:3001" SECURE=false ./script/build-swagger-client.bash
```

## Event Factory Design
Event factories have two stages. The outer stage is invoked in application-land when the event occurs. Some data may be required to be passed in by the application about the source of the event, other data can be generated by the factory in this stage, such as a timestamp for when the event occurs. The second stage is invoked in library-land when submitting data to the api, this can be used to generate other data, such as a timestamp for when the event is sent. The first stage is invoked only once, invoking it again would create a new event, while the second stage may be invoked multiple times if the upload to the server is retried, the resulting payloads will be discarded if they fail and a new one will be generated on the retry.

The event factory itself has two components, a formatter and 0-n data providers. The formatter is generally provided by the swagger client, it defines the necessary inputs for the event, does some data type conversion, and produces the payload the api expects. Data providers can be composed to provide some of the data the formatter expects, any data not provided by the providers will be required input when invoking the factory. pre-defined events can be seen [here](/src/events.ts), they look like this:
```typescript
export const accessedStudyguide = createEvent(AccessedStudyguideV1ToJSON,
  typeProvider(AccessedStudyguideV1TypeEnum.OrgOpenstaxEcAccessedStudyguideV1),
  clientClockProvider,
  sessionProvider
);
```

The data providers are where the two stage system comes in, a basic provider looks like this:
```typescript
export const clientClockProvider = () => {
  const clientClockOccurredAt = new Date();

  return () => ({
    clientClockOccurredAt,
    clientClockSentAt: new Date(),
  });
}
```
the outer function is invoked when the factory is first called, the resulting function is stored in the event until a batch of events is ready to upload. In the event that an upload needs to be retried, the inner function will be invoked for each try, but the outer function is only ever invoked once. another example of a data provider is one that augments each event with an index indicating the order it occurred in the client. you can see all the pre-defined data providers [here](/src/providers.ts)

## Custom Events
The `createEvent` helper is exposed to allow creating events that are not supported explicitly by the library. Make sure that if you are including session data on your custom event that you use the same `sessionProvider` as any pre-defined events you're also using.

## Release Library

```
yarn prepare-release
yarn publish dist --non-interactive
```
