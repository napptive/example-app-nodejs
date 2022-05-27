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
const {TODO, TODOItem} = require("../todo/todos.js");

const router = express.Router();
var todoList = new TODO();

router.get('/', async (_req, res, _next) => {
    res.json(todoList.todos);
});

router.post('/add', async (req, res, _next) => {
    const item = req.query.item
    if (item == undefined){
        res.status(400).send();
        return
    }
    const added = todoList.add(item)
    res.json(added);
});

router.post('/remove', async (req, res, _next) => {
    const id = req.query.id
    if (id == undefined){
        res.status(400).send();
        return
    }
    todoList.remove(id)
    res.sendStatus(200);
});

router.post('/done', async (req, res, _next) => {
    const id = req.query.id
    if (id == undefined){
        res.status(400).send();
        return
    }
    todoList.markAsDone(id)
    res.sendStatus(200);
});

module.exports = router;