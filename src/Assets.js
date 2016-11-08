const assetBaseDir = '/static/media/'

const faceNums = 15
const faceAssetDir =  assetBaseDir + 'faces/'

const hairNums = 15
const hairAssetDir = assetBaseDir + 'hairs/'


const backgroundNum = 15
const backgroundAssetDir = assetBaseDir + 'backgrounds/'

const goodsNum = 15
const goodsAssetDir = assetBaseDir + 'goods/'

const TweetNum = 15;
const TweetAssetDir = assetBaseDir + 'tweets/'

function buildAssets(num, prefix, dir, ext='.png') {
  return Array.from(Array(num).keys()).map((i) => {
    const src = dir + prefix + (i　+ 1) + ext
    return {
      id: i,
      src: src,
    }
  } )
}

function buildAssetConfig(title, num, dir, prefix='', thumbPrefix='thumb-') {
  return {
    title: title,
    count: num,
    thumbnails: buildAssets(num, thumbPrefix, dir),
    images: buildAssets(num, prefix, dir),
  }
}

const Assets = {
   face: buildAssetConfig('顔', faceNums, faceAssetDir),
   hair: buildAssetConfig('髪', hairNums, hairAssetDir),
   background: buildAssetConfig('背景', backgroundNum, backgroundAssetDir),
   goods: buildAssetConfig('装飾', goodsNum, goodsAssetDir),
   tweet: buildAssetConfig('テキスト', TweetNum, TweetAssetDir),
}

export default Assets;
