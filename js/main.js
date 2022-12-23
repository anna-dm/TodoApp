// Находим элементы

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];




form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)



// Функции
function addTask(event) {
  //Отменяем отправку формы
  event.preventDefault();


  //Достаем текст из поля ввода

  const taskText = taskInput.value
  // Описываем задачу в виде объекта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  //Добавляем задачу в массив с задачами
  tasks.push(newTask)


  // Формируем CSS класс
  const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';





  // Формируем разметку для новой задачи

  const taskHTML = `<li id="${newTask}" class="list-group-item d-flex justify-content-between task-item">
      <span class="${cssClass}">${newTask.text}</span>
      <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
      </div>
    </li>`;

  //Добавляем задачу на страницу

  tasksList.insertAdjacentHTML('beforeend', taskHTML);

  // Очищаем поле ввода и возвращаем на него фокус

  taskInput.value = ""
  taskInput.focus()


  if (tasksList.children.length > 1) {
    emptyList.classList.add('none')

  }


}


function deleteTask(event) {
  console.log(event.target);
  // Проверяем  клик был не по кнопке "удалить задачу"
  if (event.target.dataset.action !== 'delete') return;


  const parenNode = event.target.closest('.list-group-item');

  // Определяем ID Задачи
  const id = Number(parenNode.id);

  // Находим индекс задачи в массиве
  const index = tasks.findIndex((task) => task.id === id);

  // Удаляем задачу из массива с задачами
  tasks.slice(index, 1)





  // Удаляем задачу из разметки
  parenNode.remove()
  // Проверка Если в списке задач более 1-го элемента, скрываем блок

  if (tasksList.children.length === 1) {
    emptyList.classList.remove('none');
  }


}

function doneTask(event) {
  // Проверяем что клик был не по кнопке "задача выполнена"
  if (event.target.dataset.action !== 'done') return;



  // Проверяем что клик был по кнопке "задача выполнена"

  const parenNode = event.target.closest('.list-group-item');
  // Определяем ID задачи
  const id = Number(parenNode.id);
  const task = tasks.find((task) => task.id === id)
  task.done = !task.done



  const taskTitle = parenNode.querySelector('.task-title');
  taskTitle.classList.toggle('task-title--done');


}

