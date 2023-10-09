import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

const initialState = {
  posts: [],
  users: [],
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'blog/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// const _fetchUser = _.memoize(async (id) => {
//   const { data } = await axios.get(
//     `https://jsonplaceholder.typicode.com/users/${id}`
//   );

//   return data;
// });

// export const fetchUser = createAsyncThunk(
//   'blog/fetchUser',
//   _.memoize(async (id) => {
//     const { data } = await axios.get(
//       `https://jsonplaceholder.typicode.com/users/${id}`
//     );

//     return data;
//   })
//   // async (id, { rejectWithValue }) => {
//   //   try {
//   //     const { data } = await axios.get(
//   //       `https://jsonplaceholder.typicode.com/users/${id}`
//   //     );

//   //     return data;
//   //   } catch (error) {
//   //     return rejectWithValue(error);
//   //   }
//   // }
// );

export const fetchUser = createAsyncThunk(
  'blog/fetchUser',

  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const fetchPostsAndUsers = createAsyncThunk(
//   'blog/fetchPostsAndUsers',
//   async (id, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `https://jsonplaceholder.typicode.com/users/${id}`
//       );

//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const fetchPostsAndUsers = createAsyncThunk(
  'blog/fetchPostsAndUsers',
  async (id, { getState, dispatch }) => {
    await dispatch(fetchPosts());

    const userIds = _.uniq(_.map(getState().blog.posts, 'userId'));

    // const ids = getState().blog.posts.map((p) => p.userId);
    // console.log([...new Set(ids)]);

    userIds.forEach((id) => dispatch(fetchUser(id)));
  }
);

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
      state.isLoading = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //single user
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload);
    });
  },
});

export const { increment, decrement, incrementByAmount } = blogSlice.actions;

export default blogSlice.reducer;
