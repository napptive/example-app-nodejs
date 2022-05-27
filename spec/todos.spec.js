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

const {TODO, TODOItem} = require("../todo/todos.js");

var todoManager = new TODO();

describe("Managing todos", function(){

    beforeEach(() => {
        todoManager = new TODO();
    });

    it("should be able to add a single todo",function() {
        todoManager.add("item1")
        expect(todoManager.todos.length).toBe(1);
        console.log({todoManager});
    });
    it("should be able to mark a todo as done", function(){
        const added = todoManager.add("item1")
        expect(todoManager.todos.length).toBe(1);
        todoManager.markAsDone(added.id)
        expect(todoManager.todos[0].done).toBe(true);
    });
    it("should be able to remove a todo", function(){
        const added = todoManager.add("item1")
        expect(todoManager.todos.length).toBe(1);
        todoManager.remove(added.id)
        expect(todoManager.todos.length).toBe(0);
    });
    
});