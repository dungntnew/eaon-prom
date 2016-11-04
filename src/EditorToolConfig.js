
const faceConfig = {
  tag: 'FACE',
  offset: {
    x: 0,
    y: 0
  },
  size: {
    width: 400,
    height: 400,
  },
  controls: {
    'tl':false,
    'tr':false,
    'bl':false,
    'br':false,
    'ml':false,
    'mt':false,
    'mr':false,
    'mb':false,
    'mtr':false
  },
}

const hairConfig = {
  tag: 'HAIR',
  offset: {
    x: 0,
    y: -5
  },
  size: {
    width: 400,
    height: 400,
  },
  controls: {
    'tl':false,
    'tr':false,
    'bl':false,
    'br':false,
    'ml':false,
    'mt':false,
    'mr':false,
    'mb':false,
    'mtr':true
  },
}

const goodsConfig = {
  tag: 'GOODS',
  offset: {
    x: 10,
    y: 10
  },
  size: {
    width: 150,
    height: 150
  },
  controls: {
    'tl':true,
    'tr':true,
    'bl':true,
    'br':false,
    'ml':false,
    'mt':false,
    'mr':false,
    'mb':false,
    'mtr':false
  },
}

const removableTags = [goodsConfig.tag]

export {
  faceConfig,
  hairConfig,
  goodsConfig,
  removableTags,
}
