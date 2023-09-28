import { notify } from "../../../Service/notification_service";
import { blogActions } from "../../../reduxStore/feature/BlogSlicer";
import { store } from "../../../reduxStore/store";
import { BlogRepository } from "../../Repositories/Blog/BlogRepositories";

const BlogService = {
  getList: async () => {
    const res = await BlogRepository.getList();
    store.dispatch(blogActions.setBlogList(res));
  },
  create: async (data) => {
    const blogData = new FormData();
    blogData.append("title", data.title);
    blogData.append("description", data.tag);
    blogData.append("image", data.image);
    blogData.append("short_desc", data.short_desc);
    blogData.append("details", data.details);
    blogData.append("tag", data.tag);
    const res = await BlogRepository.create(blogData);
    notify(res);
    BlogService.getList();
  },
  singleBlog: async (id) => {
    const res = await BlogRepository.singleBlog(id);
    store.dispatch(blogActions.setSingleBlog(res));
  },
  update: async (data, id) => {
    const res = await BlogRepository.update(data, id);
    BlogService.getList();
  },
  delete: async (id) => {
    const res = await BlogRepository.delete(id);
    notify(res);
    BlogService.getList();
  },
};
export default BlogService;
