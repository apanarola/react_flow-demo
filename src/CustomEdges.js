// CustomEdges.js
import React from 'react';
import { getBezierPath } from 'react-flow-renderer';

const ArrowEdge = ({ id, sourceX, sourceY, targetX, targetY, style }) => {
  const [path] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  return (
    <>
      <path id={id} style={style} d={path} markerEnd="url(#arrowhead)" />
      {/* Optional: Uncomment to show labels */}
      {/* <EdgeText x={(sourceX + targetX) / 2} y={(sourceY + targetY) / 2} label={id} /> */}
    </>
  );
};

// Define a marker for the arrowhead
const markerEnd = (
  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
  </marker>
);

export { ArrowEdge, markerEnd };
