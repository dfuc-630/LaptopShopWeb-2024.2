class Order {
    constructor(data) {
        this.id = data.id;
        this.price = data.price;
        this.quantity = data.quantity;
        this.productId = data.product_id;
        // this.userId = data.user_id;
        // this.status = data.status;
        // this.createdAt = data.created_at;
    }
}
export default Order;
// src/models/Order.jsx