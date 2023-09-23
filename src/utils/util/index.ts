/**
 * 数组去重
 * @param arr1 基础数组(以这个数组为基础来对比)
 * @param arr2 对比数组
 * @param value 去重的属性值
 * @returns 
 */
export const uniqueArray = (arr1: any[], arr2: any[], value: any) => {
  return arr1.filter((item) => !arr2.some((ele) => ele[value] === item[value]));
}

/**
 * 时间格式化
 * @param value
 * @param fmt
 * @returns {*}
 */
export function formatDate(value: any, fmt: string) {
  var regPos = /^\d+(\.\d+)?$/
  if (regPos.test(value)) {
    // 如果是数字
    const getDate = new Date(value)
    const o = {
      'M+': getDate.getMonth() + 1,
      'd+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      S: getDate.getMilliseconds(),
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return fmt
  } else {
    // TODO
    value = value.trim()
    return value.substr(0, fmt.length)
  }
}