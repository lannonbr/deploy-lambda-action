#!/bin/sh

set -e

message=$(jq -r .comment.body "$GITHUB_EVENT_PATH")
echo "$message" | grep -Eq "!deploy" || {
  echo "Didn't contain !deploy. neutral exit..."
  exit 78
}

npm i

echo "LS:"
ls .

zip -r lambda.zip *

AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION} aws \
  lambda update-function-code \
  --function-name "${AWS_LAMBDA_NAME}" \
  --zip-file fileb://lambda.zip