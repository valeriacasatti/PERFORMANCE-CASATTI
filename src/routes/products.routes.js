import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { checkRole, isAuth } from "../middlewares/auth.js";

const router = Router();

//get products
router.get("/", ProductsController.getProducts);
//add product
router.post("/", isAuth, checkRole(["admin"]), ProductsController.addProduct);
//get product by id
router.get("/:pid", ProductsController.getProductById);
//update product
router.put(
  "/:pid",
  isAuth,
  checkRole(["admin"]),
  ProductsController.updateProduct
);
//delete product
router.delete(
  "/:pid",
  isAuth,
  checkRole(["admin"]),
  ProductsController.deleteProduct
);

//MOCKING PRODUCTS
router.post("/mockingproducts", ProductsController.getMockingProducts);

export { router as productsRouter };
