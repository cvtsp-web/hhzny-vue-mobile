/**
 * 根据设备宽度设置字体
 */
function setRem () {
  let docEle = document.documentElement
  // 获得屏幕宽度
  let width = docEle.getBoundingClientRect().width
  if (width <= 320) width = 320
  if (width >= 750) width = 750
  // 将屏幕分为100份 屏幕基准为iphone6的750px
  let fontSize = 100 * (width / 750)
  docEle.setAttribute('data-font-size', fontSize)
  docEle.style.fontSize = fontSize + 'px'
  return fontSize;
}

/**
 * 检测横竖屏
 */
function detectOrientation () {
  let clientWidth = document.documentElement.clientWidth
  let screenWidth = window.screen.width
  let screenHeight = window.screen.height
  // 在某些机型（如华为P9）下出现 srceen.width/height值交换
  // 所以进行大小值比较判断
  let _width = screenWidth < screenHeight ? screenWidth : screenHeight
  let _height = screenWidth >= screenHeight ? screenWidth : screenHeight

  // 竖屏
  if (clientWidth === _width) {
    return 'portrait'
  }
  // 横屏
  if (clientWidth === _height) {
    return 'landscape'
  }
}

/**
 * 判断是否IOS
 * @returns {Boolean}
 */
function isIOS () {
  return !!navigator.userAgent.match(/\(i[^]+( U)? CPU.+Mac OS X/)
}

/**
 * 判断是否安卓
 * @returns {Boolean}
 */
function isAndroid () {
  return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
}

/**
 * 判断是否微信
 * @returns {Boolean}
 */
function isWx () {
  let ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('micromessenger') !== -1
}

/**
 * 获取scrollTop 兼容写法
 * @returns {Number|number}
 */
function getScrollTop () {
  return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
}

/**
 * 将rem转换成px
 * @param {Number} rem - rem数值
 * @returns {Number}
 */
function rem2px (rem) {
  let rootFontSize = document.documentElement.getAttribute('data-font-size')
  return rem * rootFontSize
}

/**
 * 返回clientHeight
 * @returns {number}
 */
function getClientHeight () {
  return document.documentElement.clientHeight
}

/**
 * 返回clientWidth
 * @returns {number}
 */
function getClientWidth () {
  return document.documentElement.clientWidth
}

// 判断字符串是否为手机号
function isPhone (str) {
  let reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}

function isEmail (str) {
  let reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  return reg.test(str)
}

export {
  setRem,
  detectOrientation,
  isAndroid,
  isIOS,
  isWx,
  getScrollTop,
  rem2px,
  getClientHeight,
  getClientWidth,
  isPhone,
  isEmail
}
