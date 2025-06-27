import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
function SkeletonViewer(props: React.HTMLProps<HTMLDivElement>) {
  // color="#ffffff" highlightColor="#a9b7c1"
  const skeletonProps = {
    height: "100%",
    width: "100%",
    widthRandomness: 0,
    borderRadius: 0,
    ...props,
  };
  return (
    <SkeletonTheme
      baseColor="#e0e0e0" // light gray
      highlightColor="#f5f5f5" // slightly lighter gray
    >
      <Skeleton {...skeletonProps} />
    </SkeletonTheme>
  );
}

export default SkeletonViewer;
