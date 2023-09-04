export class Section {
  #renderer;
  #containerParentElement;
  constructor({renderer}, containerSelector) {
    this.#containerParentElement = document.querySelector(containerSelector);
    this.#renderer = renderer;
  };

  append(elementNode) {
    this.#containerParentElement.append(elementNode);
  };

  prepend(elementNode) {
    this.#containerParentElement.prepend(elementNode);
  };

  renderItems(items) {
    items.forEach((item) => {
      this.#renderer(item);
    });
  };
};