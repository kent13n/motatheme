import overlayInstance from "./Overlay";

export default class Lightbox {
    constructor() {
        this.index = null;
        this.duration = 300;
        this.timeout = null;

        this.show = this.show.bind(this);
        this.getData = this.getData.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.click = this.click.bind(this);
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.refresh = this.refresh.bind(this);

        this.lightbox = document.querySelector('.lightbox');
        this.closeEl = this.lightbox.querySelector('img.close');
        this.previousEl = this.lightbox.querySelector('.previous-image');
        this.nextEl = this.lightbox.querySelector('.next-image');
        this.elements = document.querySelectorAll('.icon-fullscreen');

        document.addEventListener('click', this.click);
        this.preload();
        this.mutationObserver = new MutationObserver(this.refresh);
        this.mutationObserver.observe(document.documentElement, {
            attributes: false,
            characterData: false,
            childList: true,
            subtree: true,
            attributeOldValue: false,
            characterDataOldValue: false
        });
    }


    refresh(evt) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.elements = document.querySelectorAll('.icon-fullscreen'), 300);
    }

    preload() {
        this.elements.forEach(el => (new Image()).src = (this.getTarget(el)).querySelector('img[data-lightbox-image]').getAttribute('data-lightbox-image'));
    }

    previous() {
        let newIndex = this.index - 1;
        if (newIndex < 0) newIndex = 0;
        if (newIndex !== this.index) {
            this.show(newIndex);
        }
    }

    next() {
        let newIndex = this.index + 1;
        if (newIndex >= this.elements.length) newIndex = this.elements.length - 1;
        if (newIndex !== this.index) {
            this.show(newIndex);
        }
    }

    click(evt) {
        if (this.closeEl.contains(evt.target)) {
            evt.preventDefault();
            this.close();
            return;
        }

        if (this.previousEl.contains(evt.target)) {
            evt.preventDefault();
            this.previous();
            return;
        }

        if (this.nextEl.contains(evt.target)) {
            evt.preventDefault();
            this.next();
            return;
        }

        this.elements.forEach((el, index) => {
            if (el.contains(evt.target)) {
                evt.preventDefault();
                this.index = index;
                this.open();
            }
        });
    }

    show(index = false) {
        if (index !== false) this.index = index;
        const data = this.getData();
        if (this.lightbox.querySelector('.lightbox-image > img')) {
            this.lightbox.querySelector('.lightbox-image > img').src = data.image;
        } else {
            this.lightbox.querySelector('.lightbox-image').innerHTML = `<img src="${data.image}" alt="lightbox image">`;
        }
        this.lightbox.querySelector('.ref-photo').innerText = data.ref;
        this.lightbox.querySelector('.category-photo').innerText = data.category;
    }

    open() {
        overlayInstance.open();

        const data = this.getData();
        this.show();

        this.lightbox.style.setProperty('display', 'flex');
        this.lightbox.animate({opacity: 1}, {duration: this.duration, fill: 'forwards'});
    }

    close() {
        overlayInstance.close();
        this.lightbox.animate({opacity: 0}, {duration: this.duration, fill: 'forwards'}).onfinish = () => {
            this.lightbox.style.setProperty('display', 'none');
        };
    }

    getData() {
        let data = null;

        if (this.index !== null && this.elements[this.index]) {
            const target = this.elements[this.index];

            let element = this.getTarget(target);
            if (element) {
                data = {};
                data.ref = element.querySelector('.ref-photo').innerText || '';
                data.category = element.querySelector('.categories-photo').innerText || '';
                data.image = element.querySelector('img[data-lightbox-image]').getAttribute('data-lightbox-image') || '';
            }
        }

        return data;
    }

    getTarget(target) {
        let element = target.closest('.post-photo');
        if (!element) {
            element = target.closest('.thumbnail');
            if (element) element = element.closest('article.photo');
        }
        return element;
    }

    static bind() {
        return new Lightbox();
    }
}