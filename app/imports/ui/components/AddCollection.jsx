import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Collections } from '../../api/collections/Collections';
import { Transcriptions } from '../../api/transcriptions/Transcriptions';

const formSchema = new SimpleSchema({
  title: String,
  description: String,
  timePeriod: String,
  authors: String,
  location: String,
  owner: String,
  transcriptions: {
    type: Array,
    optional: true,
  },
  'transcriptions.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddCollection = () => {
  const [transcription, setTranscriptions] = useState([]);
  let fRef;

  useEffect(() => {
    // Fetch all transcriptions when the component mounts
    const transcriptionsData = Transcriptions.collection.find().fetch();
    setTranscriptions(transcriptionsData);
  }, []);

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, description, timePeriod, authors, location, transcriptions } = data;
    const owner = Meteor.user().username;
    Collections.collection.insert(
      { title, description, timePeriod, authors, location, owner, transcriptions },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Collection added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  // let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Collection</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="title" />
                <TextField name="description" />
                <TextField name="timePeriod" />
                <TextField name="authors" />
                <TextField name="location" />
                <SelectField
                  name="transcriptions"
                  options={transcription.map(t => ({
                    label: t.title,
                  }))}
                  multiple
                />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCollection;
