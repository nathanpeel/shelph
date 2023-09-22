export type newBookForm = {
  title: string, 
  author: string,
  series: string,
  category: {
    [key: string]: boolean
  },
  rating: null | number,
  totalPageCount: number,
  currentPageCount: number, 
  startDate: string, 
  finishDate: string
}