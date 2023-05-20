import reactRefresh from '@vitejs/plugin-react-refresh'
import * as path from 'path'
import { defineConfig } from 'vite'
import environmentPlugin from 'vite-plugin-environment'
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [reactRefresh(), svgrPlugin(), environmentPlugin('all')],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    port: 3005,
  },
})
