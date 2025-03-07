import { Meteor } from 'meteor/meteor';
import { Collections } from '../../api/collections/Collections.js';

/* eslint-disable no-console */

// Initialize the Collections with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Collections.collection.insert(data);
};

if (Collections.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data for Collections.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
} else {
  console.log('Resetting Collections and inserting default data...');
  Collections.collection.remove({});

  // **Insert default data if available in settings**
  if (Meteor.settings.defaultData && Array.isArray(Meteor.settings.defaultData)) {
    Meteor.settings.defaultData.forEach(data => addData(data));
    console.log('Default data inserted.');
  } else {
    console.log('No default data found in Meteor.settings.');
  }
}
