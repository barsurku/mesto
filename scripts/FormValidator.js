export class FormValidator {
    #inputSelector;
    #submitButtonSelector;
    #inactiveButtonClass;
    #inputErrorClass;
    #errorClass;
    #formElement;
    #buttonElement
    #inputList
    constructor (config, formElement) {
        this.#inputSelector = config.inputSelector;
        this.#submitButtonSelector = config.submitButtonSelector;
        this.#inactiveButtonClass = config.inactiveButtonClass;
        this.#inputErrorClass = config.inputErrorClass;
        this.#errorClass = config.errorClass;
        this.#formElement = formElement;
        this.#buttonElement = this.#formElement.querySelector(this.#submitButtonSelector);
        this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector));
    };
    
    // включение валидации
    enableValidation(formElement, config) {
      this.setEventListeners(formElement, config)
    };

    setEventListeners() {      
      this.toggleButtonState();
      this.#inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this.checkInputValidity(input);
          this.toggleButtonState();
        });
      });
    };

    //valid
    hideInputError(input) {
      const errorElement = this.#formElement.querySelector(`#error-${input.id}`);
      input.classList.remove(this.#inputErrorClass);
      errorElement.classList.remove(this.#errorClass);
  
      //исчезание ошибки
      errorElement.textContent = "";
    };

    //invalid
    showInputError(input, errorMessage) {
      const errorElement = this.#formElement.querySelector(`#error-${input.id}`);
      input.classList.add(this.#inputErrorClass);
      errorElement.classList.add(this.#errorClass);
        
      //появление ошибки
      errorElement.textContent = errorMessage;
    };

    //изменение вида валидности
    checkInputValidity(input) {
      if (!input.validity.valid) {
      this.showInputError(input, input.validationMessage);
      } else {
      this.hideInputError(input);
      }
    };
    
    hasInvalidInput() {
      return this.#inputList.some((input) => {
        return !input.validity.valid;
      })
    };
    
    toggleButtonState() {
      if (this.hasInvalidInput()) {
      this.#buttonElement.classList.add(this.#inactiveButtonClass);
      this.#buttonElement.disabled = true;
       } else {
      this.#buttonElement.classList.remove(this.#inactiveButtonClass);
      this.#buttonElement.disabled = false
      };
    };

    resetValidation() {
      this.toggleButtonState();
      this.#inputList.forEach((input) => {
          this.hideInputError(input);
      });
    };
};