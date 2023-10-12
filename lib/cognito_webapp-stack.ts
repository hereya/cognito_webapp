import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CfnParameter } from 'aws-cdk-lib';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CognitoWebappStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const userPoolIdParam = new CfnParameter(this, 'userPoolId', {
      type: 'String',
      description: 'The id of the user pool',
    });

    const userPool = UserPool.fromUserPoolId(this, 'UserPool', userPoolIdParam.valueAsString);

    // Create an app client in the existing User Pool
    const userPoolClient = new UserPoolClient(this, 'MyUserPoolClient', {
      userPool,
      generateSecret: true,
    });

    // Export the User Pool Client ID
    new cdk.CfnOutput(this, 'clientId', {
      value: userPoolClient.userPoolClientId,
      description: 'The Client ID of the app client',
    });
  }
}
