import { lightMode } from '@/styles/themes'

type CustomTheme = typeof lightMode

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {
    name: string
  }
}
