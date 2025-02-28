import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The DatabaseCollection.
 * It encapsulates state and variable values for the collection database.
 */
class DatabaseCollection {
  constructor() {
    // The name of this collection.
    this.name = 'DatabaseCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      title: String,
      description: String,
      pages: Number,
      timePeriod: String,
      authors: String,
      location: String,
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {DatabaseCollection}
 */
export const Database = new DatabaseCollection();
