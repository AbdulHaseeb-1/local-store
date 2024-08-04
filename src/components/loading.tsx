import React from "react";
import "@/../public/css/loading.css";

export default function Loading() {
  return (
    <div className="loader-div dark:bg-neutral-900 bg-neutral-100">
      <span className="loader">
        <span></span>
        <span></span>
      </span>
    </div>
  );
}
