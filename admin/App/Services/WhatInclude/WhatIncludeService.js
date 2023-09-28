import { notify } from "../../../Service/notification_service";
import { whatIncludeActions } from "../../../reduxStore/feature/WhatIcludeSlicer";
import { store } from "../../../reduxStore/store";
import { WhatIncldeRepository } from "../../Repositories/WhatInclude/WhatIncldeRepository";

const WhatIncludeService = {
  getList: async () => {
    const res = await WhatIncldeRepository.getList();
    store.dispatch(whatIncludeActions.setWhatInclude(res));
  },
  create: async (data) => {
    const overviewData = new FormData();
    overviewData.append("title", data.title);
    overviewData.append("description", data.description);

    const res = await WhatIncldeRepository.create(overviewData);
    notify(res);
  },
  single: async (id) => {
    const res = await WhatIncldeRepository.single(id);
    store.dispatch(whatIncludeActions.setSingle(res));
  },
  update: async (data, id) => {
    const res = await WhatIncldeRepository.update(data, id);
    notify(res);
    WhatIncludeService.getList();
  },
  delete: async (id) => {
    const res = await WhatIncldeRepository.delete(id);
    notify(res);
    WhatIncludeService.getList();
  },
};

export default WhatIncludeService;
