const today = moment(new Date()).format('YYYY-MM-DD');
const yesterday = moment(new Date())
  .add(-1, 'days')
  .format('YYYY-MM-DD');

const lastWeekStart = moment()
  .subtract(1, 'week')
  .startOf('week')
  .format('YYYY-MM-DD');
const lastWeekEnd = moment()
  .subtract(1, 'week')
  .endOf('week')
  .format('YYYY-MM-DD');

const thisWeekStart = moment()
  .startOf('week')
  .format('YYYY-MM-DD');
const thisWeekEnd = moment()
  .endOf('week')
  .format('YYYY-MM-DD');

const lastMonthStart = moment()
  .subtract(1, 'month')
  .startOf('month')
  .format('YYYY-MM-DD');
const lastMonthEnd = moment()
  .subtract(1, 'month')
  .endOf('month')
  .format('YYYY-MM-DD');

const thisMonthStart = moment()
  .startOf('month')
  .format('YYYY-MM-DD');
const thisMonthEnd = moment()
  .endOf('month')
  .format('YYYY-MM-DD');

const lastYearStart = moment()
  .subtract(1, 'year')
  .startOf('year')
  .format('YYYY-MM-DD');
const lastYearEnd = moment()
  .subtract(1, 'year')
  .endOf('year')
  .format('YYYY-MM-DD');

const thisYearStart = moment()
  .startOf('year')
  .format('YYYY-MM-DD');
const thisYearEnd = moment()
  .endOf('year')
  .format('YYYY-MM-DD');
