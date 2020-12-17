import test from 'ava';

import { createEvent } from "./events";


test('createEvent basic event', (t) => {
  const testFormatter = (input: {str: string, num: number} | null | undefined): any => input ? ({testString: input.str, testNumber: input.num}) : null;

  const testEventFactory = createEvent(testFormatter);

  const initializedEvent = testEventFactory({num: 4, str: 'asdf'});
  const payload = initializedEvent();

  t.deepEqual(payload, {testString: 'asdf', testNumber: 4});
});

test('createEvent event with basic provider', (t) => {
  const testFormatter = (input: {str: string, num: number} | null | undefined): any => input ? ({testString: input.str, testNumber: input.num}) : null;
  const testProvider = () => () => ({str: 'asdf'})

  const testEventFactory = createEvent(testFormatter,
    testProvider
  );

  const initializedEvent = testEventFactory({num: 4});
  const payload = initializedEvent();

  t.deepEqual(payload, {testString: 'asdf', testNumber: 4});
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
  const testProvider1 = () => () => ({str: 'asdf'})
  const testProvider2 = () => () => ({num: 4})

  const testEventFactory = createEvent(testFormatter,
    testProvider1,
    testProvider2
  );

  const initializedEvent = testEventFactory();
  const payload = initializedEvent();

  t.deepEqual(payload, {testString: 'asdf', testNumber: 4});
});
