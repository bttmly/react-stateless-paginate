import React from "react";

export default function StaticBreakView (props) {
  const label = props.breakLabel;
  return (
    <li className="break">
      {label}
    </li>
  );
}
