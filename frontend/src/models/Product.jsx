class Product {
    constructor(data) {
        this.id = data.id;
        this.detailDesc = data.detail_desc;
        this.factory = data.factory;
        this.imgage = data.imgage;
        this.name = data.name;
        this.price = data.price;
        this.quantity = data.quantity;
        this.shortDesc = data.short_desc;
        this.sold = data.sold;
        this.target = data.target;
    }
}

export default Product;