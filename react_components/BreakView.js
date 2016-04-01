import React from "react";

export default function StaticBreakView (props) {
  const label = this.props.breakLabel;
  return (
    <li className="break">
      {label}
    </li>
  );
}
