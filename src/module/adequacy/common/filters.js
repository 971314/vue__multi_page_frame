import moment from 'moment'

export default {
  dataFormat: function () {
    if (!arguments[0]) {
      return arguments[0]
    }

    if (arguments.length === 2) {
      let [value, format] = arguments
      return moment(value).format(format)
    } else if (arguments.length === 3) {
      let [value, valFormat, format] = arguments
      return moment(value, valFormat).format(format)
    }
  }
}
