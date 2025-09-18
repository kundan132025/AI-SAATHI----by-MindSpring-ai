import React from "react";

export default function CategorySelector({
  categories = [],
  selected,
  onSelect,
}) {
  return (
    <div className="category-wrap">
      {categories.map((c) => (
        <button
          key={c}
          className={`cat ${selected === c ? "active" : ""}`}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
