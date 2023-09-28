import { ProductsRepo } from "@/App/Repositories/Products/ProductsRepo";
import { productsActions } from "@/reduxStore/feature/ProductsSlicer";
import { store } from "@/reduxStore/store";

export const ProductsService = {
    getList: async () => {
        const res = await ProductsRepo.getList();
        store.dispatch(productsActions.setLoading(true));

        if (res) {
            store.dispatch(productsActions.setProducts(res));
            store.dispatch(productsActions.setLoading(false));
        }
    },
};
