// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const mainPath = "http://localhost:3001/api/"

export const environment = {
  production: false,
  urls: {
    register: mainPath + "auth/register/",
    login: mainPath + "auth/login/",
    users: mainPath + "users/",
    categories: mainPath + "categories/",
    cities: mainPath + "cities/",
    products: mainPath + "products/",
    productsImages: mainPath + "products/images/",
    productsByCategory: mainPath + "products/by-category/",
    carts: mainPath + "carts/",
    cartsByUser: mainPath + "carts/by-user/",
    cartProducts: mainPath + "cart-products/",
    cartProductsByCart: mainPath + "cart-products/by-cart/",
    orders: mainPath + "orders/",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
