const { Toolkit } = require("actions-toolkit");
const tools = new Toolkit();
const octokit = tools.createOctokit();

const fs = require("fs");

let eventJSON = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH));

number = eventJSON.number;

const { owner, repo } = process.env.GITHUB_REPOSITORY;

const commentBody = `
This is LambdaBot 🤖. I see that this PR has been merged into Master. I can help deploy the changes for you to AWS Lambda.

If you wish for my help, type !deploy as a new comment on this PR. Only users with push access to the repo will be allowed to push to Lambda.
`;

octokit.issues.createComment({ owner, repo, number, body: commentBody });
