export default function (submitted, errors, name, valid) {

  const styles = {
      width: '100%'
  };

  if ((errors && errors[name]) || (submitted && !valid)) {
    styles.borderColor = 'red';
    styles.color = 'red';
  }

  return styles;
}