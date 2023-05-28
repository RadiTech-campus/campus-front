function AddDays(date, days) {
  // date는 문자열로 받는다 ex, '2020-10-15'
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const getDateDiff = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffDate = date1.getTime() - date2.getTime();

  return diffDate / (1000 * 60 * 60 * 24); // 밀리세컨 * 초 * 분 * 시 = 일
};

export { AddDays, getDateDiff };
