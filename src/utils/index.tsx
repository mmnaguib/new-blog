export const getTimeDifference = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now.getTime() - date.getTime(); // بالمللي ثانية

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return ` ${days} يوم${days === 1 ? "" : "ًا"}`;
  if (hours > 0) return ` ${hours} ساعة`;
  if (minutes > 0) return ` ${minutes} دقيقة`;
  return ` لحظات`;
};
