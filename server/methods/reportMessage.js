import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Messages } from '../../app/models/server';
import { Reports } from '../../app/models/server/raw';

Meteor.methods({
	async reportMessage(messageId, description) {
		check(messageId, String);
		check(description, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'reportMessage',
			});
		}

		if (description == null || description.trim() === '') {
			throw new Meteor.Error('error-invalid-description', 'Invalid description', {
				method: 'reportMessage',
			});
		}

		const message = Messages.findOneById(messageId);
		if (!message) {
			throw new Meteor.Error('error-invalid-message_id', 'Invalid message id', {
				method: 'reportMessage',
			});
		}

		await Reports.createWithMessageDescriptionAndUserId(message, description, Meteor.userId());

		return true;
	},
});
