module.exports = [
	{
		files: ['**/*.js'],
		rules: {
			semi : 'error',
			quotes: ['error', 'single'],
			indent: ['error', 'tab'],
			'sort-imports': ['error', {
				'ignoreCase': false,
				'ignoreDeclarationSort': false,
				'ignoreMemberSort': false,
				'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
				'allowSeparatedGroups': false
			}]
		}
	}
];