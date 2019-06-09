export default {
  toStringDate (value) {
    let result = ""
    if (value) {
      let data = new Date(value)
      let year = data.getFullYear();
      let month = data.getMonth() + 1;
      let date = data.getDate();
      result = year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date)
    }
    return result
  }
}
