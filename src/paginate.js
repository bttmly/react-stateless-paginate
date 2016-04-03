export default function pagination (props, selected) {
  let items = {};

  if (props.pageNum <= props.pageRangeDisplayed) {

    for (let index = 0; index < props.pageNum; index++) {
      items["key" + index] = { type: "page", page: index + 1, selected: selected === index };
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

      let pageView = { type: "page", page, selected: selected === index };

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

      if (breakLabelValue !== breakView) {
        breakView = { type: "break" };
        items["key" + index] = breakView;
      }
    }
  }

  return items;
}