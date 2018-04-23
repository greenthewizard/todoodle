//Stores list of query selectors with 
//respective actions, can be called to 
//set all event listeners after a render.

let listenerPairs = {};

export const newListener = (query, type, fn) => {
    listenerPairs[query] = {};
    listenerPairs[query].type = type;
    listenerPairs[query].fn = fn;
};

export const attachListeners = () => {
    for(let key in listenerPairs) {
        let $nodeList = document.querySelectorAll(key);
        if ($nodeList) {
            $nodeList.forEach($node => {
                $node.addEventListener(listenerPairs[key].type, listenerPairs[key].fn);
            });
        }
    }
};