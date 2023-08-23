import { TopLevelCategory, TopPageModel } from "@/interfaces/page.intrerface";
import { ProductModel } from "@/interfaces/product.interface";

export interface TopPageComponentProps {
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}