import {defineComponentStore} from '@/utils/defineComponentStore';
import {useApiUrl} from '@/composables/useApiUrl';
import {useUrl} from '@/composables/useUrl';
import {useAnnouncer} from '@/composables/useAnnouncer';
import {useTranslation} from '@/composables/useTranslation';
import {useFetchPaginated} from '@/composables/useFetchPaginated';
import {ref, watch} from 'vue';
import {useUserAccessManagerActions} from './useUserAccessManagerActions';

export const useUserAccessManagerStore = defineComponentStore(
	'userAccessManager',
	() => {
		const {t} = useTranslation();
		/** Announcer */

		const {announce} = useAnnouncer();

		/**
		 * Get users with paginations
		 */
		const userAccessCount = ref(0);

		const countPerPage = ref(25);
		const currentPage = ref(1);
		async function setCurrentPage(_currentPage) {
			currentPage.value = _currentPage;
		}

		const searchPhrase = ref('');
		async function setSearchPhrase(val) {
			searchPhrase.value = val;
		}

		const {apiUrl} = useApiUrl('users');
		const {
			items: userList,
			pagination: userAccessPagination,
			isLoading: isUserAccessLoading,
			fetch: fetchUserList,
		} = useFetchPaginated(apiUrl, {
			currentPage,
			pageSize: countPerPage,
			query: {
				searchPhrase: searchPhrase,
				status: 'all',
				includePermissions: true,
			},
		});
		watch(
			[currentPage, searchPhrase],
			async () => {
				announce(t('common.loading'));
				await fetchUserList();
				announce(t('common.loaded'));
			},
			{immediate: true},
		);

		async function triggerDataChangeCallback() {
			await fetchUserList();
		}

		/**
		 * Actions
		 */

		/*
		 * redirect to send invitation page
		 */
		const {pageUrl: sendInvitationPageUrl} = useUrl('invitation/editUser');
		function editUser(userObj) {
			window.location = sendInvitationPageUrl.value + '/' + userObj.id;
		}
		const _userAccessActionsFns = useUserAccessManagerActions();
		function getItemActions(userObj) {
			return _userAccessActionsFns.getItemActions(userObj);
		}

		function sendEmail(userObj) {
			_userAccessActionsFns.sendEmail(userObj.id, triggerDataChangeCallback);
		}

		function disableUser(userObj) {
			_userAccessActionsFns.disableUser(userObj, triggerDataChangeCallback);
		}

		function removeUser(userObj) {
			_userAccessActionsFns.removeUser(userObj.id, triggerDataChangeCallback);
		}

		function mergeUser(userObj) {
			_userAccessActionsFns.mergeUser(userObj.id, triggerDataChangeCallback);
		}

		function loginAs(userObj) {
			_userAccessActionsFns.loginAs(userObj.id);
		}

		return {
			userAccessCount,
			setCurrentPage,
			currentPage,
			userAccessPagination,
			userList,
			isUserAccessLoading,
			setSearchPhrase,
			sendEmail,
			disableUser,
			removeUser,
			mergeUser,
			loginAs,
			getItemActions,
			editUser,
		};
	},
);