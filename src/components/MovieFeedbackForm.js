import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const MovieFeedbackForm = () => {
  const initialValues = {
    name: "",
    movieName: "",
    rating: "",
    comments: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Full name is required"),

    movieName: Yup.string()
      .required("Movie Name is required"),

    rating: Yup.number()
      .min(1, "Minimum rating is 1")
      .max(5, "Maximum rating is 5")
      .required("Rating is required"),

    comments: Yup.string()
      .max(200, "Comments should be under 200 characters")
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted: ", values);
    alert("Form submitted successfully");
    resetForm();
  };

  return (
    <div className="form-container">
      <h2>Movie Feedback Form</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Name:</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div>
            <label>Movie Name:</label>
            <Field as="select" name="movieName">
              <option value="">Select Movie Name</option>
              <option value="Vampire Diaries">Vampire Diaries</option>
              <option value="Money Heist">Money Heist</option>
              <option value="Stranger Things">Stranger Things</option>
            </Field>
            <ErrorMessage name="movieName" component="div" className="error" />
          </div>

          <div>
            <label>Rating (1-5):</label>
            <Field type="number" name="rating" min="1" max="5" />
            <ErrorMessage name="rating" component="div" className="error" />
          </div>

          <div>
            <label>Comments:</label>
            <Field as="textarea" name="comments" />
            <ErrorMessage name="comments" component="div" className="error" />
          </div>

          <button type="submit">Submit Feedback</button>
        </Form>
      </Formik>
    </div>
  );
};

export default MovieFeedbackForm;