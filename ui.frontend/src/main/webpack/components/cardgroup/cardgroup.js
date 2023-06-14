/**
 * CardGroup class
 */

class CardGroup {
    constructor(el) {
        this.el = el;
        console.log("CardGroup Initialized");
    }

    static init(el) {
        return new CardGroup(el);
    }
}

export default CardGroup;
