const esbuild = require('esbuild');
const { resolve, } = require('node:path');

(async () => {
  await esbuild.build({
    entryPoints: [resolve(__dirname, 'src/bot.ts')],
    bundle: true,
    minify: false,
    sourcemap: true,
    platform: 'node',
    target: 'node16',
    outfile: resolve(__dirname, 'dist/src/bot.js'),
    tsconfig: resolve(__dirname, 'tsconfig.json'),
    external: ['discord.js'],
    logLevel: 'info',
    alias: {
      '@src': resolve(__dirname, 'src'),
      '@ioc': resolve(__dirname, 'src/ioc'),
      '@db': resolve(__dirname, 'src/database'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@shared': resolve(__dirname, 'src/shared'),
      '@domain': resolve(__dirname, 'src/domain'),
      '@application': resolve(__dirname, 'src/application'),
    }
  }).catch((err) => {
    console.error(err);
    process.exit(1)
  });
})();