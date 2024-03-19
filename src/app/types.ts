export type newBookForm = {
  title: string,
  author: string,
  image: string,
  series: string,
  category: {
    [key: string]: boolean
  },
  rating: number,
  totalPageCount: number,
  currentPageCount: number,
  startDate: string,
  finishDate: string
}

export type bookType = {
  id: string,
  title: string,
  author: string,
  image: string,
  rating: number,
  startDate: string,
  finishDate: string,
  currentPageCount: number,
  totalPageCount: number,
  categories: string[],
  series: string
}