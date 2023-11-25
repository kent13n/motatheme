import overlayInstance from "./Overlay";

export default class Contact {
    constructor() {
        this.duration = 200;
        this.modal = document.querySelector('.contact-modal > .modal__content');
        this.contactForm = this.modal.querySelector('form');
        this.refPhotoField = this.contactForm.querySelector('input[name="ref-photo"]');
        this.openElements = document.querySelectorAll('[href="#contact"]');
        this.close = this.close.bind(this);
        this.click = this.click.bind(this);
        this.toggle = this.toggle.bind(this);
        document.addEventListener('click', this.click);
        document.addEventListener('wpcf7mailsent', this.close);
    }

    click(evt) {
        let found = false;
        this.openElements.forEach(el => {
            if (el.contains(evt.target)) {
                evt.preventDefault();
                const ref = el.getAttribute('data-ref');
                if (ref && this.refPhotoField) this.refPhotoField.value = ref;
                this.toggle();
                found = true;
            }
        });

        if (!found && this.active && !this.modal.contains(evt.target)) {
            evt.preventDefault();
            this.close();
        }
    }

    clear() {
        this.active = false;
        this.contactForm.reset();
    }

    close() {
        this.clear();
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