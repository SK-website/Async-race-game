export class Button {
  public button: HTMLElement;

  public onButtonClick: (() => void) | null = null;

  constructor(buttonText: string, id: string, styles: string[] = []) {
    this.button = document.createElement('button');
    this.button.id = id;
    this.button.classList.add('button');
    this.button.classList.add(...styles);
    this.button.innerText = buttonText;

    this.button.addEventListener('click', () => {
      this.onButtonClick?.();
    });
  }
}
