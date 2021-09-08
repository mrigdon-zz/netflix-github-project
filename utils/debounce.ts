type Debounced = {
  (...args: Array<any>): any;
};

export default function debounce(
  func: Function,
  delay: number = 200
): Debounced {
  let timeout: number | undefined;

  return function (this: any, ...args: any[]) {
    const context = this;

    window.clearInterval(timeout);

    timeout = window.setTimeout(() => {
      func.apply(context, args);
    }, delay);
  } as Debounced;
}
