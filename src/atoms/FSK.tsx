import React from 'react';

const FSK: React.FC<{ age: number }> = ({age}) => {
  const age2className: Record<number, string> = {
    0: 'bg-gray-100 text-gray-600',
    6: 'bg-yellow-400',
    12: 'bg-green-500',
    16: 'bg-blue-400',
    18: 'bg-red-500',
  } as const;

  return (
    <span className={`text-xs py-1 px-2 rounded text-white ${age2className[age]||''} mr-2 cursor-help shadow-sm`}
      title={`Freigegeben ab ${age} Jahren`}>{age}</span>
  );
};

export default FSK;
