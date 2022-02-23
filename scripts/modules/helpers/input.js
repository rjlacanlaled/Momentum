export function adjustingInputSizeHandler(event) {
  event.target.size = event.target.value.length || 1;
}

export function getDigitsFromString(str) {
  return str.replace(/\D/g, "");
}
