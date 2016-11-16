
const AppConfig = {
};

const EditorConfig = {
    EDITOR_MAX_W: 320,
    EXPORT_WIDTH: 500,
    EXPORT_HEIGHT: 500,
    USE_DIMMER: false,
    DIMMER_TIMEOUT: 100,
    EXPORT_ITEM_KEY: 'AEON_NAOMI_GENERATOR_IMG_DATA',
    UPLOAD_PATH: '/upload.php',
    SHARE_PATH: '/share.php',
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
