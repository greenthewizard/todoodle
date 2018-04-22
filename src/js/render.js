import * as mustache from 'mustache';

export default function render($node, template, view = {}) {
    return fetch(template)
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            while($node.firstChild) {
                $node.removeChild($node.firstChild);
            }
            let output = mustache.render(text, view);
            $node.insertAdjacentHTML('afterbegin', output);
        });
};