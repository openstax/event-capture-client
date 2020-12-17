import test from 'ava';
import sinon from 'sinon';

import { createEvent } from "./events";


test('createEvent basic event', (t) => {
  const testFormatter = (input: {str: string, num: number} | null | undefined): any => input ? ({testString: input.str, testNumber: input.num}) : null;

  const testEventFactory = createEvent(testFormatter);

  const initializedEvent = testEventFactory({num: 4, str: 'test'});
  const payload = initializedEvent();

  t.deepEqual(payload, {testString: 'test', testNumber: 4});
});

test('createEvent event with basic provider', (t) => {
  const testFormatter = (input: {str: string, num: number} | null | undefined): any => input ? ({testString: input.str, testNumber: input.num}) : null;
  const testProvider = () => () => ({str: 'test'})

  const testEventFactory = createEvent(testFormatter,
    testProvider
  );

  const initializedEvent = testEventFactory({num: 4});
  const payload = initializedEvent();

  t.deepEqual(payload, {testString: 'test', testNumber: 4});
});

test('createEvent event with provider that takes input', (t) => {
  const testFormatter = (input: {str: string, num: number} | null | undefined): any => input ? ({testString: input.str, testNumber: input.num}) : null;
  const testProvider = (input: {providerInput: string}) => () => ({str: input.providerInput})

  const testEventFactory = createEvent(testFormatter,
    testProvider
  );

  const initializedEvent = testEventFactory({num: 4, providerInput: 'foo'});
  const payload = initializedEvent();

  t.deepEqual(payload, {testString: 'foo', testNumber: 4});
});

test('createEvent event where providers provide all input', (t) => {
  const testFormatter = (input: {str: string, num: number} | null | undefined): any => input ? ({testString: input.str, testNumber: input.num}) : null;
  const testProvider1 = () => () => ({str: 'test'})
  const testProvider2 = () => () => ({num: 4})

  const testEventFactory = createEvent(testFormatter,
    testProvider1,
    testProvider2
  );

  const initializedEvent = testEventFactory();
  const payload = initializedEvent();

  t.deepEqual(payload, {testString: 'test', testNumber: 4});
});

test('createEvent initializes providers when event input is provided', (t) => {
  const testFormatter = (input: {str: string, num: number} | null | undefined): any => input ? ({testString: input.str, testNumber: input.num}) : null;

  const providerInitializer = sinon.fake.returns(() => ({str: 'test'}));
  const testProvider: () => () => ({str: string}) = providerInitializer

  const testEventFactory = createEvent(testFormatter,
    testProvider
  );

  testEventFactory({num: 4});

  t.assert(providerInitializer.called);
});

test('createEvent does not reinitialize providers when creating payload', (t) => {
  const testFormatter = (input: {str: string, num: number} | null | undefined): any => input ? ({testString: input.str, testNumber: input.num}) : null;

  const providerInitializer = sinon.fake.returns(() => ({str: 'test'}));
  const testProvider: () => () => ({str: string}) = providerInitializer

  const testEventFactory = createEvent(testFormatter,
    testProvider
  );

  const initializedEvent = testEventFactory({num: 4});

  t.assert(providerInitializer.calledOnce);

  initializedEvent();
  initializedEvent();
  initializedEvent();
  initializedEvent();

  t.assert(providerInitializer.calledOnce);
});
