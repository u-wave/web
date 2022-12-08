import { createRequire } from 'node:module';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme.js';

const require = createRequire(import.meta.url);

const createCache = require('@emotion/cache').default;
const createEmotionServer = require('@emotion/server/create-instance').default;
const { CacheProvider } = require('@emotion/react');

/** Render a React element to plain HTML, with mui theming. */
function renderToHtmlThemed(element) {
  const cache = createCache({
    key: 'emc',
    prepend: true,
  });
  const { extractCritical } = createEmotionServer(cache);

  const wrapped = createElement(
    CacheProvider,
    { value: cache },
    createElement(ThemeProvider, { theme: createTheme(theme) }, element),
  );
  const html = renderToStaticMarkup(wrapped);
  const { css } = extractCritical();
  return html.replace('</head>', `<style id="critical">${css}</style></head>`);
}

function prerender(options) {
  return /** @type {import('vite').Plugin} */ ({
    name: 'u-wave-prerender',
    // Add the file to the build config so it will be output
    // as a separate page.
    config(config) {
      const { rollupOptions } = config.build;
      rollupOptions.input ??= {};
      const name = options.file.replace(/\.\w+$/, '');
      rollupOptions.input[name] = options.file;
    },
    resolveId(id) {
      // Make sure our virtual file resolves to something (itself).
      if (id === options.file) {
        return id;
      }
      return null;
    },
    configureServer(server) {
      server.watcher.add(options.source);
      server.watcher.on('all', async (_, filename) => {
        if (filename === options.source) {
          const module = server.moduleGraph.getModuleById(options.file);
          if (module) {
            server.moduleGraph.invalidateModule(module);
          }
          if (server.ws) {
            server.ws.send({
              type: 'full-reload',
              path: '*',
            });
          }
        }
      });
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!res.writableEnded && req.url.replace(/^\//, '') === options.file) {
            const { default: Root } = await server.ssrLoadModule(options.source);
            const content = `<!DOCTYPE html>${renderToHtmlThemed(createElement(Root, options.props ?? {}))}`;
            const transformed = await server.transformIndexHtml(
              req.originalUrl,
              content,
              req.originalUrl,
            );
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(transformed);
          } else {
            next();
          }
        });
      };
    },
    async load(id) {
      // in build mode, vite will try to load `index.html`
      if (id === options.file) {
        const server = await createServer({
          server: {
            middlewareMode: true,
          },
          mode: 'production',
        });
        try {
          const { default: Root } = await server.ssrLoadModule(options.source);
          const code = `<!DOCTYPE html>${renderToHtmlThemed(createElement(Root, options.props ?? {}))}`;
          return { code };
        } finally {
          server.close();
        }
      }
      return null;
    },
  });
}

export default prerender;
