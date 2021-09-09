import debounce from "../debounce";

describe("debounce", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("function is not called until delay is met", () => {
    const callback = jest.fn();
    const debounced = debounce(callback, 500);

    debounced();

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("function is called after delay after last execution", () => {
    const callback = jest.fn();
    const debounced = debounce(callback, 500);

    debounced();

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    debounced();

    jest.advanceTimersByTime(400);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("args are passed through", () => {
    const callback = jest.fn();
    const debounced = debounce(callback, 1);

    debounced("hello", 3);

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledWith("hello", 3);
  });
});
