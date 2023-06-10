const _ = require('lodash');
const wrap = require('word-wrap');
const commitizen = require('commitizen');

function createQuestions(config) {
    config.maxSubjectLength = config.maxSubjectLength || 140;

    const types = [
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
			description: 'A code change that neither fixes a bug or adds a feature',
			emoji: '💡',
			value: 'refactor'
		},
		{
			description: 'A code change that improves performance',
			emoji: '⚡',
			value: 'perf'
		},
		{
			description: 'CI related changes',
			emoji: '🚀',
			value: 'ci'
		},
		{
			description: 'Build process or auxiliary tool changes',
			emoji: '🤖',
			value: 'chore'
		},
		{
			description: 'Create a release commit',
			emoji: '🔖',
			value: 'release'
		},
		{
			description: 'Adding missing tests or correcting existing tests',
			emoji: '✅',
			value: 'test'
		}
	];

    const length = 15;
    const choices = _.map(types, (type) => ({
        name: `${_.padEnd(`${type.emoji}  ${type.value}:`, length)} ${type.description}`,
        value: type
    }));

    return [
        {
            type: 'list',
            name: 'type',
            message: "Select the type of change that you're committing:",
            choices
        },
		{
			type: 'input',
			name: 'prefix',
			message: 'Enter the problem ID preceded by the letters CV and a - (ex. CV-1):'
		},
        {
            type: 'input',
            name: 'subject',
            message: `Write a short, imperative tense description of the change (max header length: ${config.maxSubjectLength}):\n`
        },
    ];
}

/**
 * Format the git commit message from given answers.
 *
 * @param {Object} answers Answers provide user
 * @param {Object} config Config specified in package.json
 *
 * @return {String} Formatted git commit message
 */

function format(answers, config) {
    const type = answers.type;
    const prefix = `[${answers.prefix}]`;
    const emoji = type.emoji;
    const typeValue = type.value;
    const subject = answers.subject.trim();

    return `${typeValue}: ${prefix} ${emoji} ${subject}`;
}

module.exports = {
    prompter: (cz, commit) => {
        const config = commitizen.configLoader.load();
		const questions = createQuestions(config);
        cz.prompt(questions)
            .then(answers => format(answers, config))
            .then(commit);
    }
};
  

/* module.exports = function (cz, commit) {
	cz.prompt([
	  {
		type: 'input',
		name: 'issues',
		message: 'List any issues closed by this change:',
	  },
	  {
		type: 'input',
		name: 'message',
		message: 'Write a short, imperative mood description of the change:',
	  },
	]).then((answers) => {
	  commit(`${answers.issues}: ${answers.message}`);
	});
  };
 */


/* const czvinylConfig = {
	headerFormat: '{type}: [{ticket_id}] {emoji} {subject}',
	skipTicketId: false,
	skipBody: true,
	subjectMaxLength: 140,
	subjectMinLength: 3,
	scopes: [],
	allowEmptyTicketIdForBranches: [],
	ticketIdQuestion: 'Enter the issue id preceded by the letter W and a - (ex. W-12):',
	commitTypes: [
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
			description: 'A code change that neither fixes a bug or adds a feature',
			emoji: '💡',
			value: 'refactor'
		},
		{
			description: 'A code change that improves performance',
			emoji: '⚡',
			value: 'perf'
		},
		{
			description: 'CI related changes',
			emoji: '🚀',
			value: 'ci'
		},
		{
			description: 'Build process or auxiliary tool changes',
			emoji: '🤖',
			value: 'chore'
		},
		{
			description: 'Create a release commit',
			emoji: '🔖',
			value: 'release'
		},
		{
			description: 'Adding missing tests or correcting existing tests',
			emoji: '✅',
			value: 'test'
		}
	]
};

module.exports = czvinylConfig;
 */