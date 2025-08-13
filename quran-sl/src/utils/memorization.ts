export type MemorizationStage = 'new' | 'learning' | 'review' | 'mastered';

export function nextIntervalDays(stage: MemorizationStage, correct: boolean): number {
	if (!correct) return 0; // repeat today
	switch (stage) {
		case 'new':
			return 1;
		case 'learning':
			return 3;
		case 'review':
			return 7;
		case 'mastered':
			return 30;
		default:
			return 1;
	}
}