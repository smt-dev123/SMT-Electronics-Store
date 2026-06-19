import dayjs from 'dayjs'

export const formatDate = (date: string | Date, pattern = 'DD/MM/YYYY') => {
  if (!date) return ''
  return dayjs(date).format(pattern)
}