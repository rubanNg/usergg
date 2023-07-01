export type User = {
  id: string,
  name: string,
  company: string,
  position: string,
  department: string,
  avatar: string,
  activityFlag: 'active' | 'inactive',
}

export type ListProps = {
  items: User[],
  visibleItemsCount: number,
  itemHeight: number,
}