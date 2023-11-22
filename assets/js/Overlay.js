class Overlay {
    constructor() {
        this.duration = 300;
        this.active = false;
        this.overlay = document.querySelector('.overlay');
        this.timeout = null;
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    toggle() {
        if (!this.active) this.open();
        else this.close();
    }

    open() {
        if (!this.overlay) this.init();
        if (this.timeout) clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.active = true;
            this.overlay.style.setProperty('display', 'block');
            this.overlay.animate({opacity: 1}, {duration: this.duration, fill: 'forwards'});
        }, 50);

    }

    close() {
        if (!this.overlay) this.init();
        if (this.timeout) clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.active = false;
            this.overlay.animate({opacity: 0}, {duration: this.duration + 100, fill: 'forwards'}).onfinish = () => {
                this.overlay.style.setProperty('display', 'none');
            };
        }, 50);
    }

    init() {
        this.overlay = document.querySelector('.overlay');
    }

    static bind() {
        return new Overlay();
    }
}

const overlayInstance = Overlay.bind();
export default overlayInstance;