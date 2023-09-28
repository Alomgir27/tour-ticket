import { configureStore } from "@reduxjs/toolkit";
import serviceSlicer from "./feature/serviceSlicer";
import OverviewSlicer from "./feature/OverviewSlicer";
import WhatIcludeSlicer from "./feature/WhatIcludeSlicer";
import BlogSlicer from "./feature/BlogSlicer";

export const store = configureStore({
  reducer: {
    services: serviceSlicer,
    overview: OverviewSlicer,
    whatInclude: WhatIcludeSlicer,
    blog: BlogSlicer,
  },
});
