// to do가 담길 배열
let todoArr = [];

/** todo를 화면 및 로컬스토리지에서 삭제하는 함수 */
const deleteTodo = e => {
  // 화면에서 삭제
  const li = e.target.parentNode;
  todoList.removeChild(li);
  // 로컬 스토리지에서 삭제
  todoArr = todoArr.filter(item => item.id !== parseInt(+li.id)); // li.id가 string이기 때문에 number로 형변환
  localStorage.setItem(LS_TODO_LIST, JSON.stringify(todoArr));
};

/** 화면 및 로컬 스토리지에 todo를 추가하는 함수 */
const addTodo = text => {
  const id = todoArr.length;
  // 로컬 스토리지에 todo 추가
  todoArr.push({ id, text });
  localStorage.setItem(LS_TODO_LIST, JSON.stringify(todoArr));
  // 화면에 todo 추가
  const li = document.createElement("li");
  li.id = id;
  li.innerHTML = `
  <input type="checkbox" class="todoList__checkbox" />
  <span class="todoList__text">${text}</span>
  <button class="todoList__del">❌</button>
  `;
  todoList.appendChild(li);
  // todo 삭제 버튼 이벤트 정의
  const todoListDel = document.querySelectorAll(".todoList__del");
  const delArr = Array.from(todoListDel);
  delArr.forEach(btn => btn.addEventListener("click", deleteTodo));
};

/** to do submit 관리 */
const handleTodoSubmit = e => {
  e.preventDefault();
  addTodo(todoInput.value);
  todoInput.value = "";
};

/** Local Storage 내 to do list를 불러오는 함수 */
const loadTodo = () => {
  // local storage에 to do list가 있으면
  if (localStorage.getItem(LS_TODO_LIST)) {
    const parsed = JSON.parse(localStorage.getItem(LS_TODO_LIST));
    parsed.forEach(todo => addTodo(todo.text));
  }
};

/** 초기화 함수 */
const todoInit = () => {
  loadTodo();
  todoForm.addEventListener("submit", handleTodoSubmit);
};

todoInit();
