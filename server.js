/**
 *  Copyright 2022 Napptive
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const express = require('express');

const healthRoute = require('./routes/healthcheck.js');
const apiRoute = require('./routes/api.js');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Create base app
const app = express();
// Transform query params into body
app.use(express.urlencoded({ extended: true }));

// Let's log all routes
app.all('*', (req, res, next) => {
  console.log(req.method, req.url)
  next()
})

// Change this line to easily check that the running application has changed.
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/healthz', healthRoute);
app.use('/todos', apiRoute);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
console.log(`Healthz: http://${HOST}:${PORT}/healthz`);