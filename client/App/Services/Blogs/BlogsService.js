import { BlogsRepo } from "@/App/Repositories/Blogs/BlogsRepo";
import { blogsActions } from "@/reduxStore/feature/BlogsSlicer";
import { store } from "@/reduxStore/store";

export const BlogsService = {
    getInit: async () => {
        store.dispatch(blogsActions.setLoading(true));
        const res = await BlogsRepo.getBlogs();
        if(res?.data?.data?.length > 0){
            store.dispatch(blogsActions.setBlogs(res?.data?.data));
        }        
        store.dispatch(blogsActions.setLoading(false));
        return null;
    }
};
