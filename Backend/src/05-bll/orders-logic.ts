import ClientError from '../03-models/client-error';
import mongoose from 'mongoose';
import { IOrderModel, OrderModel } from '../03-models/order-model';

async function getAllOrders(): Promise<IOrderModel[]> {
    return OrderModel.find().populate({path: "shoppingCart", populate: {path: "user"}}).populate("city");
}

async function getOneOrder(_id: string): Promise<IOrderModel> {
    // Validate _id:
    if (!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is invalid`);

    const order = await OrderModel.findById(_id).populate({path: "shoppingCart", populate: {path: "user"}}).populate("city").exec();

    // Validate cart existence:
    if(!order) throw new ClientError(404, "Order not found");

    return order;
}

async function addOrder(order: IOrderModel): Promise<IOrderModel> {

    order.creationDate = new Date().toDateString();

    // Validate cart:
    const errors = order.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // Save:
    const addedOrder = order.save();
    return addedOrder;
}

async function updateOrder(order: IOrderModel): Promise<IOrderModel> {
    // Validate cart:
    const errors = order.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // update:
    const updatedOrder = await OrderModel.findByIdAndUpdate(order._id, order, {returnOriginal: false}).exec();

    // Validate if cart exist in DB:
    if(!updatedOrder) throw new ClientError(404, "Order is not found");

    return updatedOrder;
}

async function deleteOrder(_id: string) {
    // Validate _id:
    if(!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is not valid`);

    // Delete:
    const deletedOrder = await OrderModel.findByIdAndDelete(_id);

    // Validate cart found:
    if(!deletedOrder) throw new ClientError(404, "Order not found");
}

export default {
    getAllOrders,
    getOneOrder,
    addOrder,
    updateOrder,
    deleteOrder
}