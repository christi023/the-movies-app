import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComments';
import ReplyComment from './ReplyComments';
const { TextArea } = Input;
const { Title } = Typography;

export default function Comments(props) {
  const user = useSelector((state) => state.user);
  const [Comment, setComment] = useState('');

  // handleChange method
  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  // onSubmit method
  const onSubmit = (e) => {
    e.preventDefault();
    if (user.userData && !user.userData.isAuth) {
      return alert('Please Log in first');
    }

    const variables = {
      content: Comment,
      writer: user.userData._id,
      postId: props.postId,
    };
    console.log(variables);
    // saving comments
    axios.post('/api/comment/saveComment', variables).then((response) => {
      if (response.data.success) {
        setComment('');
        props.refreshFunction(response.data.result);
      } else {
        alert('Failed to save Comment');
      }
    });
  };
  return (
    <div>
      <br />
      <Title level={3}> Share your opinions about {props.movieTitle} </Title>
      <hr />
      {/* Comment Lists  */}
      {console.log(props.CommentLists)}

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            ),
        )}

      {props.CommentLists && props.CommentLists.length === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          Be the first one who shares your thought about this movie
        </div>
      )}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
        />
        <br />
        <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}
