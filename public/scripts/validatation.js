/**
 * function to determine if a number is a valid decimal
 * @param {number} num the number to test against the regex
 * @return {boolean} true if num passes the regex test, false otherwise
 */
const isValidDecimal = num => {
  const pattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/g);
  return pattern.test(num);
};

/**
 * function to determine if a string is valid (1-50 characters)
 * @param {string} str the string to test against the regex
 * @return {boolean} true of str passes the regex test, false otherwise
 */
const isValidExpenseDescription = str => {
  const pattern = new RegExp(/^.{1,50}$/);
  return pattern.test(str);
};

/**
 * function to determine if a string is valid date
 * @param {string} str the string to test against the regex
 * @return {boolean} true of str passes the regex test, false otherwise
 */
const isValidDate = str => {
  // check if str is a valid date
  const pattern = new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
  return pattern.test(str);
};

/**
 * function to determine if a string is valid (1-20 characters)
 * @param {string} str the string to test against the regex
 * @return {boolean} true of str passes the regex test, false otherwise
 */
const isValidCategoryName = str => {
  const pattern = new RegExp(/^.{1,20}$/);
  return pattern.test(str);
};

/**
 * function to determine if a string is valid (alphas only)
 * @param {string} str the string to test against the regex
 * @return {boolean} true of str passes the regex test, false otherwise
 */
const isValidName = str => {
  const pattern = new RegExp(/^([a-zA-Z0-9_-]){2,20}$/);
  return pattern.test(str);
};

/**
 * function to determine if a string is valid (10-30 characters)
 * @param {string} str the string to test against the regex
 * @return {boolean} true of str passes the regex test, false otherwise
 */
const isValidPassword = str => {
  const pattern = new RegExp(/^.{10,30}$/);
  return pattern.test(str);
};

/**
 * function to determine if a string is valid email
 * @param {string} str the string to test against the regex
 * @return {boolean} true of str passes the regex test, false otherwise
 */
const isValidEmail = str => {
  const pattern = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );
  return pattern.test(str);
};
