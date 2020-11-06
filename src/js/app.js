import Task from './Task';

const input = document.querySelector('input');
const span = document.createElement('span');
const alltasksBlock = document.querySelector('.all-tasks-block .tasks');
const pinnedBlock = document.querySelector('.pinned-block .tasks');

const tasks = [];
pinnedBlock.innerHTML = 'No pinned tasks';

input.addEventListener('input', () => {
  span.textContent = '';
  alltasksBlock.innerHTML = '';
  const filterTasks = tasks.filter((task) => {
    const str = task.name.toLowerCase();
    return str.indexOf(input.value.toLowerCase()) === 0;
  });
  filterTasks.forEach((task) => {
    if (!task.isPinned) {
      alltasksBlock.innerHTML += `<div class="task"><div class="name">${task.name}</div><div class="pinned"></div></div>`;
    }
  });
});

function showTasks() {
  alltasksBlock.innerHTML = '';
  pinnedBlock.innerHTML = '';
  tasks.forEach((task) => {
    if (task.isPinned) {
      pinnedBlock.innerHTML += `<div class="task"><div class="name">${task.name}</div><div class="pinned active"></div></div>`;
    } else {
      alltasksBlock.innerHTML += `<div class="task"><div class="name">${task.name}</div><div class="pinned"></div></div>`;
    }
  });
  if (pinnedBlock.innerHTML === '') {
    pinnedBlock.innerHTML = 'No pinned tasks';
  }
  Array.from(document.querySelectorAll('.task')).forEach((element) => {
    element.addEventListener('click', (e) => {
      tasks.forEach((task, index) => {
        if (task.name === e.currentTarget.querySelector('.name').textContent) {
          const result = { ...task };
          result.isPinned = !task.isPinned;
          tasks[index] = { ...result };
          showTasks();
        }
      });
    });
  });
}

input.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    if (!this.value) {
      span.textContent = 'Введите значение!';
      input.insertAdjacentElement('beforebegin', span);
    } else {
      tasks.push(new Task(this.value));
      this.value = '';
      showTasks();
    }
  }
});
