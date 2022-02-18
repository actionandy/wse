import React from 'react';
import ListGroupItem from './ListGroupItem';

interface ListGroupSubComponents {
    Item: typeof ListGroupItem;
}

export const ListGroup: React.FC<{}> & ListGroupSubComponents = ({children}) => {
  return (
    <ul>{children}</ul>
  );
};

ListGroup.Item = ListGroupItem;
