import CompressionPlugin from 'compression-webpack-plugin';
import brotli from 'brotli/compress';

const compressible = /\.(js|css|svg|mp3)$/;

export default function compress() {
  return {
    plugins: [
      // Add Gzip-compressed files.
      new CompressionPlugin({
        test: compressible,
        asset: '[path].gz[query]',
        algorithm: 'gzip',
      }),
      // Add Brotli-compressed files.
      new CompressionPlugin({
        test: compressible,
        asset: '[path].br[query]',
        algorithm(buffer, opts, cb) {
          const result = brotli(buffer);
          if (result) {
            cb(null, Buffer.from(result));
          } else {
            cb(null, buffer);
          }
        },
      }),
    ],
  };
}
