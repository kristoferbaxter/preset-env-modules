const fs = require('fs');
const path = require('path');
const polka = require('polka');

polka()
  .get('/js/:file', (req, res) => {
    const file = path.resolve(__dirname, req.params.file);
    let stream = fs.createReadStream(file);

    stream.on('error', error => {
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });

      res.end('file not found');
    });
    stream.on('open', () => {
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'public,max-age=31536000,immutable',
        'Timing-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
      });
      stream.pipe(res);
    });
    stream.on('end', () => {
      res.end();
    });
  })
  .get('/', (req, res) => {
    res.end(`
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Modules / No Modules Example</title>
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
      <script>!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();</script>
      <script type="module" src="/js/output-modules.js"></script>
      <script nomodule src="/js/output-nomodules.js"></script>
    </head>
    <body>
      <p>Text below inserted via JS, you'll only get one value or the other.</p>
    </body>
    </html>
    `);
  })
  .listen(3000).then(_ => {
    console.log(`> Running on localhost:3000`);
  });
