/* ----------- GraphQL Schema using graph.ql ----------- */
const gfSchema = `
  type Form {
    # Gravity Forms form data
    title: String,
    description: String,
    button: String,
    confirmation: String,
    fields: [Field]
  }

  type Field {
    # Form field
    type: String,
    id: Int,
    label: String,
    placeholder: String,
    cssClass: String,
    visibility: String,
    isRequired: Boolean,
    prePopulated: Boolean,
    prePopulatedParam: String,
    choices: JSON
  }

  type Query {
    form(id: Int): Form
  }
`;

export default gfSchema;
