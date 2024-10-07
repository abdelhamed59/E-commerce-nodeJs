import authRoutes from "./auth/auth.routes.js";
import brandRoutes from "./Brand/brand.routes.js";
import categoryRoutes from "./category/category.routes.js"
import productRoutes from "./product/product.routes.js";
import subCategoryRoutes from "./subCategory/subCategory.routes.js";
import userRoutes from "./User/user.routes.js";

export const Bootstrap=(app)=>{
    app.use("/api/v1/categories",categoryRoutes);
    app.use("/api/v1/subCategories",subCategoryRoutes);
    app.use("/api/v1/brands",brandRoutes);
    app.use("/api/v1/products",productRoutes);
    app.use("/api/v1/users",userRoutes);
    app.use("/api/v1/auth",authRoutes);


}