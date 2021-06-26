import './name.scss';

export class Name {
  public name: HTMLInputElement;

  public onNameClick: (() => void) | null = null;

  constructor(id: string, placeholder: string, styles: string[] = ['input-name']) {
    this.name = document.createElement('input');
    this.name.id = id;
    this.name.classList.add(...styles);
    this.name.type = 'text';
    this.name.placeholder = placeholder;
    this.name.addEventListener('input', () => {
      this.onNameClick?.();
    });
  }
}
