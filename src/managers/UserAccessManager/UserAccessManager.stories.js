import UserAccessManager from './UserAccessManager.vue';
import {http, HttpResponse} from 'msw';
import invitationMock from './mocks/UserAccessMock.js';

export default {
	title: 'Managers/UserAccessManager',
	component: UserAccessManager,
};

export const Init = {
	render: (args) => ({
		components: {UserAccessManager},
		setup() {
			return {args};
		},
		template: '<UserAccessManager v-bind="args"/>',
	}),
	parameters: {
		msw: {
			handlers: [
				http.get(
					'https://mock/index.php/publicknowledge/api/v1/invitations',
					async ({request}) => {
						const url = new URL(request.url);
						const offset = parseInt(url.searchParams.get('offset') || 0);
						const count = parseInt(url.searchParams.get('count'));
						const invitations = invitationMock.items.slice(
							offset,
							offset + count,
						);

						return HttpResponse.json({
							itemsMax: invitationMock.itemsMax,
							items: invitations,
						});
					},
				),
				http.post(
					'https://mock/index.php/publicknowledge/api/v1/invitations/1/cancel',
					async ({request}) => {
						return HttpResponse.json({
							request,
						});
					},
				),
			],
		},
	},
	args: [],
};
