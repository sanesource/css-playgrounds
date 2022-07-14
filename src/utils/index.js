export function debounce(cb, wait = 1000) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(null, args);
    }, wait);
  };
}
