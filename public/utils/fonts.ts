import localfont from 'next/font/local'

const rampart = localfont({
  src: [
    {
      path: '../fonts/RampartOne-Regular.ttf',
      weight: '400',
    },
  ],
  variable: '--font-rampart',
})

const amiko = localfont({
  src: [
    {
      path: '../fonts/Amiko-Regular.ttf',
      weight: '400',
    },
  ],
  variable: '--font-amiko',
})

const happymonkey = localfont({
  src: [
    {
      path: '../fonts/HappyMonkey-Regular.ttf',
      weight: '400',
    },
  ],
  variable: '--font-happymonkey',
})
const neue = localfont({
  src: [
    {
      path: '../fonts/ComicNeue-Regular.ttf',
      weight: '400',
    },
  ],
  variable: '--font-neue',
})

export { rampart, amiko, happymonkey, neue }
