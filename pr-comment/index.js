const { Toolkit } = require("actions-toolkit");
const tools = new Toolkit();
const octokit = tools.createOctokit();

const fs = require("fs");
const eventJSON = tools.context.payload;
const number = eventJSON.pull_request.number;

const commentBody = `
This is LambdaBot 🤖. I see that this PR has been merged into Master. I can help deploy the changes for you to AWS Lambda.

If you wish for my help, type !deploy as a new comment on this PR. Only users with push access to the repo will be allowed to push to Lambda.
`;

const params = tools.context.repo({ number, body: commentBody });
octokit.issues.createComment(params);
