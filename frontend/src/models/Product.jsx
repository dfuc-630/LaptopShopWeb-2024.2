class Product {
    constructor(data) {
        this.id = data.id;
        this.detailDesc = data.detail_desc;
        this.factory = data.factory;
        this.image = data.image;
        this.name = data.name;
        this.price = data.price;
        this.quantity = data.quantity;
        this.shortDesc = data.short_desc;
        this.sold = data.sold;
        this.target = data.target;
    }
}

export default Product;
// Product class to represent a product
// src/models/Product.jsx