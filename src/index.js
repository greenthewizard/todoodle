import './js/styles.js';
import * as taskFactory from './js/taskFactory.js';
import * as evManager from './js/eventManager.js';
import { nodeListToArray } from './js/helpers.js';
import render from './js/render.js';

let $newInput = null;
let $listArea = document.querySelector('#list-area');

let task1 = taskFactory.createTask('Finish todo app');
    let task4 = taskFactory.createTask('Make the rest of the app');
    let task5 = taskFactory.createTask('Learn how to make the rest of the app');
        let task7 = taskFactory.createTask('Learn javascript');
        let task8 = taskFactory.createTask('Learn HTML/CSS');
let task2 = taskFactory.createTask('Grocery List');
    let task6 = taskFactory.createTask('Buy Milk');
let task3 = taskFactory.createTask('Make more lists');

task4.setParent(task1);
task5.setParent(task1);
task6.setParent(task2);
task7.setParent(task5);
task8.setParent(task5);

$listArea.addEventListener('mouseover', e => {
    if (e.target.classList.contains('task-label')) {    
        //Cache DOM
        let $label = e.target;

        if (!$newInput) {
            $newInput = document.createElement('input');
            $newInput.classList.add('title-editor');
            $newInput.classList.add('invis');
        }

        $newInput.value = $label.textContent;
        $label.parentNode.appendChild($newInput);
    }
});

$listArea.addEventListener('click', e => {    
    if (e.target.classList.contains('title-editor')) {
        let $input = e.target;
        let $label = e.target.parentNode.querySelector('.task-label'); 

        //Make all labels visible.
        let $labels = document.querySelectorAll('.task-label');
        $labels = nodeListToArray($labels)
            .map($elem => $elem.classList.remove('invis'));

        //Remove all inputs except current target.
        let $unusedEditors = document.querySelectorAll('.title-editor');
        $unusedEditors = nodeListToArray($unusedEditors)
            .filter($elem => $elem !== $input)
            .map($elem => $elem.parentNode.removeChild($elem));
        
        //Swap visibility of input and label.
        $input.classList.remove('invis');
        $label.classList.add('invis');
        $newInput = null;
    }
});

let view = {
    tasks: taskFactory.getSortedTasks(),
    hasChildren: function() {
        return taskFactory.getChildrenFor(this).length > 0;
    },
    getIndent: function() {
        return taskFactory.getGenerationOf(this) * 2 + 'rem';
    }
}

let $ul = document.querySelector('#todo-list');
render($ul, 'templates/tasklist.mst', view)
    .then(() => evManager.attachListeners());