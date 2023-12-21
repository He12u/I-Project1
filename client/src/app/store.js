import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "../features/counter/newsSlice";

const store = configureStore({
  reducer: {
    news: newsSlice,
  },
});

export default store;
