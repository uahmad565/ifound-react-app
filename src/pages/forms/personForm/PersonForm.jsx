import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./SignupForm.css";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { cities, genders, relations } from '../../../static/static';
import { PostPerson } from '../../../services/PostFormService';
import { ReactComponent as InfoSvg } from '../../../components/Svgs/information.svg';
import { PostStatus, TargetType } from '../../../Enums/Enums';
import NavBar from '../../../sections/NavBar';
import NotFound from '../../common/NotFound';
import MFooter from '../../../sections/MaterialFooter/MFooter';

export const PersonForm = () => {
  const { postType } = useParams();
  const navigate = useNavigate();
  const [exceptionMsg, setExceptionMsg] = useState("");

  if (parseInt(postType) > 2 || parseInt(postType) < 1) {
    return <NotFound />;
  }

  const routeToOnSuccess = () => {
    switch (Number(postType)) {
      case TargetType.LOST:
        navigate(`/lostMatchCases/${PostStatus.Unresolved}`);
        break;
      case TargetType.FOUND:
        navigate(`/foundMatchCases/${PostStatus.Unresolved}`);
        break;
      default:
        return "UnKnown"
    }
  }

  const getPostTypeString = () => {
    switch (Number(postType)) {
      case TargetType.LOST:
        return "Lost"
      case TargetType.FOUND:
        return "Found"
      default:
        return "UnKnown"
    }
  };

  return (
    <React.Fragment>
      <NavBar currentUser={localStorage.getItem("email")} />
      <Formik
        initialValues={{ firstName: '', lastName: '', state: 'Select None', gender: 'Select None', age: 0, relation: 'Select None', description: '', contact: '', image: null }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          state: Yup.string().oneOf(cities.filter((_, index) => index !== 0), 'Invalid State Selected').required('Required'),
          gender: Yup.string().oneOf(genders.filter((_, index) => index !== 0), 'Invalid Gender Selected').required("Required"),
          age: Yup.number().min(1, "Must be 1 years atleast").max(150, "Mut be 150 or less").required('Required'),
          relation: Yup.string().oneOf(relations.filter((_, index) => index !== 0), "Invalid Relation Type"),
          description: Yup.string().min(50, "Must be greater than 49 characters").required('Required'),
          contact: Yup.string().required("required").min(15, "too short").max(17, "too long"),
          image: Yup.mixed().required('Required')
        })}
        onSubmit={(values, { setSubmitting },) => {
          setTimeout(() => {
            setSubmitting(true);
            setExceptionMsg("");
            //alert(JSON.stringify(values, null, 2));
            const formData = new FormData();
            const { firstName, lastName, state, gender, age, relation, description, contact, image } = values;
            formData.append("Name", firstName + " " + lastName);
            formData.append("Location", state);
            formData.append("Gender", gender);
            formData.append("Age", age);
            formData.append("Relation", relation);
            formData.append("Description", description);
            formData.append("TargetType", postType);
            formData.append("Phone", contact);
            formData.append("Image", image, image.name);
            PostPerson(formData, Number(postType)).then(_res => {
              routeToOnSuccess();
            }).catch(err => {
              setExceptionMsg(err?.response?.data ? err.response.data : "Person Couldn't Created Please Try Again")
            }).finally(() => {
              setSubmitting(false);
            });

          }, 400);
        }}
      >
        <Form >
          <Container className='bg-white border border-2 mt-2 mb-2 p-3'>
            <Row className='mb-3'>
              <h3>Create {getPostTypeString()} {" "}Person</h3>
            </Row>
            <Row className='mb-3'>
              <Col sm>
                <label htmlFor="firstName"><b>First Name</b></label>
                <Field name="firstName" type="text" className="input-field-signup" />
                <div className="error">
                  <ErrorMessage name="firstName" />
                </div>
              </Col>
              <Col sm>
                <label htmlFor="lastName"><b>Last Name</b></label>
                <Field name="lastName" type="text" className="input-field-signup" />
                <div className="error"><ErrorMessage name="lastName" /></div>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col sm>
                <label htmlFor='state'><b>State/City</b></label>
                <Field name="state" as="select" className="my-select">
                  {cities && cities.map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                  ))}
                </Field>
                <div className="error">
                  <ErrorMessage name="state" />
                </div>
              </Col>
              <Col sm>
                <label htmlFor='gender'><b>Gender</b></label>
                <Field name="gender" as="select" className="my-select">
                  {
                    genders.map((value, index) => <option value={value} key={index}>{value}</option>)
                  }
                </Field>
                <div className="error">
                  <ErrorMessage name="gender" />
                </div>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col sm>
                <label htmlFor="age"><b>Age</b></label>
                <Field name="age" type="number" className="input-field-signup" />
                <div className="error">
                  <ErrorMessage name="age" />
                </div>
              </Col>
              <Col sm >
                <label htmlFor='relation'><b>Relation</b></label>
                <Field name="relation" as="select" className="my-select">{relations.map((value, index) => <option value={value} key={index}>{value}</option>)}
                </Field>
                <div className="error">
                  <ErrorMessage name="relation" />
                </div>
              </Col>

            </Row>
            <Row className='mb-3'>
              <Col >
                <label htmlFor="description"><b>Description</b></label>
                <Field name="description" as="textarea" rows="5" className="textArea" maxlength="600"/>
                <div className="error">
                  <ErrorMessage name="description" />
                </div>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <div className='contact'>
                  <label htmlFor="contact"><b>Contact No</b></label>
                  <Field name="contact" >
                    {({ field, form, meta }) => (
                      <div>
                        <PhoneInput
                          className='contact container-fluid flex-wrap overflow-auto '
                          defaultCountry='pk'
                          value={field.value}
                          name={field.name}
                          onChange={e => {
                            form.setFieldValue("contact", e)

                          }}
                          onBlur={form.handleBlur("contact")}
                        />
                      </div>
                    )}
                  </Field>
                  <div className="error">
                    <ErrorMessage name="contact" />
                  </div>
                </div>

              </Col>
            </Row>
            <Row className='mb-1'>
              <Col>
                <div class="alert alert-success fs-6 d-flex" role="alert">
                  <label>
                    <InfoSvg />
                    Note: Image should not be blurry. Multiple Face not allowed.</label>
                </div>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <div className='overflow-auto'>
                  <label htmlFor="image" className='me-2 mb-1'><b>Choose Image:</b></label>
                  <Field className='upload-image'  >
                    {({ field, form, meta }) => (
                      <div>
                        <input
                          value={field.value.name}
                          name={field.name}
                          type='file'
                          accept='image/*'
                          onChange={e => {
                            form.setFieldValue("image", e.target.files[0]);
                          }}
                          onBlur={form.handleBlur("image")}
                        />
                      </div>
                    )}
                  </Field>
                  <div className="error">
                    <ErrorMessage name="image" />
                  </div>
                </div>
              </Col>
            </Row>
            <Field >
              {({ form }) => (
                <div className="place-items-center">
                  {
                    exceptionMsg &&
                    <div class="my-custom-p2 alert alert-danger container-fluid overflow-auto" style={{ maxHeight: "100px" }} role="alert">
                      <InfoSvg />
                      {exceptionMsg}</div>
                  }

                  <div className='p-2'>
                    <Button type="submit" disabled={form.isSubmitting}>Submit</Button>
                  </div>
                  {form.isSubmitting === true &&
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  }
                </div>
              )}
            </Field>
          </Container>
        </Form>
      </Formik>
      <MFooter />
    </React.Fragment >

  );
};