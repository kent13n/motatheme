class Ajax {
    async getPhotos(data = new FormData()) {
        let url = `/wp-json/mota/v1/photos`;
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });
        return response.json();
    }

    static bind() {
        return new Ajax;
    }
}

const ajaxInstance = Ajax.bind();
export default ajaxInstance;