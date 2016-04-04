"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";

import createFragment from "react-addons-create-fragment";
import paginate from "./paginate";

export default function Pagination (props) {
  const selected = (
    props.initialSelected ? props.initialSelected :
    props.forceSelected   ? props.forceSelected :
    0
  );

  const Block = BlockFactory(props);
  const pages = paginate(props, selected).reduce(function (out, item, index) {
    out["key" + index] = Block(item);
    return out;
  }, {});

  const disabled = props.disabledClassName;
  const previousClasses = classNames(props.previousClassName, { [disabled]: selected === 0 });
  const nextClasses = classNames(props.nextClassName, { [disabled]: selected === props.pageNum - 1 });

  // "selected" is one less than the number displayed
  const previousHref = selected === 0 ? "#" : props.hrefPrefix + selected;
  const nextHref = selected === props.pageNum - 1 ? "#" : props.hrefPrefix + (selected + 2);

  return (
    <ul className={props.containerClassName}>
      <li className={previousClasses}>
        <a href={previousHref} className={props.previousLinkClassName}>{props.previousLabel}</a>
      </li>

      {createFragment(pages)}

      <li className={nextClasses}>
        <a href={nextHref} className={props.nextLinkClassName}>{props.nextLabel}</a>
      </li>
    </ul>
  );
}

Pagination.propTypes = {
  pageNum               : PropTypes.number.isRequired,
  pageRangeDisplayed    : PropTypes.number.isRequired,
  marginPagesDisplayed  : PropTypes.number.isRequired,
  previousLabel         : PropTypes.node,
  nextLabel             : PropTypes.node,
  breakLabel            : PropTypes.node,
  clickCallback         : PropTypes.func,
  initialSelected       : PropTypes.number,
  forceSelected         : PropTypes.number,
  containerClassName    : PropTypes.string,
  subContainerClassName : PropTypes.string,
  pageClassName         : PropTypes.string,
  pageLinkClassName     : PropTypes.string,
  activeClassName       : PropTypes.string,
  previousClassName     : PropTypes.string,
  nextClassName         : PropTypes.string,
  previousLinkClassName : PropTypes.string,
  nextLinkClassName     : PropTypes.string,
  disabledClassName     : PropTypes.string,
  hrefPrefix            : PropTypes.string,
};

Pagination.defaultProps = {
  pageNum              : 10,
  pageRangeDisplayed   : 2,
  marginPagesDisplayed : 3,
  activeClassName      : "selected",
  previousClassName    : "previous",
  nextClassName        : "next",
  previousLabel        : "Previous",
  nextLabel            : "Next",
  breakLabel           : "...",
  disabledClassName    : "disabled",
  hrefPrefix           : "/page/",
};

function BlockFactory (props) {
  return function Block (data) {
    return data.type === "page" ?
      <Page
        selected={data.selected}
        pageClassName={props.pageClassName}
        pageLinkClassName={props.pageLinkClassName}
        activeClassName={props.activeClassName}
        page={data.page} 
        linkHref={props.hrefPrefix + data.page}
      /> :
      <Break breakLabel={props.breakLabel} />;
  };
}

function Page (props) {
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

function Break (props) {
  const label = props.breakLabel;
  return (
    <li className="break">
      {label}
    </li>
  );
}

