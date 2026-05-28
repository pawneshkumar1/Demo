import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Blog {
  _id: string;
  title: string;
  title_url: string;
  content: string;
  categoryId: string;
  image: string;
  post: number;
  metatag: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  categoryName: string;
}

interface BlogState {
  blogList: Blog[];
  categories: Category[];
  currentBlog: Blog | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogList: [],
  categories: [],
  currentBlog: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    blogStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBlogListSuccess: (state, action: PayloadAction<Blog[]>) => {
      state.loading = false;
      state.blogList = action.payload;
    },
    getCategoryListSuccess: (state, action: PayloadAction<Category[]>) => {
      state.loading = false;
      state.categories = action.payload;
    },
    getBlogDetailsSuccess: (state, action: PayloadAction<Blog>) => {
      state.loading = false;
      state.currentBlog = action.payload;
    },
    blogFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearBlogDetails: (state) => {
      state.currentBlog = null;
    },
  },
});

export const {
  blogStart,
  getBlogListSuccess,
  getCategoryListSuccess,
  getBlogDetailsSuccess,
  blogFailure,
  clearBlogDetails,
} = blogSlice.actions;

export default blogSlice.reducer;
