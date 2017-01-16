import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getForm, updateForm, submitForm } from '../../actions/actions_forms';
import { RenderFields } from './GravityForm/RenderFields';
import { Button } from './GravityForm/Button';
import { FormError } from './GravityForm/FormError';
import { FormConfirmation } from './GravityForm/FormConfirmation';

class GravityFrom extends Component {
  static propTypes = {
    forms: PropTypes.object,
    form_id: PropTypes.string,
    submitForm: PropTypes.func,
    getForm: PropTypes.func,
    updateForm: PropTypes.func,
    showTitle: PropTypes.bool,
    showDescription: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      submitFailed: false
    };
  }
  componentWillMount() {
    this.props.getForm(this.props.form_id);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.form_id != nextProps.form_id){
      this.props.getForm(nextProps.form_id);
    }
  }
  updateFormHandler(value, field, valid){
    this.props.updateForm(value, field, valid);
  }
  getButtonClasses(isValid, loading){
    if(loading){
      return 'loading';
    } else if(!isValid){
      return 'disabled';
    }
  }
  submit(event){
    event.preventDefault();
    if(this.props.forms.isValid){
      this.setState({submitFailed: false});
      this.props.submitForm(this.props.form_id, this.props.forms.form_values);
    } else{
      this.setState({submitFailed: true});
    }
  }
  render() {
    const { forms, showTitle, showDescription } = this.props;
    const { active_form, form_values, confirmation, loading, submitSuccess, isValid } = forms;
    const { title, description, button, fields } = active_form;
    const { submitFailed } = this.state;
    if(!fields){
      return null;
    }
    return (
      <div className="form">
        {showTitle ? <h3 className="form_title">{title}</h3> : null}
        {showDescription ? <p className="form_description">{description}</p> : null}
        <FormError
          error_message="There was a problem with your submission"
          showError={submitFailed}
        />
        <FormConfirmation
          confirmation_message={confirmation}
          showConfirmation={confirmation && !submitFailed}
        />
        <form onSubmit={(event) => this.submit(event)} noValidate>
          <RenderFields
            fields={fields}
            form_values={form_values}
            submitFailed={submitFailed}
            submitSuccess={submitSuccess}
            updateForm={(value, field, valid) => this.updateFormHandler(value, field, valid)}
          />
          <Button
            text={button.text}
            className={this.getButtonClasses(isValid, loading)}
            showLoading={loading}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ forms }) => {
  return {
    forms
  };
};

export default connect(mapStateToProps, { getForm, updateForm, submitForm })(GravityFrom);
