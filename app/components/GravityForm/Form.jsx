import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForm, updateForm, submitForm } from '../../actions/gravityforms';
import { RenderFields } from './RenderFields';
import { Button } from './Button';
import { FormError } from './FormError';
import { FormConfirmation } from './FormConfirmation';

class GravityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitFailed: false
    };
  }
  componentWillMount() {
    this.props.getForm(this.props.formId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.formId !== nextProps.formId) {
      this.props.getForm(nextProps.formId);
    }
  }
  getButtonClasses(isValid, loading) {
    if (loading) return 'loading';
    else if (!isValid) return 'disabled';
    return 'active';
  }
  updateFormHandler(value, field, valid) {
    this.props.updateForm(value, field, valid);
  }
  submit(event) {
    event.preventDefault();
    if (this.props.gravityforms.isValid) {
      this.setState({submitFailed: false});
      this.props.submitForm(this.props.formId, this.props.gravityforms.formValues);
    } else this.setState({submitFailed: true});
  }
  render() {
    const { gravityforms, formId, showTitle, showDescription } = this.props;
    const { activeForm, formValues, loading, submitSuccess, isValid } = gravityforms;
    if (!activeForm) return <span>Form Not Found with ID {formId}</span>;
    const { title, description, button, fields, confirmation } = activeForm;
    const { submitFailed } = this.state;
    if (!fields) return null;
    return (
      <div className="form">
        {showTitle ? <h3 className="form_title">{title}</h3> : null}
        {showDescription ? <p className="form_description">{description}</p> : null}
        <FormError
          errorMessage="There was a problem with your submission"
          showError={submitFailed}
        />
        <FormConfirmation
          confirmation={confirmation}
          showConfirmation={confirmation && !submitFailed}
        />
        <form onSubmit={(event) => this.submit(event)} noValidate>
          <RenderFields
            fields={fields}
            formValues={formValues}
            submitFailed={submitFailed}
            submitSuccess={submitSuccess}
            updateForm={(value, field, valid) => this.updateFormHandler(value, field, valid)}
          />
          <Button
            text={button}
            className={this.getButtonClasses(isValid, loading)}
            showLoading={loading}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({gravityforms}) => {
  return {
    gravityforms
  };
};

export default connect(mapStateToProps, { getForm, updateForm, submitForm })(GravityForm);
