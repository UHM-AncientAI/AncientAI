// imports/api/transcriptions.js
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The TranscriptionsCollection. It encapsulates state and variable values for transcription.
 */
class TranscriptionsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'TranscriptionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      title: String,
      author: String,
      date:
          { type: Date,
            label: 'Date',
          },
      text: String,
      owner: String,
      createdAt: {
        type: Date,
        defaultValue: new Date(),
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the TranscriptionsCollection.
 * @type {TranscriptionsCollection}
 */

export const Transcriptions = new TranscriptionsCollection();
