export function defineTopPositionValueOfElementInDOM(
  el: HTMLDivElement | null
): number {
  return el ? el.getBoundingClientRect().top + window.scrollY : 0;
}
export function defineBottomPositionValueOfElementInDOM(
  el: HTMLDivElement | null
): number {
  return el ? el.getBoundingClientRect().bottom + window.scrollY : 0;
}
