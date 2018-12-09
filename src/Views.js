import React from "react";

export default props => (
  <ul className="app-views">
    {props.views.map((view, i) => (
      <li key={i} className={i === props.index ? "active" : null}>
        <button onClick={() => props.onClick(i)}>{view.name}</button>
      </li>
    ))}
  </ul>
);
