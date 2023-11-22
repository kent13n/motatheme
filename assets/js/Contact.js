export default class Contact {
    constructor() {
        this.modal = document.querySelector('.contact-modal > .modal__content');
        this.active = this.modal.parentElement.classList.contains('active');
        this.close = this.close.bind(this);
        this.click = this.click.bind(this);
        document.addEventListener('click', this.click);
        document.addEventListener('wpcf7mailsent', this.close);
    }

    click(evt) {
        if (this.active && !this.modal.contains(evt.target)) {
            this.close();
        }
    }

    close() {
        this.active = false;
        this.modal.parentElement.classList.remove('active');
    }

    open() {
        this.active = true;
        this.modal.parentElement.classList.add('active');
    }

    static bind() {
        return new Contact();
    }
}