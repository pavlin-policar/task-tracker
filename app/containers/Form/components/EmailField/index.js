import generateInputField from '../generateInputField';

import styles from './styles.css';


export default generateInputField('email', {
  validate: 'email',
  className: styles.emailField,
});
