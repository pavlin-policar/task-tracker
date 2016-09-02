import { generateInputField } from '@policar/react-redux-form';

import styles from '../styles.css';


export default generateInputField('email', {
  validate: 'email',
  className: styles.inputField,
});
