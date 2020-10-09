import React from 'react';
import { IComment } from '../../../app/common/interfaces/models';

interface ICommentListProps {
  comments: IComment[];
}

const CommentList: React.FC<ICommentListProps> = ({ comments }) => {
  return <div></div>;
};

export default CommentList;
