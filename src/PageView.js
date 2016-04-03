"use strict";

import React from "react";

export default function PageView (props) {
  let linkClassName = props.pageLinkClassName;
  let cssClassName = props.pageClassName;

  if (props.selected) {
    if (cssClassName != null) {
      cssClassName = cssClassName + " " + props.activeClassName;
    } else {
      cssClassName = props.activeClassName;
    }
  }

  return (
    <li className={cssClassName}>
      <a href={props.linkHref} className={linkClassName}>
        {props.page}
      </a>
    </li>
  );
}

