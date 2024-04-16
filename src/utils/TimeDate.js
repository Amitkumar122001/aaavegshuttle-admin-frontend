export const timePickerMUI = (e) => {
  // console.log(e)
  return `${e.$H}:${e.$m}`;
};
export const estimatedTimeConvertor = (fractionalTime) => {
  const totalHours = fractionalTime * 24;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  return formattedTime;
};
