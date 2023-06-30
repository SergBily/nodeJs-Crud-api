import { resolve as res } from 'path';
import url from 'url'

const __dirname = url.fileURLToPath(new URL('.',import.meta.url));

const mode = 'development';
const entry = './src/index.ts';
const output = {
    filename: 'bundle.js',
    path: res(__dirname, 'dist'),
};
const module = {
    rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
};
const resolve = {
    extensions: ['.ts', '.js'],
};
const devtool = 'inline-source-map';
export default { entry, output, module, resolve, mode, devtool }