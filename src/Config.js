
const AppConfig = {
    HEADER_HEIGHT: 40,
    FOOTER_HEIGHT: 40,
    CONTENT_MIN_H: 480,
    REQUIRE_LOGIN: true,
};

const EditorConfig = {
    HEADER_HEIGHT: 80,
    TOOLBAR_HEIGHT: 200,
    EDITOR_MARGIN_X: 20,
    EDITOR_MIN_H: 240,
    EXPORT_WIDTH: 500,
    EXPORT_HEIGHT: 500,
    USE_DIMMER: false,
    DIMMER_TIMEOUT: 100,
    EXPORT_ITEM_KEY: 'AEON_NAOMI_GENERATOR_IMG_DATA',
    FINISH_PATH: '/share.html',
};

const faceConfig = {
  tag: 'FACE',
  offset: {
    x: 0,
    y: 0
  },
  size: {
    width: 500,
    height: 500,
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

const tweetConfig = {
  tag: 'Tweet',
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

const Messages = {
  loading: 'Loading..',
  loadError: 'Loading error!',
  notFound: 'Resouce not found!',
}


export {
  AppConfig,
  EditorConfig,
  faceConfig,
  hairConfig,
  goodsConfig,
  tweetConfig,
  Messages
}
