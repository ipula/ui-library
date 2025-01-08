export default {
	itemsMax: 2,
	items: [
		{
			id: 1,
			status: 'PENDING',
			createdAt: '2024-09-10T20:31:10.000000Z',
			updatedAt: '2024-09-10T20:31:15.000000Z',
			userId: null,
			contextId: 1,
			expiryDate: '2024-09-13T20:31:13.000000Z',
			email: 'test@mailinator.com',
			inviterId: 1,
			orcid: null,
			givenName: {en: 'Test', fr_CA: 'Test_fr'},
			familyName: {en: 'Test', fr_CA: 'Test_fr'},
			affiliation: null,
			country: null,
			emailSubject: null,
			emailBody: null,
			userGroupsToAdd: [
				{
					userGroupId: 2,
					userGroupName: 'Journal manager',
					masthead: true,
					dateStart: '2024-09-10',
					dateEnd: null,
				},
			],
			userGroupsToRemove: [],
			username: null,
			sendEmailAddress: 'journalmanager@mailinator.com',
			newUser: {
				email: 'test@mailinator.com',
				fullName: 'Test Test',
				familyName: null,
				givenName: null,
				country: null,
				affiliation: null,
				orcid: null,
			},
			existingUser: null,
		},
		{
			id: 2,
			status: 'PENDING',
			createdAt: '2024-09-10T20:24:53.000000Z',
			updatedAt: '2024-09-10T20:25:04.000000Z',
			userId: 35,
			contextId: 1,
			expiryDate: '2024-09-13T20:25:02.000000Z',
			email: null,
			inviterId: 1,
			orcid: null,
			givenName: null,
			familyName: null,
			affiliation: null,
			country: null,
			emailSubject: null,
			emailBody: null,
			userGroupsToAdd: [
				{
					userGroupId: 16,
					userGroupName: 'Reviewer',
					masthead: true,
					dateStart: '2024-09-10',
					dateEnd: null,
				},
			],
			userGroupsToRemove: [
				{
					userGroupId: 9,
					userGroupName: 'Funding coordinator',
					masthead: null,
					dateStart: null,
					dateEnd: null,
				},
			],
			username: null,
			sendEmailAddress: 'zwoods@mailinator.com',
			newUser: null,
			existingUser: {
				email: 'zwoods@mailinator.com',
				fullName: 'Zita Woods',
				familyName: {
					en: 'Woods',
				},
				givenName: {
					en: 'Zita',
				},
				country: 'US',
				affiliation: {
					en: 'CUNY',
				},
			},
		},
	],
};
