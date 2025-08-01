import React from 'react';

const formatVoteCount = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return count;
};

const VoteCountFormat = ({ count }) => {
  return <span>{formatVoteCount(count)}</span>;
};

export default VoteCountFormat;
