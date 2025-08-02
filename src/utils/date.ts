export function isTodayLocal(dateStr: string) {
  const inputDate = new Date(dateStr) // 解析输入日期（自动转本地时区）
  const today = new Date() // 当前本地时间

  return (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  )
}
