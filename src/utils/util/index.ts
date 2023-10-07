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

export const setCookie = (key: string, value: any) => {
  document.cookie = `${key}=${value}`
}

export const getCookie = (key: string) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';').map(cookie => cookie.trim());
  const tokenCookie: any = cookies.find(cookie => cookie.startsWith(`${key}=`));

  const token = tokenCookie?.split('=')[1];
  console.log(token);

  return token
}

/**
 * 对图片地址hash加密
 * @param inputString 需要加密的图片路径
 * @returns 
 */
export const calculateHash = async (inputString: any) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputString);
  const digest = await crypto.subtle.digest('SHA-256', data);

  const hashArray = Array.from(new Uint8Array(digest));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashHex;
}