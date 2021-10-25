/**
 * 防抖函数
 * @param fn 被包装函数
 * @param ms 毫秒
 * @returns 包装后的防抖函数
 */
const useDebounce = (fn: Function, ms: number = 500): Function => {
  let timer: null | NodeJS.Timeout = null;
  return function (this: Function, ...args: any) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    const _this = this;
    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, ms);
  };
};

export default useDebounce;
