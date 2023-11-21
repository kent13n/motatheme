export default class Nav {
    constructor() {
        this.toggle = this.toggle.bind(this);
        this.header = document.querySelector('header');
        document.addEventListener('click', this.toggle);
    }

    toggle(evt) {
        if (evt.target.closest('.hamburger') && !document.body.classList.contains('menu-initialized')) {
            document.body.classList.add('menu-initialized');
        }

        if (evt.target.closest('.hamburger')) {
            if (this.header.classList.contains('opened')) {
                this.header.classList.remove('opened');
            } else {
                this.header.classList.add('opened');
            }
        }

        if (evt.target.closest('nav') && evt.target.tagName.toLowerCase() === 'a' && this.header.classList.contains('opened')) {
            this.header.classList.remove('opened');
        }
    }

    static bind() {
        return new Nav();
    }
}