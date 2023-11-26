import overlayInstance from "./Overlay";

export default class Lightbox {
    constructor() {
        this.show = false;
        this.index = null;
        this.duration = 300;

        this.getData = this.getData.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.click = this.click.bind(this);

        this.lightbox = document.querySelector('.lightbox');
        this.closeEl = this.lightbox.querySelector('img.close');
        this.elements = document.querySelectorAll('.icon-fullscreen');

        document.addEventListener('click', this.click);
        console.log(this.elements);
    }

    click(evt) {
        if (this.closeEl.contains(evt.target)) {
            this.close();
            return;
        }

        this.elements.forEach((el, index) => {
            if (el.contains(evt.target)) {
                evt.preventDefault();
                this.index = index;
                this.open();
                return;
            }
        });
    }

    open() {
        overlayInstance.open();

        const data = this.getData();
        this.lightbox.querySelector('.lightbox-image').innerHTML = `<img src="${data.image}" alt="">`;
        this.lightbox.querySelector('.ref-photo').innerText = data.ref;
        this.lightbox.querySelector('.category-photo').innerText = data.category;

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