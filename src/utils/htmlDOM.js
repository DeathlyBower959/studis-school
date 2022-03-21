
export function checkInView(element, container, partial = true) {
    if (!element) return false

  var cTop = container.scrollTop
  var cBottom = cTop + container.clientHeight
  var eTop = element.offsetTop
  var eBottom = eTop + element.clientHeight
  var isTotal = eTop >= cTop && eBottom <= cBottom
  var isPartial

  if (partial === true) {
    isPartial =
      (eTop < cTop && eBottom > cTop) || (eBottom > cBottom && eTop < cBottom)
  } else if (typeof partial === 'number') {
    if (eTop < cTop && eBottom > cTop) {
      isPartial = ((eBottom - cTop) * 100) / element.clientHeight > partial
    } else if (eBottom > cBottom && eTop < cBottom) {
      isPartial = ((cBottom - eTop) * 100) / element.clientHeight > partial
    }
  }

  return isTotal || isPartial
}
