import React from 'react';

const ListGroupItem: React.FC = ({children}) => {
  return (
    <li className="px-6 py-2 border-b border-gray-200 w-full">{children}</li>
  );
};

export default ListGroupItem;
