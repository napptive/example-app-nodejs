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

// TODOItem represents an entry in the TODO list.
class TODOItem {
    constructor(text){
        this.id = Date.now()
        this.created = Date.now()
        this.text = text
        this.done = false
    }
    // Mark the item as done.
    markAsDone() {
        this.done = true
    }

    get [Symbol.toStringTag]() {
        return this.id + " [" + this.done + "] " + this.text;
    }

}

// TODO manager with a list of items.
class TODO {
    constructor(){
        this.todos = []
    }
    // Add a new todo item.
    add(text) {
        const toAdd = new TODOItem(text)
        this.todos.push(toAdd)
        console.log("Item", toAdd.id, "added, total: ", this.todos.length)
        return toAdd
    }
    // Mark an item as done.
    markAsDone(id) {
        this.todos.map(function(item){
            if (item.id == id){
                item.markAsDone()
            }
        })
    }
    // Remove and item from the list.
    remove(id) {
        this.todos = this.todos.filter(function(item) {
            return item.id != id
        })
        console.log("Item", id, "removed, total: ", this.todos.length)
    }
    // Clear all items from the list.
    clearAll(){
        this.todos = []
    }
}

module.exports = { TODO, TODOItem };