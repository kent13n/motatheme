import Nav from "./Nav";
import Contact from "./Contact";
import PrevNextNav from "./PrevNextNav";
import Lightbox from "./Lightbox";
import Select from './Select';

window.addEventListener('DOMContentLoaded', function () {
    Nav.bind();
    Contact.bind();
    PrevNextNav.bind();
    Lightbox.bind();
    Select.bind();
});