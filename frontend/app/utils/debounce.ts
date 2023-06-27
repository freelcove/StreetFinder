/**
 * Creates and returns a debounced version of the passed function.
 * The debounced function will delay the execution of the function until after `wait` milliseconds have passed since the last time it was invoked.
 *
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay the function call.
 */
export const debounce = <F extends (...args: any[]) => any>(func: F, wait: number): F => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return ((...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), wait);
  }) as F;
}
