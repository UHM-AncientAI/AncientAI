// imports/api/transcriptions.js
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

class TranscriptionsCollection {
  constructor() {
    this.name = 'TranscriptionsCollection';
    this.collection = new Mongo.Collection(this.name);
  }
}

/**
 * The singleton instance of the TranscriptionsCollection.
 * @type {TranscriptionsCollection}
 */

export const Transcriptions = new TranscriptionsCollection();

if (Meteor.isServer) {
  Meteor.methods({
    'transcriptions.insert'(text, fileName) {
      return Transcriptions.insert({
        text,
        fileName,
        createdAt: new Date(),
      });
    },

    'transcriptions.getAll'() {
      return Transcriptions.find({}, { sort: { createdAt: -1 } }).fetch();
    },

    'transcriptions.getById'(id) {
      return Transcriptions.findOne(id);
    },
  });
}
