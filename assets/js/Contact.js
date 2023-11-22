import overlayInstance from "./Overlay";

export default class Contact {
    constructor() {
        this.duration = 200;
        this.openElement = document.querySelector('[href="#contact"]');
        this.modal = document.querySelector('.contact-modal > .modal__content');
        this.close = this.close.bind(this);
        this.click = this.click.bind(this);
        this.toggle = this.toggle.bind(this);
        document.addEventListener('click', this.click);
        document.addEventListener('wpcf7mailsent', this.close);
    }

    click(evt) {
        if (this.openElement.contains(evt.target)) {
            evt.preventDefault();
            this.toggle();
            return;
        }

        if (this.active && !this.modal.contains(evt.target)) {
            evt.preventDefault();
            this.close();
        }
    }

    close() {
        this.active = false;
        this.modal.parentElement.animate({opacity: 0}, {duration: this.duration, fill: 'forwards'}).onfinish = () => {
            this.modal.parentElement.style.setProperty('display', 'none');
        };
        overlayInstance.close();
    }

    open() {
        this.active = true;
        this.modal.parentElement.style.setProperty('display', 'block');
        this.modal.parentElement.animate({opacity: 1}, {duration: this.duration, fill: 'forwards'});
        overlayInstance.open();
    }

    toggle() {
        if (this.active) this.close();
        else this.open();
    }

    static bind() {
        return new Contact();
    }
}