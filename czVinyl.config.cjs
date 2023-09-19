const czvinylConfig = {
  headerFormat: '{type}: [{ticket_id}] {emoji} {subject}',
  skipTicketId: false,
  skipBody: true,
  subjectMaxLength: 140,
  subjectMinLength: 3,
  scopes: [],
  allowEmptyTicketIdForBranches: [],
  ticketIdQuestion:
    'Enter the issue id preceded by the letter T and a - (ex. T-0):',
  commitTypes: [
    {
      description: 'A new feature',
      emoji: '🔥',
      value: 'feat',
    },
    {
      description: 'A bug fix',
      emoji: '🐞',
      value: 'fix',
    },
    {
      description: 'Documentation only changes',
      emoji: '📘',
      value: 'docs',
    },
    {
      description: 'Markup, white-space, formatting, missing semi-colons...',
      emoji: '🎨',
      value: 'style',
    },
    {
      description: 'A code change that neither fixes a bug or adds a feature',
      emoji: '💡',
      value: 'refactor',
    },
    {
      description: 'A code change that improves performance',
      emoji: '⚡',
      value: 'perf',
    },
    {
      description:
        'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
      emoji: '🚀',
      value: 'ci',
    },
    {
      description: 'Build process or auxiliary tool changes',
      emoji: '🤖',
      value: 'chore',
    },
    {
      description: 'Create a release commit',
      emoji: '🔖',
      value: 'release',
    },
    {
      description: 'Adding missing tests or correcting existing tests',
      emoji: '✅',
      value: 'test',
    },
  ],
};

module.exports = czvinylConfig;
