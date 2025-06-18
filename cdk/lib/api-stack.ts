import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { aws_apigateway as apigateway } from 'aws-cdk-lib';
import * as path from 'path';

export class ApiStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		const lambdaFunction = new lambdaNodejs.NodejsFunction(
			this,
			'NestLambdaHandler',
			{
				runtime: lambda.Runtime.NODEJS_20_X,
				entry: path.join(__dirname, '../../backend/dist/lambda/main.ts'), // relative to this file
				handler: 'handler',
				bundling: {
					externalModules: ['aws-sdk'],
				},
			}
		);

		new apigateway.LambdaRestApi(this, 'NestApiGateway', {
			handler: lambdaFunction,
			restApiName: 'NestJS Lambda API',
			description: 'API Gateway for NestJS app running in Lambda',
		});
	}
}
