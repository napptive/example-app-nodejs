# Example App with NodeJS

Example application to illustrate different CI/CD integrations with the Napptive Platform. 

Visit the [documentation](https://github.com/napptive/example-app-nodejs) for more information.

## Endpoints

The following REST endpoints are provided:

```
GET /healthz
GET /todos
POST /todos/add?item=<text>
POST /todos/done?id=<item_identifier>
POST /todos/remove?id=<item_identifier>
```

The /healthz endpoint returns 200 OK on every call, and can be used to illustrate how to setup status monitoring hooks. The other endpoints provide a list of all items (`/todos`), an endpoint to add a new item (`/todos/add`), another to mark an item as done (`/todos/done`), and finally an endpoint to remove a single item from the list (`/todos/remove`).

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