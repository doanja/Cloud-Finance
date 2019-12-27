const isValidDecimal = num => {
  // check if number is a valid decimal (10,2)
  const pattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/g);
  return pattern.test(num);
};

const isValidExpenseDescription = str => {
  // check if str is 1 - 50 characters long and alphanumeric only
  const pattern = new RegExp(/^.{1,50}$/);
  return pattern.test(str);
};

const isValidDate = str => {
  // check if str is a valid date
  const pattern = new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
  return pattern.test(str);
};

const isValidCategoryName = str => {
  // check if str is 1 - 50 characters long and alphanumeric only
  const pattern = new RegExp(/^.{1,20}$/);
  return pattern.test(str);
};

const isValidName = str => {
  // check if str is 2 - 20 characters long and alphanumeric only
  const pattern = new RegExp(/^[a-zA-Z]+$/);
  return pattern.test(str);
};

const isValidPassword = str => {
  // check if str is 10 - 30 characters long and alphanumeric only
  const pattern = new RegExp(/^.{10,30}$/);
  return pattern.test(str);
};

const isValidEmail = str => {
  // check if str is 10 - 30 characters long and alphanumeric only
  const pattern = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );
  return pattern.test(str);
};

// console.log('------------------------- isValidDecimal');

// console.log('abc', isValidDecimal('abc'));
// console.log('12.32', isValidDecimal(12.32));
// console.log('"12.32"', isValidDecimal('12.32'));
// console.log('"12"', isValidDecimal('12'));
// console.log('12', isValidDecimal(12));
// console.log('"12.23.12"', isValidDecimal('12.23.12'));
// console.log('"12.23.12"', isValidDecimal('12.23.12'));
// console.log('12.3233', isValidDecimal(12.3223));
// console.log('.33', isValidDecimal('.33'));
// console.log('0.54', isValidDecimal('0.54'));
// console.log('-0.54', isValidDecimal('-0.54'));
// console.log('0.54@<!>', isValidDecimal('0.54@<!>'));

// console.log('---------------- isValidExpenseDescription');

// console.log(isValidExpenseDescription('aasjkdf213'));
// console.log(isValidExpenseDescription('aasjk213f213'));
// console.log(isValidExpenseDescription('@#asdjhfk'));

// console.log('---------------- isValidDate');

// console.log('1993/12/19', isValidDate('1993/12/19'));
// console.log('21/2323/20', isValidDate('21/2323/20'));
// console.log('2019/01/20', isValidDate('2019/01/20'));

// console.log('------------------------- isValidPassword');

// console.log(isValidPassword('asjld;kfjl;L23As@'));
// console.log(isValidPassword('AB'));
// console.log(isValidPassword('APPLEAasdfaSFK'));
// console.log(isValidPassword('asjld;kfjlaaaaaaaaaaffffffffff;L23As@'));

// console.log('------------------------- isValidEmail');

// console.log(isValidEmail('aslkdjfla@gmail.com'));
// console.log(isValidEmail('@gmail.com'));
// console.log(isValidEmail('aslkdjfla@'));
// console.log(isValidEmail('aslkdjf@la@com'));
