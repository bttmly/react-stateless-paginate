"use strict";

import React, { Component, PropTypes } from "react";
import classNames from "classnames";

import createFragment from "react-addons-create-fragment";
import PageView from "./PageView";
import BreakView from "./BreakView";
import paginate from "./paginate";

function StaticPaginationBoxView (props) {
  const selected = (
    props.initialSelected ? props.initialSelected :
    props.forceSelected   ? props.forceSelected :
    0
  );

  function Block (data) {
    return data.type === "page" ?
      <PageView
        selected={data.selected}
        pageClassName={props.pageClassName}
        pageLinkClassName={props.pageLinkClassName}
        activeClassName={props.activeClassName}
        page={data.page} 
        linkHref={props.hrefPrefix + data.page}
      /> :
      <BreakView breakLabel={props.breakLabel} />;
  }

  const items = paginate(props, selected);
  const pages = Object.keys(items).reduce(function (out, key) {
    out[key] = Block(items[key]);
    return out;
  }, {});

  // let disabled = props.disabledClassName;
  const previousClasses = classNames(props.previousClassName, {disabled: selected === 0});
  const nextClasses = classNames(props.nextClassName, {disabled: selected === props.pageNum - 1});

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

StaticPaginationBoxView.propTypes = {
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
}

StaticPaginationBoxView.defaultProps = {
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
}

export default StaticPaginationBoxView;
