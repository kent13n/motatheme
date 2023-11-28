class Ajax {
    async getPhotos(data = new FormData()) {
        let url = `/wp-json/mota/v1/photos`;
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });
        return response.json();
    }

    async refreshPhotos(data = new FormData()) {
        const response = await this.getPhotos(data);
        document.querySelector('.photos-wrapper').innerHTML = response.content;
    }

    static bind() {
        return new Ajax;
    }
}

const ajaxInstance = Ajax.bind();
export default ajaxInstance;