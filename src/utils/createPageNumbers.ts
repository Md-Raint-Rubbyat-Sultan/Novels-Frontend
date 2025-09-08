export const createPageNumber = (
  page: number,
  totalPage: number
): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (totalPage <= 6) {
    for (let i = 1; i <= totalPage; i++) pages.push(i);
  } else {
    if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPage);
    } else if (page >= totalPage - 3) {
      pages.push(
        1,
        "...",
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage
      );
    } else {
      pages.push(
        1,
        "...",
        page - 1,
        page,
        page + 1,
        page + 2,
        "...",
        totalPage
      );
    }
  }

  return pages;
};
