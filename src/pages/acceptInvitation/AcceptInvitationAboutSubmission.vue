<template>
	<div>
		<div class="border-t border-light p-8">
			<div class="p-4">
				<FormDisplayItemBasic
					heading-element="h4"
					heading="Title"
					value="Is blended e-learning as measured by an achievement test and self-assessment better than traditional classroom learning for vocational high school students? "
				></FormDisplayItemBasic>
			</div>
			<div class="p-4">
				<FormDisplayItemBasic
					heading-element="h4"
					heading="Abstract"
					value="The purpose of this study is to examine the effects of blended e-learning on electrical machinery performance (achievement test and self-assessment). Participants were two classes of 11th graders majoring in electrical engineering and taking the electrical machinery class at a vocational high school in Taiwan. The participants were randomly selected and assigned to either the experimental group (n = 33) which studied through blended e-learning or the control group (n = 32) which studied through traditional classroom learning. The experiment lasted for five weeks. The results showed that (a) there were no significant differences in achievement test scores between blended e-learning and traditional learning; (b) students in the experimental group obtained significantly higher scores on self-assessment than students in the control group; (c) students’ scores on self-assessment were significantly higher after studying through blended e-learning than before. Overall, blended e-learning did not significantly affect students’ achievement test scores, but significantly affected their self-assessment scores."
				></FormDisplayItemBasic>
			</div>
		</div>
		<div class="border-t border-light p-8">
			<div class="flex items-center p-4">
				<h3>{{ t('manager.roles') }}</h3>
			</div>
			<FormDisplayItemBasic
				heading-element="h4"
				heading="Review Response Date"
				value="2025.08.15"
			></FormDisplayItemBasic>
			<FormDisplayItemBasic
				heading-element="h4"
				heading="Review Due Date"
				value="2025.08.30"
			></FormDisplayItemBasic>
		</div>
	</div>
</template>

<script setup>
import {useLocalize} from '@/composables/useLocalize';
import FormDisplayItemBasic from '@/components/FormDisplay/FormDisplayItemBasic.vue';

const {t} = useLocalize();
</script>
