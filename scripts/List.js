export class List {
    #renderer;
    #containerParentElement;
    constructor(renderer, containerSelector) {
      this.#containerParentElement = document.querySelector(containerSelector);
      this.#renderer = renderer;
    }
  
    addItem(elementNode) {
      this.#containerParentElement.prepend(elementNode);
    }
  
    renderItems(items) {
      items.forEach((item) =>
        this.#renderer({ cardData: item, position: "prepend" })
      );
    }
  }  