import { notify } from "../../../Service/notification_service";
import { serviceActions } from "../../../reduxStore/feature/serviceSlicer";
import { store } from "../../../reduxStore/store";
import { serviceRepository } from "../../Repositories/Service/serviceRepository";

const servicesService = {
  getList: async () => {
    const res = await serviceRepository.getList();
    store.dispatch(serviceActions.setSerivces(res));
  },
  getSingle: async (id) => {
    const res = await serviceRepository.getSingle(id);
    store.dispatch(serviceActions.setSerivce(res));
    return res;
  },
  createService: async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("tags", data.tags);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("short_description", data.short_description);
    formData.append("activity_feature", data.activity_feature);
    formData.append("category", data.category);
    formData.append("images", data.images);

    for (let i = 0; i < data.detail_images.length; i++) {
      formData.append("detail_images[]", data.detail_images[i]);
    }
    formData.append("tour_date", data.tour_date);
    formData.append("tour_type", data.tour_type);
    formData.append("meeting_point", data.meeting_point);
    formData.append("opening_hours", data.opening_hours);
    formData.append("ticket_details", data.ticket_details);

    formData.append("full_description", data.full_description);
    formData.append("highlights", data.highlights);
    formData.append("important_information", data.important_information);

    formData.append("service_overviews", `[${data.service_overviews}]`);
    formData.append("service_includes", data.service_includes);
    const res = await serviceRepository.createService(formData);
    notify(res);
    store.dispatch(serviceActions.setSerivce(res));
  },
  updateService: async (id, data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("tags", data.tags);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("short_description", data.short_description);
    formData.append("activity_feature", data.activity_feature);
    formData.append("category", data.category);
    formData.append("images", data.images);

    for (let i = 0; i < data?.detail_images?.length; i++) {
      formData.append("detail_images[]", data?.detail_images[i]);
    }
    formData.append("tour_date", data.tour_date);
    formData.append("tour_type", data.tour_type);
    formData.append("meeting_point", data.meeting_point);
    formData.append("opening_hours", data?.opening_hours);
    formData.append("ticket_details", data.ticket_details);

    formData.append("full_description", data.full_description);
    formData.append("highlights", data.highlights);
    formData.append("important_information", data.important_information);

    formData.append("service_overviews", data.service_overviews);
    formData.append("service_includes", data.service_includes);
    const res = await serviceRepository.updateService(id, formData);
    notify(res);
    store.dispatch(serviceActions.setSerivce(res));
  },
  deleteService: async (id) => {
    const res = await serviceRepository.deleteService(id);
    notify(res);
    const services = await serviceRepository.getList();
    store.dispatch(serviceActions.setSerivces(services));
  },
};

export default servicesService;
