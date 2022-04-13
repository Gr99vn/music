export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelCaseToTitle(str) {
  let res = "";
  let lastIndex = 0;
  str = capitalize(str);
  for (let index in str) {
    if (str.charAt(index) === str.charAt(index).toUpperCase()) {
      res += str.slice(lastIndex, index) + " ";
      lastIndex = index;
    }
  }
  return res + str.slice(lastIndex);
}

export function isEmail(str) {
  const regex = /\w+@\w+\.\w+/g;
  return regex.test(str);
}

export function validate({ values, errors }) {
  for (let val of Object.values(values)) {
    if (val === "") {
      return false;
    }
  }
  for (let val of Object.values(errors)) {
    if (val !== "") {
      return false;
    }
  }
  return true;
}

export function toHumanReadableDuration(durationMs) {
  let seconds =  Math.round(Number.parseInt(durationMs / 1000));
  const minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  return `${minutes}:${seconds.toString().padStart(2, 0)}`;
}