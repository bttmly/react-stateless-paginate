// The generic, plain 'ol JS pagination algorithm
// returns an array of objects representing something like
// [ [1] [2] [...] [6] [7] [8] [...] [167] [168] ]

// factored apart from React stuff since others might find it
// useful as a base algorithm for other pagination packages.
// Maybe make own npm package?

export default function pagination (params) {
  const items = [];

  // these parameters should all be *integers*
  const { pageNum, selected, pageRangeDisplayed, marginPagesDisplayed } = params;

  if (pageNum <= pageRangeDisplayed) {
    for (let index = 0; index < pageNum; index++) {
      items.push({ type: "page", page: index + 1, selected: selected === index });
    }

    return items;
  }

  let leftSide = (pageRangeDisplayed / 2);
  let rightSide = (pageRangeDisplayed - leftSide);

  if (selected > pageNum - pageRangeDisplayed / 2) {
    rightSide = pageNum - selected;
    leftSide = pageRangeDisplayed - rightSide;
  } else if (selected < pageRangeDisplayed / 2) {
    leftSide = selected;
    rightSide = pageRangeDisplayed - leftSide;
  }

  let breakView;
  for (let index = 0; index < pageNum; index++) {
    const page = index + 1;

    if (
      page <= marginPagesDisplayed ||
      page > pageNum - marginPagesDisplayed ||
      ((index >= selected - leftSide) && (index <= selected + rightSide))
    ) {
      items.push({ type: "page", page, selected: selected === index });
      continue;
    }

    const lastValue = items[items.length - 1];
    if (lastValue !== breakView) {
      breakView = { type: "break" };
      items.push(breakView);
    }
  }

  return items;
}
