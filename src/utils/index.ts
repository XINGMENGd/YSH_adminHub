import SparkMD5 from 'spark-md5';
import { Component } from 'vue';
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
 * 对图片分片并进行hash加密
 * @param file 需要加密的图片
 * @returns 
 */
export const hashFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const maxFileSize = 5 * 1024 * 1024 // 最大上传文件大小
    const fileSize = file.size // 文件大小
    const chunks = Math.ceil(fileSize / maxFileSize); // 获取切片的个数
    let currentChunk = 0
    var spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReader()
    const blobSlice = File.prototype.slice // 切片方法
    function loadNext() {
      var start = currentChunk * maxFileSize;
      var end = start + maxFileSize > file.size ? file.size : (start + maxFileSize);
      reader.readAsArrayBuffer(blobSlice.call(file, start, end));
    };
    reader.onload = function (e: any) {
      const result = e.target.result
      spark.append(result)
      currentChunk += 1
      if (currentChunk < chunks) {
        loadNext();
        console.log(`第${currentChunk}分片解析完成，开始解析${currentChunk + 1}分片`);
      } else {
        console.log('解析完成');
        const result = spark.end();
        const fileFormat = file.name.split('.')
        const extension = fileFormat[fileFormat.length - 1]; // 文件后缀
        // 如果单纯的使用result 作为hash值的时候, 如果文件内容相同，而名称不同的时候
        // 想保留两个文件无法保留。所以把文件名称加上。
        const sparkMd5 = new SparkMD5();
        sparkMd5.append(result);
        sparkMd5.append(extension);
        const hexHash = sparkMd5.end();
        resolve(hexHash);
      }
    }
    reader.onerror = () => {
      console.warn('文件读取错误')
    }
    loadNext()
  })
}


