export type newBookForm = {
  title: string,
  author: string,
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

export type Book = {
  _id: string,
  title: string,
  author: string,
  rating: number,
  startDate: string,
  finishDate: string,
  currentPageCount: Number,
  totalPageCount: number,
  categories: string[],
  series: string
}