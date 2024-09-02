const esbuild = require('esbuild');
const { resolve, } = require('node:path');
// import * as esbuild from 'esbuild';

(async () => {
  await esbuild.build({
    entryPoints: [
      './src/**/*.ts',
    ],
    loader: { ".node": "file", },
    resolveExtensions: ['.ts', '.js',],
    alias: {
      '@src': resolve(__dirname, './src'),
      '@ioc': resolve(__dirname, './src/ioc'),
    },
    bundle: true,
    minify: false,
    outdir: 'dist',
    platform: 'node',
    target: ['node16'],
    format: 'esm',
  }).catch((err) => {
    console.error(err);
    process.exit(1)
  });
})();