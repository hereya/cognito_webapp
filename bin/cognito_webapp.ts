#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CognitoWebappStack } from '../lib/cognito_webapp-stack';

const app = new cdk.App();
new CognitoWebappStack(app, process.env.STACK_NAME!);
