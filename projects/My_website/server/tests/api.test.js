/**
 * Basic API integration tests (run with: npm test)
 * Requires: MONGODB_URI + running server, or set TEST_BASE_URL.
 * Uses Node's built-in test runner (Node 18+), no extra deps.
 */
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const BASE = process.env.TEST_BASE_URL || 'http://localhost:5000/api';

const fetchJson = async (path, options = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
};

describe('portfolio API', () => {
  test('health check responds', async () => {
    const { status, body } = await fetchJson('/health');
    assert.equal(status, 200);
    assert.equal(body.success, true);
  });

  test('public projects list responds', async () => {
    const { status, body } = await fetchJson('/projects?limit=5');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data));
  });

  test('contact validation rejects empty body', async () => {
    const { status, body } = await fetchJson('/contact', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    assert.ok([400, 429].includes(status), `unexpected status ${status}`);
    assert.equal(body.success, false);
  });

  test('admin routes require auth', async () => {
    const { status } = await fetchJson('/projects/admin');
    assert.equal(status, 401);
  });
});
