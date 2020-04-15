let todoArr = [];

const deleteTodo = e => {
  const li = e.target.parentNode;
  todoList.removeChild(li);

  todoArr = todoArr.filter(item => {
    return item.id !== parseInt(li.id, 10);
  });

  localStorage.setItem(LS_TODO_LIST, JSON.stringify(todoArr));
};

const loadTodo = () => {
  if (localStorage.getItem(LS_TODO_LIST) !== null) {
    const parsedTodo = JSON.parse(localStorage.getItem(LS_TODO_LIST));
    parsedTodo.forEach(item => addTodo(item.text));
  }
};

const addTodo = text => {
  const id = todoArr.length;

  const li = document.createElement("li");
  li.id = id;
  li.innerHTML = `
  <input type="checkbox" class="todoList__checkbox" />
  <span class="todoList__text">${text}</span>
  <button class="todoList__del">❌</button>
  `;

  todoArr.push({ id, text });
  todoList.appendChild(li);
  localStorage.setItem(LS_TODO_LIST, JSON.stringify(todoArr));

  const todoListDel = document.querySelectorAll(".todoList__del");
  const delArr = Array.from(todoListDel);
  delArr.forEach(btn => btn.addEventListener("click", deleteTodo));
};

const handleTodoSubmit = e => {
  e.preventDefault();
  addTodo(todoInput.value);
  todoInput.value = "";
};

const todoInit = () => {
  loadTodo();
  todoForm.addEventListener("submit", handleTodoSubmit);
};

todoInit();
