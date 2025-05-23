import {getSubmissionMock} from '../../../mockFactories/submissionMock';
import {getReviewRoundMock} from '../../../mockFactories/reviewRoundsMock';
import {getReviewAssignmentShortMock} from '../../../mockFactories/reviewAssignmentsMock';

export const EditorialActivityScenario = [
	// Incomplete
	getSubmissionMock({
		id: 1,
		stageId: pkp.const.WORKFLOW_STAGE_ID_SUBMISSION,
		submissionProgress: true,
	}),
	// Declined
	getSubmissionMock({
		id: 2,
		stageId: pkp.const.WORKFLOW_STAGE_ID_SUBMISSION,
		status: pkp.const.STATUS_DECLINED,
	}),
	// Submission stage
	getSubmissionMock({
		id: 3,
		stageId: pkp.const.WORKFLOW_STAGE_ID_SUBMISSION,
	}),
	// Submission page - assign editor
	getSubmissionMock({
		id: 4,
		stageId: pkp.const.WORKFLOW_STAGE_ID_SUBMISSION,
		editorAssigned: false,
	}),

	// Review stage
	// REVIEW_ROUND_STATUS_REVISIONS_REQUESTED
	getSubmissionMock({
		id: 5,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_RECEIVED,
				recommendation:
					pkp.const.SUBMISSION_REVIEWER_RECOMMENDATION_PENDING_REVISIONS,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_REVISIONS_REQUESTED,
			}),
		],
	}),
	//REVIEW_ROUND_STATUS_RESUBMIT_FOR_REVIEW
	getSubmissionMock({
		id: 6,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_RECEIVED,
				recommendation:
					pkp.const.SUBMISSION_REVIEWER_RECOMMENDATION_PENDING_REVISIONS,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_RESUBMIT_FOR_REVIEW,
			}),
		],
	}),
	// REVIEW_ROUND_STATUS_ACCEPTED
	// -- Does not happen as its moved to next stage
	// REVIEW_ROUND_STATUS_DECLINED
	getSubmissionMock({
		id: 7,
		status: pkp.const.STATUS_DECLINED,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_DECLINED,
			}),
		],
	}),
	// REVIEW_ROUND_STATUS_PENDING_REVIEWERS
	getSubmissionMock({
		id: 8,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [],
		reviewRounds: [getReviewRoundMock()],
	}),
	// REVIEW_ROUND_STATUS_PENDING_REVIEWS
	getSubmissionMock({
		id: 9,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_ACCEPTED,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_PENDING_REVIEWS,
			}),
		],
	}),
	// REVIEW_ROUND_STATUS_REVIEWS_READY
	getSubmissionMock({
		id: 10,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_RECEIVED,
				dateCompleted: '2024-01-20',
				recommendation:
					pkp.const.SUBMISSION_REVIEWER_RECOMMENDATION_RESUBMIT_HERE,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_REVIEWS_READY,
			}),
		],
	}),
	// REVIEW_ROUND_STATUS_REVIEWS_COMPLETED
	getSubmissionMock({
		id: 11,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_REVIEWS_COMPLETED,
			}),
		],
	}),
	// REVIEW_ROUND_STATUS_REVIEWS_OVERDUE
	getSubmissionMock({
		id: 12,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_RESPONSE_OVERDUE,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_REVIEWS_OVERDUE,
			}),
		],
	}),
	// REVIEW_ROUND_STATUS_REVISIONS_SUBMITTED
	getSubmissionMock({
		id: 13,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_RECEIVED,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_REVISIONS_SUBMITTED,
			}),
		],
	}),
	// REVIEW_ROUND_STATUS_RESUBMIT_FOR_REVIEW_SUBMITTED
	getSubmissionMock({
		id: 14,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_RECEIVED,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_RESUBMIT_FOR_REVIEW_SUBMITTED,
			}),
		],
	}),
	// REVIEW_ROUND_STATUS_RETURNED_TO_REVIEW
	getSubmissionMock({
		id: 15,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_RECEIVED,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_RETURNED_TO_REVIEW,
			}),
		],
	}),

	// REVIEW_ROUND_STATUS_PENDING_RECOMMENDATIONS
	getSubmissionMock({
		id: 16,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_RECEIVED,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_PENDING_RECOMMENDATIONS,
			}),
		],
	}),
	// REVIEW_ROUND_STATUS_RECOMMENDATIONS_READY
	getSubmissionMock({
		id: 17,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_RECOMMENDATIONS_READY,
			}),
		],
	}),
	// REVIEW_ROUND_STATUS_RECOMMENDATIONS_COMPLETED
	getSubmissionMock({
		id: 18,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_RECEIVED,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_RECOMMENDATIONS_COMPLETED,
			}),
		],
	}),
	// Recommend only editor provided recommendation
	getSubmissionMock({
		id: 19,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		stages: [
			{
				id: 3,
				currentUserRecommendation: {decision: 3, label: 'Accept'},
			},
		],
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
			}),
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_RECEIVED,
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_RECOMMENDATIONS_COMPLETED,
			}),
		],
	}),
	// Open review assignments
	getSubmissionMock({
		id: 20,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EXTERNAL_REVIEW,
		reviewAssignments: [
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
				reviewMethod: pkp.const.SUBMISSION_REVIEW_METHOD_OPEN,
			}),
			getReviewAssignmentShortMock({
				statusId: pkp.const.REVIEW_ASSIGNMENT_STATUS_COMPLETE,
				reviewMethod: pkp.const.SUBMISSION_REVIEW_METHOD_OPEN,
				reviewerId: 11,
				reviewerFullName: 'Paul Hudson',
				reviewerDisplayInitials: 'PH',
			}),
		],
		reviewRounds: [
			getReviewRoundMock({
				statusId: pkp.const.REVIEW_ROUND_STATUS_REVIEWS_COMPLETED,
			}),
		],
	}),
	// Editorial stage
	getSubmissionMock({
		id: 21,
		stageId: pkp.const.WORKFLOW_STAGE_ID_EDITING,
		stages: [
			{
				id: pkp.const.WORKFLOW_STAGE_ID_EDITING,
				uploadedFilesCount: 1,
			},
		],
	}),
	// Production stage
	getSubmissionMock({
		id: 22,
		stageId: pkp.const.WORKFLOW_STAGE_ID_PRODUCTION,
	}),
	// Scheduled
	getSubmissionMock({
		id: 23,
		stageId: pkp.const.WORKFLOW_STAGE_ID_PRODUCTION,
		status: pkp.const.STATUS_SCHEDULED,
		issueToBePublished: {
			id: 2,
			label: 'Vol. 2 No. 1 (2015)',
		},
	}),
	// Published
	getSubmissionMock({
		id: 24,
		stageId: pkp.const.WORKFLOW_STAGE_ID_PRODUCTION,
		status: pkp.const.STATUS_PUBLISHED,
	}),
];
