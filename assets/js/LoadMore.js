import Select from "./Select";
import ajaxInstance from "./Ajax";

class LoadMore {
    constructor() {
        console.log('load more');
        this.loadMoreBtn = null;
        this.init = this.init.bind(this);
        this.click = this.click.bind(this);
        window.addEventListener('DOMContentLoaded', this.init);
    }

    init() {
        this.loadMoreBtn = document.querySelector('.load-more > a');
        if (this.loadMoreBtn) {
            document.addEventListener('click', this.click);
        }
    }

    async click(evt) {
        if (this.loadMoreBtn.contains(evt.target)) {
            const next_page = this.getCurrentPage() + 1;
            const data = Select.getFilters();
            data.append('page', next_page);
            const response = await ajaxInstance.getPhotos(data);
            if (response) {
                document.querySelector('.photos-wrapper').insertAdjacentHTML('beforeend', response.content);
                if (response.total_pages > next_page) {
                    this.show();
                } else {
                    this.hide();
                }
            }
        }
    }

    getCurrentPage() {
        const wrapper = document.querySelector('.photos-wrapper');
        if (!wrapper) return 0;
        const posts_per_page = parseInt(wrapper.getAttribute('data-posts-per-page')) || 0;
        const nb_posts = document.querySelectorAll('.photos-wrapper .post-photo').length;
        return Math.ceil(nb_posts / posts_per_page);
    }

    show() {
        if (this.loadMoreBtn) {
            this.loadMoreBtn.parentElement.style.setProperty('display', 'flex');
        }
    }

    hide() {
        if (this.loadMoreBtn) {
            this.loadMoreBtn.parentElement.style.setProperty('display', 'none');
        }
    }

    static bind() {
        return new LoadMore;
    }
}

const loadMoreInstance = LoadMore.bind();
export default loadMoreInstance;