"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pagination;
// The generic, plain 'ol JS pagination algorithm
// returns an array of objects representing something like
// [ [1] [2] [...] [6] [7] [8] [...] [167] [168] ]

function pagination(params) {
  var items = [];

  // these are all Numbers
  var pageNum = params.pageNum;
  var selected = params.selected;
  var pageRangeDisplayed = params.pageRangeDisplayed;
  var marginPagesDisplayed = params.marginPagesDisplayed;


  if (pageNum <= pageRangeDisplayed) {
    for (var index = 0; index < pageNum; index++) {
      items.push({ type: "page", page: index + 1, selected: selected === index });
    }

    return items;
  }

  var leftSide = pageRangeDisplayed / 2;
  var rightSide = pageRangeDisplayed - leftSide;

  if (selected > pageNum - pageRangeDisplayed / 2) {
    rightSide = pageNum - selected;
    leftSide = pageRangeDisplayed - rightSide;
  } else if (selected < pageRangeDisplayed / 2) {
    leftSide = selected;
    rightSide = pageRangeDisplayed - leftSide;
  }

  var breakView = void 0;
  for (var _index = 0; _index < pageNum; _index++) {
    var page = _index + 1;
    var pageView = { type: "page", page: page, selected: selected === _index };

    if (page <= marginPagesDisplayed || page > pageNum - marginPagesDisplayed || _index >= selected - leftSide && _index <= selected + rightSide) {
      items.push(pageView);
      continue;
    }

    var lastValue = items[items.length - 1];
    if (lastValue !== breakView) {
      breakView = { type: "break" };
      items.push(breakView);
    }
  }

  return items;
}
//# sourceMappingURL=paginate.js.map