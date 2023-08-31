export class Section {
  #renderer;
  #containerParentElement;
  #items;
  constructor({ items, renderer }, containerSelector) {
    this.#containerParentElement = document.querySelector(containerSelector);
    this.#renderer = renderer;
    this.#items = items;
  };

  addItem(elementNode) {
    this.#containerParentElement.prepend(elementNode);
  };

  renderItems() {
    this.#items.forEach((item) => this.#renderer(item));
  };
};