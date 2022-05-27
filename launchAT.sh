#!/bin/sh

#
# This script launches the integration tests against a running instance of the target application.
# The test are launched using the newman Postman CLI tool, and their definition is stored in
# acceptance.postman.json
#

TARGET_HOST=${TARGET_HOST:-localhost}
echo "Target Host: ${TARGET_HOST}"

newman run acceptance.postman.json --env-var "targetHost=${TARGET_HOST}"
if [ $? != 0 ]; then
    echo "TEST_FAILURE"
else
    echo "TEST_SUCCESS"
fi

sleep 1h