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