export default function throttle (fn, interval) {
  let _self = fn
  let timer
  let firstTime = true
  return function () {
    let args = arguments
    let _this = this
    if (firstTime) {
      _self.apply(_this, args)
      firstTime = false
      return
    }
    if (timer) return false
    timer = setTimeout(function () {
      clearTimeout(timer)
      timer = null
      _self.apply(_this, args)
    }, interval || 500)
  }
}
