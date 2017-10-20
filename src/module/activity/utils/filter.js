
const FILTER_LIST = {
  numberCheck(value) { //数字转化为字符串 例: 1 => '01'
    let number_value = value / 1;
    if (number_value > 9) {
      return number_value + '';
    } else if(number_value <=0) {
      return `${number_value}`;
    }
    return `0${number_value}`;
  }
}

export default FILTER_LIST;
