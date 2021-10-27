/**
 * 防抖函数
 * @param fn 被包装函数
 * @param ms 毫秒
 * @returns 包装后的防抖函数
 */
const useDebounce = (
  fn: (...args: any[]) => any,
  ms: number = 500
): typeof fn => {
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
