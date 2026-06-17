import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		queries: [context.getNodeParameter('query', itemIndex)],
		maxResultsPerQuery: context.getNodeParameter('maxResultsPerQuery', itemIndex),
		gl: context.getNodeParameter('gl', itemIndex),
		hl: context.getNodeParameter('hl', itemIndex),
	};
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Image',
				value: 'image',
			},
		],
		default: 'image',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['image'],
			},
		},
		options: [
			{
				name: 'Search',
				value: 'search',
				action: 'Search images',
				description: 'Search Google Images and return one item per image',
			},
		],
		default: 'search',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Search Query',
		name: 'query',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. golden retriever puppy',
		description: 'The query to search images for',
		displayOptions: { show: { resource: ['image'], operation: ['search'] } },
	},
	{
		displayName: 'Country Code',
		name: 'gl',
		type: 'string',
		default: 'us',
		placeholder: 'e.g. us',
		description: 'Two-letter country code the search runs from',
		displayOptions: { show: { resource: ['image'], operation: ['search'] } },
	},
	{
		displayName: 'Language Code',
		name: 'hl',
		type: 'string',
		default: 'en',
		placeholder: 'e.g. en',
		description: 'Two-letter language code for the results',
		displayOptions: { show: { resource: ['image'], operation: ['search'] } },
	},
	{
		displayName: 'Maximum Results per Query',
		name: 'maxResultsPerQuery',
		type: 'number',
		default: 100,
		typeOptions: { minValue: 1 },
		description: 'How many images to return',
		displayOptions: { show: { resource: ['image'], operation: ['search'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['image'], operation: ['search'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces for each image',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact set of the most useful image fields',
			},
		],
		default: 'simplified',
		description: 'How much data to return for each image',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['image'], operation: ['search'], output: ['selected'] },
		},
		options: [
			{ name: 'Domain', value: 'domain' },
			{ name: 'Google URL', value: 'googleUrl' },
			{ name: 'Image Height', value: 'imageHeight' },
			{ name: 'Image URL', value: 'imageUrl' },
			{ name: 'Image Width', value: 'imageWidth' },
			{ name: 'Link', value: 'link' },
			{ name: 'Position', value: 'position' },
			{ name: 'Query', value: 'query' },
			{ name: 'Source', value: 'source' },
			{ name: 'Thumbnail Height', value: 'thumbnailHeight' },
			{ name: 'Thumbnail URL', value: 'thumbnailUrl' },
			{ name: 'Thumbnail Width', value: 'thumbnailWidth' },
			{ name: 'Title', value: 'title' },
		],
		default: ['title', 'imageUrl', 'source', 'link'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
