import fs from 'fs/promises'
import path from 'path';
import { IOrderModel } from '../03-models/order-model';
import cartProductLogic from "./cart-products-logic";


// creating receipt:
async function createReceipt(order: IOrderModel) {
    try {
        const fileName = order._id;
        const absolutePath = path.join(__dirname,"..", "00-DB", "Receipts", fileName+".txt");
        const cartProducts = await cartProductLogic.getAllCartProducts(order.shoppingCartId.toString());
        let data = `Order NO: #${order._id} \n \n`
        for(let product of cartProducts) {
            data += `${(product as any).product.productName} X${product.quantity} - ${product.totalPrice.toFixed(2)}$ \n \n`;
        }

        data += `TOTAL PRICE: ${order.finalPrice}$`;
        await fs.writeFile(absolutePath, data);
        return absolutePath;
    }    
    catch(err: any) {
        throw new Error("Something went wrong, try again later..");
    }
}

export default createReceipt
