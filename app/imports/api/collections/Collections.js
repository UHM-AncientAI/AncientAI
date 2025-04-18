import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The Collections Database.
 * It encapsulates state and variable values for the collection database.
 */
class CollectionsDatabase {
  constructor() {
    // The name of this collection.
    this.name = 'CollectionsDatabase';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      title: String,
      description: String,
      startYear: Number,
      endYear: { type: Number, optional: true },
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
 * The singleton instance of the Collections Database.
 * @type {CollectionsDatabase}
 */
export const Collections = new CollectionsDatabase();
