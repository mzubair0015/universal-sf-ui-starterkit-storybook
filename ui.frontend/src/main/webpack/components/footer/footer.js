/**
 * Footer class
 */

class Footer {
    constructor(el) {
        this.el = el;
        console.log("Footer Initialized");
    }

    static init(el) {
        return new Footer(el);
    }
}

export default Footer;
