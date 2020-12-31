module.exports = alphanumeric = (num) => {
  // AA-00
  let malformed;
  num -= 1;

  if (num < 2600) {
    if (num < 100) {
      if (num < 10) return (malformed = `AA-0${num}`);
      return (malformed = `AA-${num}`);
    } else if (num < 200) {
      if (num < 10) return (malformed = `AB-0${num}`);
      return (malformed = `AB-${num.toString().substring(1)}`);
    } else if (num < 300) {
      if (num < 10) return (malformed = `AB-0${num}`);
      return (malformed = `AC-${num.toString().substring(1)}`);
    } else if (num < 400) {
      if (num < 10) return (malformed = `AB-0${num}`);
      return (malformed = `AD-${num.toString().substring(1)}`);
    }
  }
};
