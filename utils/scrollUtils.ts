export function defineTopPositionValueOfElementInDOM(
  el: HTMLDivElement | null
): number {
  return el ? Math.floor(el.getBoundingClientRect().top + window.scrollY) : 0;
}
export function defineBottomPositionValueOfElementInDOM(
  el: HTMLDivElement | null
): number {
  return el
    ? Math.floor(el.getBoundingClientRect().bottom + window.scrollY)
    : 0;
}
