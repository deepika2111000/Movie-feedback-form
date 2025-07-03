import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const MovieFeedbackForm = () => {
  const initialValues = {
    name: "",
    movie: "",
    rating: "",
    comments: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    movie: Yup.string()
      .required("Movie name is required"),

    rating: Yup.number()
      .min(1, "Minimum rating is 1")
      .max(5, "Maximum rating is 5")
      .required("Rating is required"),

    comments: Yup.string()
      .max(50, "Comments should be under 50 characters"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const existing = JSON.parse(localStorage.getItem("reviews")) || [];

    const newReview = {
      name: values.name,
      movie: values.movie,
      rating: values.rating,
      comments: values.comments,
    };

    existing.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(existing));

    alert("Form submitted successfully");
    resetForm();
  };

  return (
    <div className="form-container">
      <h2>MOVIE FEEDBACK FORM</h2>

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
            <Field as="select" name="movie">
              <option value="">Select Movie</option>
              <option value="Vampire Diaries">Vampire Diaries</option>
              <option value="Money Heist">Money Heist</option>
              <option value="Stranger Things">Stranger Things</option>
            </Field>
            <ErrorMessage name="movie" component="div" className="error" />
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