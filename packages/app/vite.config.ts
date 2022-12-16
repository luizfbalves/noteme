import reactRefresh from '@vitejs/plugin-react-refresh'
import * as path from 'path'
import { defineConfig } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [reactRefresh(), svgrPlugin()],
  envDir: '../../',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
