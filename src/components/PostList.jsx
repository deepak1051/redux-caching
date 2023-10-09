import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchPostsAndUsers } from '../store';
import UserHeader from './UserHeader';

const PostList = () => {
  const { posts, users } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsAndUsers());
  }, [dispatch]);
  return (
    <div className="ui relaxed divided list">
      {posts.map((post) => (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader user={users.find((u) => u.id === post.userId)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
