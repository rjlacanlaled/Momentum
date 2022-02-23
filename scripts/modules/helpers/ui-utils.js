export function updateDisplay(element, type) {
  element.style.display = type;
}

export function createCheckbox(options = {}) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = options.id;
  checkbox.name = options.name;
  checkbox.checked = options.isChecked;
  checkbox.classList.add(options.class);
  return checkbox;
}

export function createLabel(options = {}) {
  const label = document.createElement("label");
  label.id = options.id;
  label.for = options.id;
  label.textContent = options.text;
  return label;
}

export function createList(options = {}) {
  const list = document.createElement("li");
  list.classList.add(options.class);
  return list;
}

export function createOption(text, value) {
  return new Option(text, value);
}

export function createImage(options) {
  const img = document.createElement("img");
  img.src = options.src;
  img.id = options.id;
  options.classList.forEach((className) => {
    img.classList.add(className);
  });

  return img;
}

export function toggleClass(element, className) {
  element.classList.toggle(className);
}

export function optionExists(options, value) {
  for (const option of options) {
    if (option.value === value) return true;
  }
  return false;
}
