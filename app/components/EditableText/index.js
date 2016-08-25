import React from 'react';

import keys from 'utils/keyCode';

import TextField from 'components/Form/TextField';

import styles from './styles.css';


/**
* EditableSpan
*/
class EditableText extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    editing: React.PropTypes.bool,
    defaultClassName: React.PropTypes.string,
    activeClassName: React.PropTypes.string,
    onEditModeChange: React.PropTypes.func,
    onSave: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.enableEditMode = this.enableEditMode.bind(this);
    this.disableEditMode = this.disableEditMode.bind(this);
    this.handleTextfieldKeys = this.handleTextfieldKeys.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  state = {
    editing: this.props.editing || false,
    value: this.props.value || '',
  }

  handleTextfieldKeys(e) {
    switch (e.keyCode) {
      case keys.ENTER:
        this.save();
        break;
      case keys.ESCAPE:
        this.cancel();
        break;
      default:
        // no op
    }
  }

  enableEditMode() {
    this.setState({ editing: true });
    (this.props.onEditModeChange || Function)(true);
  }

  disableEditMode() {
    this.setState({ editing: false });
    (this.props.onEditModeChange || Function)(false);
  }

  /**
   * Trigger a save event on the editable text element.
   */
  save() {
    const text = this.input.getValue();
    this.setState({ value: text });
    this.disableEditMode();
    (this.props.onSave || Function)(text);
  }

  /**
   * Trigger a cancel event on the editable text element.
   */
  cancel() {
    this.disableEditMode();
    (this.props.onCancel || Function)();
  }

  render() {
    const { defaultClassName, activeClassName, placeholder } = this.props;

    const className = [styles.editableText];
    if (this.state.editing) {
      if (activeClassName) {
        className.push(activeClassName);
      } else if (defaultClassName) {
        className.push(defaultClassName);
      }

      return (
        <TextField
          ref={(c) => { this.input = c; }}
          value={this.state.value}
          placeholder={placeholder}
          className={className.join(' ')}
          onKeyUp={this.handleTextfieldKeys}
          autoFocus
        />
      );
    } else { // eslint-disable-line no-else-return
      if (defaultClassName) {
        className.push(defaultClassName);
      }
      return (
        <span
          className={className.join(' ')}
          onClick={this.enableEditMode}
        >
          {this.state.value}
        </span>
      );
    }
  }
}

export default EditableText;
