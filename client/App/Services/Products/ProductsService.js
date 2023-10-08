import { ProductsRepo } from "@/App/Repositories/Products/ProductsRepo";
import { productsActions } from "@/reduxStore/feature/ProductsSlicer";
import { store } from "@/reduxStore/store";

export const ProductsService = {
    getInit: async () => {
        store.dispatch(productsActions.setLoading(true));
        const getCategoryInfo = await ProductsRepo.getCategoryInfo();
        if(getCategoryInfo?.length > 0){
            store.dispatch(productsActions.setDestinations(getCategoryInfo[0]?.destinations));
            store.dispatch(productsActions.setSelectedDestination(getCategoryInfo[0]?.destinations[0]));
            let defaultDestinationId = getCategoryInfo[0]?.destinations[0]?.id;
            const res = await ProductsRepo.getAllProductsByDestinationId(defaultDestinationId);
            console.log(res);
            if(res){
                store.dispatch(productsActions.setProducts(res));
                store.dispatch(productsActions.setLoading(false));
            }
        }
        store.dispatch(productsActions.setLoading(false));
        const res = await ProductsRepo.getLocalProducts();
        if(res?.data?.data?.length > 0){
            store.dispatch(productsActions.setLocalProducts(res?.data?.data));
            return res;
        }
        return null;
    },
    getProducts : async (id) => {
        store.dispatch(productsActions.setLoading(true));
        const res = await ProductsRepo.getAllProductsByDestinationId(id);
        store.dispatch(productsActions.setSelectedDestination(store.getState()?.products?.destinations.find(item => item.id === id)));
        if(res){
            store.dispatch(productsActions.setProducts(res));
            store.dispatch(productsActions.setLoading(false));
            return res;
        }
        store.dispatch(productsActions.setLoading(false));
        return null;
    }
};
