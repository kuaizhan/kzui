export function isDate(time) {
  return time instanceof Date;
}

/**
 * 格式化时间
 * @param {Date} time
 * @param {*} pattern eg: YYYY-MM-DD HH:mm:ss
 */
export function formatTime(time, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (!isDate(time)) {
      // REVIEW 假定传入数据不是Date就是时间戳
      time = new Date(time);
  }
  const year = time.getFullYear();
  const month = (`00${(time.getMonth() + 1)}`).slice(-2);
  const day = (`00${time.getDate()}`).slice(-2);
  const hour = (`00${time.getHours()}`).slice(-2);
  const min = (`00${time.getMinutes()}`).slice(-2);
  const sec = (`00${time.getSeconds()}`).slice(-2);
  return pattern.replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hour)
      .replace('mm', min)
      .replace('ss', sec);
}