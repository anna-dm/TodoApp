// Находим элементы

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');



// Добавление задачи
form.addEventListener('submit', addTask);

// Удаление задачи


tasksList.addEventListener('click', deleteTask)

// Отмечаем задачу завершенной

tasksList.addEventListener('click', doneTask)

// Функции
function addTask(event) {
  //Отменяем отправку формы
  event.preventDefault();


  //Достаем текст из поля ввода

  const taskText = taskInput.value

  // Формируем разметку для новой задачи

  const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
      <span class="task-title">${taskText}</span>
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
  // Проверяем чтобы клик был по кнопке "удалить задачу"
  if (event.target.dataset.action === 'delete') {
    console.log('DELETE!');

    const parenNode = event.target.closest('.list-group-item');
    console.log(parenNode);
    parenNode.remove()

    // Проверка Если в списке задач более 1-го элемента, скрываем блок

    if (tasksList.children.length === 1) {
      emptyList.classList.remove('none');
    }



  }

}

function doneTask(event) {
  // Проверяем что клик был по кнопке "задача выполнена"
  if (event.target.dataset.action === "done") {
    const parenNode = event.target.closest('.list-group-item');
    const taskTitle = parenNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

    console.log(taskTitle);

  }

}
