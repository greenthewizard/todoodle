import './styles/style.scss';
import * as taskFactory from './js/taskFactory.js'

let task = taskFactory.createTask('test123', 'hey');
console.log(task.getTitle());

task.setTitle('test456');

let task2 = taskFactory.getTaskById(0);
console.log(task2.getTitle());

