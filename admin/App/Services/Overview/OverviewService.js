import { overviewActions } from "../../../reduxStore/feature/OverviewSlicer";
import { store } from "../../../reduxStore/store";
import { OverviewRepository } from "../../Repositories/Overview/OverviewRepository";

const OverviewService = {
  getList: async () => {
    const res = await OverviewRepository.getList();
    store.dispatch(overviewActions.setOverview(res));
  },
  create: async (data) => {
    const overviewData = new FormData();
    overviewData.append("title", data.title);
    overviewData.append("description", data.description);
    const res = await OverviewRepository.create(overviewData);
    notify(res);
  },
  singleOverview: async (id) => {
    const res = await OverviewRepository.singleOverview(id);
    store.dispatch(overviewActions.setSingleOverview(res));
  },
  update: async (data, id) => {
    const res = await OverviewRepository.update(data, id);
    notify(res);
  },
  delete: async (id) => {
    const res = await OverviewRepository.delete(id);
    notify(res);
    OverviewService.getList();
  },
};

export default OverviewService;
