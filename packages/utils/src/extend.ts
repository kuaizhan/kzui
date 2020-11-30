import { func } from "prop-types";


// const x   = extend({  a : 'hello' },  { b : 42 });
function extend<T, U>(first: T, second: U): T & U {

    const result = <T & U>{}

    for(let id in first) {
        (<T>result)[id] = first[id]
    }

    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<U>result)[id] = second[id]
        }
    }

    return result
}

export {
    extend
}