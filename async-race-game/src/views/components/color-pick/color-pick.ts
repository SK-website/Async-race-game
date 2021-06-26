import './color-pick.scss';

export class ColorPick {
  public colorPick: HTMLInputElement;

  public onColorPickInput: (() => void) | null = null;

  constructor(id: string, styles: string[] = []) {
    this.colorPick = document.createElement('input');
    this.colorPick.id = id;
    this.colorPick.classList.add('car-color');
    this.colorPick.classList.add(...styles);
    this.colorPick.type = 'color';
    this.colorPick.value = '#f7080c';
    this.colorPick.addEventListener('input', () => {
      this.onColorPickInput?.();
    });
  }
}
