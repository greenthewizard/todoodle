import './styles/style.scss';
import * as taskFactory from './js/taskFactory.js'

let task = taskFactory.createTask('test123', 'hey');
console.log(task.getTitle());

task.setTitle('test456');