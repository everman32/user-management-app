const DateService = {
  getCurrentDate() {
    return new Date().toISOString();
  },
  getFormatedDate(date) {
    return date.toLocaleString();
  },
};

export default DateService;
