# Acceptance Test runner - Example App with NodeJS

Minimal implementation of an acceptance test runner using Postman [newman]() to run a test scenario against the deployed application.

Visit the [documentation](https://github.com/napptive/example-app-nodejs) for more information.

## Using the runner

The runner will execute a series of tests and will print

```
TEST_FAILURE
```

or

```
TEST_SUCCESS
```

depending on the test outcome. The runner will remain alive for 1 hour to enable external integrations checking the result before shutting down the application.

## License

 Copyright 2022 Napptive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.