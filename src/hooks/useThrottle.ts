import { useState } from "react";

/**
 * 截流函数
 * @param fn 被包装函数
 * @param delay 延迟时间/ms
 * @returns 包装后的函数
 */
const useThrottle = (
  fn: (...args: any[]) => any,
  delay: number = 500
): typeof fn => {
  const [lastTime, setLastTime] = useState<null | number>(null);
  let timer: null | NodeJS.Timeout = null;

  return function (this: Function, ...args: any[]) {
    let now = Date.now();
    if (lastTime !== null && now - lastTime < delay) {
      timer !== null && clearTimeout(timer);
      timer = setTimeout(() => {
        setLastTime(now);
        fn.apply(this, args);
      }, delay);
      return;
    }
    setLastTime(now);
    fn.apply(this, args);
  };
};

export default useThrottle;
