export default class PrevNextNav {
    constructor() {
        this.activeEl = null;
        this.toggle = this.toggle.bind(this);
        this.enter = this.enter.bind(this);
        this.leave = this.leave.bind(this);
        this.wrapper = document.querySelector('.previous-next > .wrapper');
        this.prevLink = document.querySelector('.links > .prev-link');
        this.nextLink = document.querySelector('.links > .next-link');
        this.prevImg = document.querySelector('.thumbnails > .prev-thumbnail > img');
        this.nextImg = document.querySelector('.thumbnails > .next-thumbnail > img');

        if (this.nextLink) {
            this.nextLink.addEventListener('mouseenter', this.enter)
        }

        if (this.prevLink) {
            this.prevLink.addEventListener('mouseenter', this.enter);
        }

        if (this.wrapper) {
            this.wrapper.addEventListener('mouseleave', this.leave);
        }
    }

    enter(evt) {
        if (this.prevLink && this.prevLink.contains(evt.target)) {
            this.toggle(this.prevImg);
        }

        if (this.nextLink && this.nextLink.contains(evt.target)) {
            this.toggle(this.nextImg);
        }
    }

    leave(evt) {
        this.toggle(this.activeEl, true);
    }

    toggle(el, hide = false) {
        if (hide) {
            if (this.activeEl) {
                this.activeEl.animate({opacity: 0}, {duration: 300, fill: 'forwards'}).onfinish = () => {
                    if (this.activeEl) {
                        this.activeEl.style.setProperty('display', 'none');
                        this.activeEl = null;
                    }
                }
            }
            return;
        }

        if (this.activeEl) {
            this.activeEl.style.setProperty('opacity', 0);
            this.activeEl.style.setProperty('display', 'none');
        }

        el.style.setProperty('opacity', 0);
        el.style.setProperty('display', 'block');
        el.animate({opacity: 1}, {duration: 300, fill: 'forwards'});

        this.activeEl = el;
    }

    static bind() {
        return new PrevNextNav();
    }
}