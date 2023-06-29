const commitTypeRegex = /breaking|chore|ci|docs|feat|fix|perf|refactor|release|style|test/;

const commitEmojiRegex =
	/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

const commitTicketIdRegex = /(\[((((?<!([A-Z]{1,10})-?)[A-Z]+-\d+)))\])/;
const commitMessageRegex = /([^\s]+\s)*[^\s]+/;

const commitRegex = new RegExp(
	`^(${commitTypeRegex.source}): (${commitEmojiRegex.source} )?(${commitTicketIdRegex.source} )?(${commitMessageRegex.source})$`
);

const defaultCommitTypes = [
	{
		description: 'A new feature',
		emoji: '🔥',
		value: 'feat'
	},
	{
		description: 'A bug fix',
		emoji: '🐞',
		value: 'fix'
	},
	{
		description: 'A code change that neither fixes a bug or adds a feature',
		emoji: '💡',
		value: 'refactor'
	},
	{
		description: 'Build process or auxiliary tool changes',
		emoji: '🤖',
		value: 'chore'
	},
	{
		description: 'Documentation only changes',
		emoji: '📘',
		value: 'docs'
	},
	{
		description: 'Markup, white-space, formatting, missing semi-colons...',
		emoji: '🎨',
		value: 'style'
	},
	{
		description: 'A code change that improves performance',
		emoji: '⚡',
		value: 'perf'
	},
	{
		description: 'Adding missing tests or correcting existing tests',
		emoji: '✅',
		value: 'test'
	},
	{
		description: 'CI related changes',
		emoji: '🚀',
		value: 'ci'
	},
	{
		description: 'Create a release commit',
		emoji: '🔖',
		value: 'release'
	}
];

const config = {
	plugins: [
		{
			rules: {
				'header-match-team-pattern': (parsed) => {
					const { header } = parsed;

					if (!commitRegex.test(header)) {
						return [
							false,
							"header must be in format '<type>: <emoji?> <ticket?> <subject>\nexample => ci: 🚀 [V-123] example\n"
						];
					}

					return [true, ''];
				},
				'explained-emoji-enum': (parsed, _when, commitTypes) => {
					const { header } = parsed;

					const emojiInHeader = header.match(commitEmojiRegex);

					if (!emojiInHeader) {
						return [true, ''];
					}

					const isEmojiInArray = commitTypes.findIndex((commitType) => commitType.emoji === emojiInHeader[0]) !== -1;

					if (!isEmojiInArray) {
						const messageArray = commitTypes.map((commitType) => `${commitType.emoji} - ${commitType.description}`);

						return [false, `emoji must be one of:\n${messageArray.join('\n')}`];
					}

					return [true, ''];
				}
			}
		}
	],
	rules: {
		'header-match-team-pattern': [2, 'always'],
		'explained-emoji-enum': [2, 'always', defaultCommitTypes],
		'body-leading-blank': [2, 'always'],
		'body-max-line-length': [2, 'always', 150],
		'footer-leading-blank': [2, 'always'],
		'footer-max-line-length': [2, 'always', 150],
		'header-max-length': [2, 'always', 150],
		'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
		'scope-empty': [2, 'always']
	}
};

module.exports = config;
