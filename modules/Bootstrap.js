import authRoutes from "./auth/auth.routes.js";
import brandRoutes from './Brand/brand.routes.js';
import cartRoutes from "./Cart/cart.routes.js";
import categoryRoutes from "./category/category.routes.js"
import couponRoutes from "./coupon/coupon.routes.js";
import orderRoutes from "./order/order.routes.js";
import productRoutes from "./product/product.routes.js";
import reviewRoutes from "./review/review.routes.js";
import subCategoryRoutes from "./subCategory/subCategory.routes.js";
import userRoutes from "./User/user.routes.js";
import addressRoutes from "./userAddress/userAddress.routes.js";
import wishListRoutes from "./wishList/wishList.routes.js";

export const Bootstrap=(app)=>{
    app.use("/api/v1/categories",categoryRoutes);
    app.use("/api/v1/subCategories",subCategoryRoutes);
    app.use("/api/v1/brands",brandRoutes);
    app.use("/api/v1/products",productRoutes);
    app.use("/api/v1/users",userRoutes);
    app.use("/api/v1/auth",authRoutes);
    app.use("/api/v1/review",reviewRoutes);
    app.use("/api/v1/wishList",wishListRoutes);
    app.use("/api/v1/address",addressRoutes);
    app.use("/api/v1/coupon",couponRoutes);
    app.use("/api/v1/cart",cartRoutes);
    app.use("/api/v1/order",orderRoutes);
}