import { Meteor } from 'meteor/meteor';
import { Database } from '../../api/database/Database.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Database.collection.insert(data);
};

if (Database.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data for database.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
} else {
  console.log('Resetting database and inserting default data...');
  Database.collection.remove({});

  // **Insert default data if available in settings**
  if (Meteor.settings.defaultData && Array.isArray(Meteor.settings.defaultData)) {
    Meteor.settings.defaultData.forEach(data => addData(data));
    console.log('Default data inserted.');
  } else {
    console.log('No default data found in Meteor.settings.');
  }
}
