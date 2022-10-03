import { ThemeTypes } from '@/hooks/theme'

const colors = {
  primary: {
    rose: '#FDBAA3',
    white: 'whitesmoke',
    black: 'black',
    midnight: '#3C3D43',
    creamwhite: '#d9d9d9',
  },
  semantic: {
    red: '#F7685C',
    green: '#30C58D',
  },
  posts: {
    yellow: '#ebd76c',
    green: '#84c9af',
    lightyellow: 'RGBA(251, 235, 149, 0.4)',
    redorange: 'RGBA(253, 186, 163, 0.4)',
    lilac: 'RGBA(182, 165, 203, 0.4)',
    greencyan: 'RGBA(151, 210, 188, 0.6)',
    lightcyan: 'RGBA(174, 223, 232, 0.6)',
    creamwhite: '#d9d9d9',
  },
  gray: {
    900: '#181818ed',
    800: '#343539',
    600: '#3C3D43',
    400: '#808080',
    300: '#8C8A97',
    100: '#d1d1d1',
  },
}

export const lightMode: ThemeTypes = {
  name: 'light',
  type: 'light',
  colors: {
    primary: colors.primary.creamwhite,
    font: colors.primary.black,
    black: colors.primary.black,
    background: colors.primary.white,
  },
  sidenav: {
    background: colors.primary.white,
  },
  cards: {
    background: colors.gray[100],
    font: colors.gray[600],
  },
  button: {
    primary: colors.gray[100],
  },
}

export const darkMode: ThemeTypes = {
  name: 'dark',
  type: 'dark',
  colors: {
    primary: colors.primary.midnight,
    font: colors.primary.white,
    black: colors.gray[900],
    background: colors.gray[800],
  },
  sidenav: {
    background: colors.gray[600],
  },
  cards: {
    background: colors.posts.creamwhite,
    font: colors.gray[600],
  },
  button: {
    primary: colors.primary.midnight,
  },
}
