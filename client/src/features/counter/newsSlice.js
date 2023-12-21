import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  data: [],
  loading: false,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNews, setLoading } = newsSlice.actions;

export const fetchNews = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(
      `https://gnews.io/api/v4/search?q=indonesia&sortby=publishedAt&max=20&apikey=657c9c54cf3abd5a0d6c0825aff807c4`
    );
    dispatch(setNews(data.articles));
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export default newsSlice.reducer;
