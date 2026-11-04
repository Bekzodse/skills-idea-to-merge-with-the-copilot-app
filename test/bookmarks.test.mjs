import assert from 'node:assert/strict';
import test from 'node:test';
import {
  formatBookmark,
  loadBookmarks,
  normalizeUrl,
} from '../src/lib/bookmarks.js';

test('normalizes URLs with and without https to the same saved value', () => {
  assert.equal(normalizeUrl('www.example.com'), 'https://www.example.com');
  assert.equal(normalizeUrl('https://www.example.com'), 'https://www.example.com');
});

test('recovers from empty, corrupted, legacy, and non-array storage values', () => {
  assert.deepEqual(loadBookmarks(''), []);
  assert.deepEqual(loadBookmarks('not json'), []);
  assert.deepEqual(loadBookmarks('{"url":"https://example.com","slug":"mona-1234"}'), []);
  assert.deepEqual(loadBookmarks('null'), []);
  assert.deepEqual(loadBookmarks('42'), []);
  assert.deepEqual(loadBookmarks('[{"url":"https://example.com","slug":"mona-1234"},null,{"url":4}]'), [
    { url: 'https://example.com', slug: 'mona-1234' },
  ]);
});

test('formats a saved bookmark with the exact separator', () => {
  assert.equal(
    formatBookmark({ url: 'https://www.example.com', slug: 'mona-7fk2' }),
    'https://www.example.com :: mona-7fk2',
  );
});
