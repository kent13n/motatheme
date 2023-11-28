class Ajax {
    filter() {
        console.log('filter');
        let url = '/wp-admin/admin-ajax.php';
        fetch(url, {method: 'GET'})
            .then(result => result.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    static bind() {
        return new Ajax;
    }
}

const ajaxInstance = Ajax.bind();
export default ajaxInstance;