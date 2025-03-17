import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, DateField, TextField, LongTextField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
// import { useTracker } from 'meteor/react-meteor-data';
import OCRUploader from '../components/OCRUploader';
import { Transcriptions } from '../../api/transcription/Transcription';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: String,
  author: String,
  date: {
    type: Date,
    label: 'Date',
    defaultValue: new Date(new Date().setHours(14, 1, 0, 0)),
  },
  text: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Render an OCR Uploader page. */
const UploadFile = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: '',
    text: '',
  });

  // Handle OCR result from OCRUploader
  const handleOcrResult = (extractedText) => {
    setFormData(prevData => ({
      ...prevData,
      text: extractedText,
    }));
  };

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, author, date, text } = data;
    const owner = Meteor.user().username;
    Transcriptions.collection.insert(
      { title, author, date, text, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2>Upload File</h2>
          <OCRUploader onTranscriptionComplete={handleOcrResult} />

          <h2 className="mt-4">Add Transcription</h2>
          <AutoForm
            ref={ref => { fRef = ref; }}
            schema={bridge}
            onSubmit={data => submit(data, fRef)}
            // model={formData}
            // onChange={(model) => setFormData(model)}
          >
            <Card>
              <Card.Body>
                <TextField name="title" />
                <TextField name="author" />
                <DateField name="date" />
                <LongTextField name="text" rows={8} />
                <SubmitField value="Submit" className="mt-3" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadFile;
