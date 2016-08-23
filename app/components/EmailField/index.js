import generateInputField from 'components/InputField';

import styles from './styles.css';


export default generateInputField('email', {
  validations: 'email',
  className: styles.emailField,
});
