export class BaseComponent {
	public element: HTMLElement;

	constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
		this.element = document.createElement(tag);
		this.element.classList.add(...styles);

	}
}
