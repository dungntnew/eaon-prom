const assetBaseDir = '/static/media/'

const faceNums = 5
const faceAssetDir =  assetBaseDir + 'faces/'

const hairNums = 5
const hairAssetDir = assetBaseDir + 'hairs/'

const backgroundNum = 5
const backgroundAssetDir = assetBaseDir + 'backgrounds/'

const goodsNum = 5
const goodsAssetDir = assetBaseDir + 'goods/'

function buildAssets(num, prefix, dir, ext='.png') {
  return Array.from(Array(num).keys()).map((i) => {
    const src = dir + prefix + i + ext
    return src
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
}

console.log(Assets)

export default Assets;
