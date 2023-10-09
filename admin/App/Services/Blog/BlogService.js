import { notify } from "../../../Service/notification_service";
import { blogActions } from "../../../reduxStore/feature/BlogSlicer";
import { store } from "../../../reduxStore/store";
import { BlogRepository } from "../../Repositories/Blog/BlogRepositories";

const BlogService = {
  getList: async () => {
    const res = await BlogRepository.getList();
    store.dispatch(blogActions.setBlogList(res));
    return res;
  },
  create: async (data) => {
    const blogData = new FormData();
    blogData.append("title", data.title);
    blogData.append("image", data.image);
    blogData.append("short_desc", data.short_desc);
    blogData.append("details", data.details);
    blogData.append("tag", data.tag);    
    blogData.append("is_top_blog", data.is_top_blog ? '1' : '0');
    const res = await BlogRepository.create(blogData);
    notify(res);
    BlogService.getList();
  },
  singleBlog: async (id) => {
    const res = await BlogRepository.singleBlog(id);
    store.dispatch(blogActions.setSingleBlog(res));
  },
  update: async (id, data) => {
    const blogData = new FormData();
    blogData.append("title", data.title);
    blogData.append("image", data.image);
    blogData.append("short_desc", data.short_desc);
    blogData.append("details", data.details);
    blogData.append("tag", data.tag);
    blogData.append("is_top_blog", data.is_top_blog ? '1' : '0');
    const res = await BlogRepository.update(id, blogData);
    BlogService.getList();
    notify(res);
    return res;
  },
  delete: async (id) => {
    const res = await BlogRepository.delete(id);
    notify(res);
    BlogService.getList();
    return res;
  },
};
export default BlogService;
