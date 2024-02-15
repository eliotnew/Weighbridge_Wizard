import createOrder from "../functions/order_functions/createOrder";
class Order {
  constructor(
    company,
    product,
    quantity,
    deliveryAddress1,
    deliveryAddress2,
    deliveryTown,
    deliveryPostCode,
    contactPhone,
    contactEmail
  ) {
    this.company = company;
    this.product = product;
    this.quantity = Number(quantity);
    this.deliveryAddress1 = deliveryAddress1;
    this.deliveryAddress2 = deliveryAddress2;
    this.deliveryTown = deliveryTown;
    this.deliveryPostCode = deliveryPostCode;
    this.contactPhone = Number(contactPhone);
    this.contactEmail = contactEmail;

    this.orderData = this.toJSON();
  }

  toJSON() {
    return {
      company: this.company,
      product: this.product,
      quantity: this.quantity,
      deliveryAddress1: this.deliveryAddress1,
      deliveryAddress2: this.deliveryAddress2,
      deliveryTown: this.deliveryTown,
      deliveryPostCode: this.deliveryPostCode,
      contactPhone: this.contactPhone,
      contactEmail: this.contactEmail,
    };
  }

  async createOrder() {
    try {
      const response = await createOrder(this.orderData);
      return response;
    } catch (error) {
      console.log("Failed to add truck to the database", error);
    }
  }
}
export default Order;
