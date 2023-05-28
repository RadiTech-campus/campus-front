function AddDays(date, days) {
  // date는 문자열로 받는다 ex, '2020-10-15'
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export { AddDays };
