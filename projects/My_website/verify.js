const http = require('http');

const get = (url, opts = {}) =>
  new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', (e) => resolve({ status: 0, body: e.code }));
    req.setTimeout(8000, () => { req.destroy(); resolve({ status: 0, body: 'TIMEOUT' }); });
  });

const post = (url, data) =>
  new Promise((resolve) => {
    const u = new URL(url);
    const payload = JSON.stringify(data);
    const req = http.request(
      { hostname: u.hostname, port: u.port, path: u.pathname + u.search, method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ status: res.statusCode, body }));
      }
    );
    req.on('error', (e) => resolve({ status: 0, body: e.code }));
    req.setTimeout(8000, () => { req.destroy(); resolve({ status: 0, body: 'TIMEOUT' }); });
    req.write(payload);
    req.end();
  });

(async () => {
  const fe = await get('http://localhost:5173/');
  console.log(`Frontend  :5173        -> HTTP ${fe.status} ${fe.status === 200 ? 'OK (React served)' : fe.body.slice(0,80)}`);

  const health = await get('http://localhost:5000/api/health');
  console.log(`Backend   :5000 health -> HTTP ${health.status} ${health.body.slice(0,60)}`);

  const projects = await get('http://localhost:5000/api/projects');
  let pcount = '?';
  try { pcount = JSON.parse(projects.body).data.length; } catch {}
  console.log(`Projects endpoint      -> HTTP ${projects.status} (${pcount} projects)`);

  const login = await post('http://localhost:5000/api/auth/login', { email: 'admin@portfolio.com', password: 'Admin123!@#' });
  let token = null;
  try { token = JSON.parse(login.body).token; } catch {}
  console.log(`Admin login            -> HTTP ${login.status} ${token ? 'OK (JWT issued)' : login.body.slice(0,80)}`);
})();

