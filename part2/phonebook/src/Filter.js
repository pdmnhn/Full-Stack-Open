import React from "react";

export default function Filter({ filterText, changeFilterText }) {
  return (
    <div>
      filter shown with <input value={filterText} onChange={changeFilterText} />
    </div>
  );
}
