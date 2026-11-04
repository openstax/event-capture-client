import test from 'ava';

import { getAuthHeaders } from './authHeaders';

test('returns no headers without tokens', (t) => {
  t.deepEqual(getAuthHeaders({}), {});
});

test('ignores empty tokens', (t) => {
  t.deepEqual(getAuthHeaders({_OX_AUTH_TOKEN: '', _OX_LAUNCH_TOKEN: ''}), {});
});

test('sends the auth token as a bearer token', (t) => {
  t.deepEqual(getAuthHeaders({_OX_AUTH_TOKEN: 'sso'}), {Authorization: 'Bearer sso'});
});

test('sends the launch token as x-launch-token', (t) => {
  t.deepEqual(getAuthHeaders({_OX_LAUNCH_TOKEN: 'launch'}), {'x-launch-token': 'launch'});
});

test('sends both tokens when both are set', (t) => {
  t.deepEqual(getAuthHeaders({_OX_AUTH_TOKEN: 'sso', _OX_LAUNCH_TOKEN: 'launch'}), {
    Authorization: 'Bearer sso',
    'x-launch-token': 'launch',
  });
});
