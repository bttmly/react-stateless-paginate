"use strict";

import React, { Component, PropTypes } from "react";
import classNames from "classnames";

import createFragment from "react-addons-create-fragment";
import PageView from "./PageView";
import BreakView from "./BreakView";

function StaticPaginationBoxView (props) {
  const selected = (
    props.initialSelected ? props.initialSelected :
    props.forceSelected   ? props.forceSelected :
    0
  );

  const items = pagination(props, selected);

  // let disabled = props.disabledClassName;
  const previousClasses = classNames(props.previousClassName, {disabled: selected === 0});
  const nextClasses = classNames(props.nextClassName, {disabled: selected === props.pageNum - 1});

  return (
    <ul className={props.containerClassName}>
      <li className={previousClasses}>
        <a href="" className={props.previousLinkClassName}>{props.previousLabel}</a>
      </li>

      {createFragment(items)}

      <li className={nextClasses}>
        <a href="" className={props.nextLinkClassName}>{props.nextLabel}</a>
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

function pagination (props, selected) {
  let items = {};

  if (props.pageNum <= props.pageRangeDisplayed) {

    for (let index = 0; index < props.pageNum; index++) {
      items["key" + index] = (
        <PageView
          selected={selected === index}
          pageClassName={props.pageClassName}
          pageLinkClassName={props.pageLinkClassName}
          activeClassName={props.activeClassName}
          page={index + 1} 
          linkHref={props.hrefPrefix + (index + 1)}
        />
      );
    }

  } else {

    let leftSide  = (props.pageRangeDisplayed / 2);
    let rightSide = (props.pageRangeDisplayed - leftSide);

    if (selected > props.pageNum - props.pageRangeDisplayed / 2) {
      rightSide = props.pageNum - selected;
      leftSide  = props.pageRangeDisplayed - rightSide;
    }
    else if (selected < props.pageRangeDisplayed / 2) {
      leftSide  = selected;
      rightSide = props.pageRangeDisplayed - leftSide;
    }

    let index;
    let page;
    let breakView;

    for (index = 0; index < props.pageNum; index++) {

      page = index + 1;

      let pageView = (
        <PageView
          selected={selected === index}
          pageClassName={props.pageClassName}
          pageLinkClassName={props.pageLinkClassName}
          activeClassName={props.activeClassName}
          page={index + 1}
          linkHref={props.hrefPrefix + (index + 1)}
        />
      );

      if (page <= props.marginPagesDisplayed) {
        items["key" + index] = pageView;
        continue;
      }

      if (page > props.pageNum - props.marginPagesDisplayed) {
        items["key" + index] = pageView;
        continue;
      }

      if ((index >= selected - leftSide) && (index <= selected + rightSide)) {
        items["key" + index] = pageView;
        continue;
      }

      let keys            = Object.keys(items);
      let breakLabelKey   = keys[keys.length - 1];
      let breakLabelValue = items[breakLabelKey];

      if (props.breakLabel && breakLabelValue !== breakView) {
        breakView = (
          <BreakView breakLabel={props.breakLabel} />
        );

        items["key" + index] = breakView;
      }
    }
  }

  return items;
}

export default StaticPaginationBoxView;
