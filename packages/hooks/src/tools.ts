
const isEmpty = (o: any) => o === undefined || o === null;

const stringifyArray = (key, value) => {
  if (value.length > 0) {
      return key + '=' + value.join(',')
  }

  return key + '='
}

export const encodeQueryString = (obj) => {
  const pairs = [];
  Object.keys(obj).forEach(key => {
    if (!isEmpty(obj[key])) {

        if (Array.isArray(obj[key])) {
            pairs.push(stringifyArray(key, obj[key]))
            return
        }

        pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    }
    });
  return pairs.join('&');
};