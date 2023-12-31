import ajaxInstance from "./Ajax";
import loadMoreInstance from "./LoadMore";

export default class Select {
    constructor() {
        this.timeout = null;
        this.init = this.init.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);
        this.unselect = this.unselect.bind(this);
        this.reset = this.reset.bind(this);

        this.selects = document.querySelectorAll('[data-select]');
        this.init();
    }

    init() {
        this.selects.forEach(el => {
            const placeholder = el.querySelector('.dropdown-toggle > [data-placeholder]');
            placeholder.innerText = placeholder.getAttribute('data-placeholder');
        });
        document.addEventListener('click', this.toggle);
    }

    toggle(evt) {
        this.selects.forEach(el => {
            if (el.querySelector('.dropdown-toggle').contains(evt.target) && !el.classList.contains('active')) {
                this.open(el);
            } else if (el.querySelector('.dropdown').contains(evt.target) && evt.target.closest('[data-filter]')) {
                evt.preventDefault();
                this.select(evt.target.closest('[data-filter]'));
            } else if (el.querySelector('.dropdown').contains(evt.target) && evt.target.closest('[data-reset]')) {
                evt.preventDefault();
                this.reset(el);
            } else this.close(el);
        })
    }

    open(el) {
        el.classList.add('active');
    }

    close(el) {
        if (el && el.classList.contains('active')) {
            el.classList.remove('active');
        }
    }

    async select(el) {
        this.unselect(el);
        el.classList.add('active');
        el.closest('[data-select]').querySelector('[data-placeholder]').innerText = el.innerText;
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.close(el.closest('[data-select]'));
        }, 300);
        await this.filterPhotos();
    }

    unselect(el) {
        let dropdown = el.closest('ul.dropdown');
        if (!dropdown) dropdown = el.querySelector('ul.dropdown');
        if (dropdown) {
            dropdown.querySelectorAll('a.active').forEach(item => item.classList.remove('active'));
        }
    }

    async reset(el) {
        const placeholder = el.querySelector('[data-placeholder]');
        placeholder.innerText = placeholder.getAttribute('data-placeholder');
        this.unselect(el);
        this.close(el);
        await this.filterPhotos();
    }

    async filterPhotos() {
        const response = await ajaxInstance.getPhotos(Select.getFilters());
        if (response) {
            document.querySelector('.photos-wrapper').innerHTML = response.content;
            if (response.total_pages && response.total_pages > 1) {
                loadMoreInstance.show();
            } else {
                loadMoreInstance.hide();
            }
        }
    }

    static getFilters() {
        const data = new FormData();

        document.querySelectorAll('[data-select]').forEach(item => {
            const activeEl = item.querySelector('ul.dropdown a.active');
            if (activeEl) {
                const value = activeEl.getAttribute('data-filter');
                const key = item.getAttribute('data-select');
                data.append(key, value);
            }
        })

        return data;
    }

    static bind() {
        return new Select();
    }
}