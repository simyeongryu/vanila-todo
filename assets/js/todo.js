// todo가 담길 배열
let todoArr = [];

/**
 * 달성률 화면 표시
 * @param {*} checkedLength - check 표시된 일정의 수
 * @param {*} totalLength - 전체 일정의 수
 */
const paintAchievement = (checkedLength = 0, totalLength = 0) => {
  const percent = checkedLength / totalLength;
  if (totalLength === 0) {
    achievement.classList.add(HIDE);
    return;
  }
  if (percent === 1) {
    achievement.innerHTML = `😍달성률 ${Math.floor(
      (checkedLength / totalLength) * 100
    )}%😍`;
    achievement.classList.remove(HIDE);
  } else {
    achievement.innerHTML = `달성률 ${Math.floor((checkedLength / totalLength) * 100)}%`;
    achievement.classList.remove(HIDE);
  }
};

/**
 * 체크박스 처리 함수
 * @param {*} e - 클릭 이벤트
 */
const handleCheck = e => {
  const checkbox = e.target;
  const li = checkbox.parentNode;
  if (checkbox.checked) {
    li.classList.add(ACHIEVED);
    todoArr[li.id].checked = true;
    localStorage.setItem(LS_TODO_LIST, JSON.stringify(todoArr));
    // check
    const todoListCheck = document.querySelectorAll(".todoList__checkbox");
    const checkArr = Array.from(todoListCheck);
    const checkedArr = checkArr.filter(box => box.checked);
    paintAchievement(checkedArr.length, checkArr.length);
  } else {
    li.classList.remove(ACHIEVED);
    todoArr[li.id].checked = false;
    localStorage.setItem(LS_TODO_LIST, JSON.stringify(todoArr));
    // check
    const todoListCheck = document.querySelectorAll(".todoList__checkbox");
    const checkArr = Array.from(todoListCheck);
    const checkedArr = checkArr.filter(box => box.checked);
    paintAchievement(checkedArr.length, checkArr.length);
  }
};

/** todo를 화면 및 로컬스토리지에서 삭제하는 함수 */
const deleteTodo = e => {
  // 화면에서 삭제
  const li = e.target.parentNode;
  todoList.removeChild(li);
  // 로컬 스토리지에서 삭제 (li.id가 string이기 때문에 number로 형변환)
  todoArr = todoArr.filter(item => item.id !== parseInt(+li.id));
  localStorage.setItem(LS_TODO_LIST, JSON.stringify(todoArr));
  // 일정이 5개 미만이면 입력 제한 해제
  const delArr = Array.from(document.querySelectorAll(".todoList__del"));
  if (delArr.length < 5) {
    todoInput.placeholder = "일정을 입력하세요";
    todoInput.disabled = false;
  }

  const todoListCheck = document.querySelectorAll(".todoList__checkbox");
  const checkArr = Array.from(todoListCheck);
  const checkedArr = checkArr.filter(box => box.checked);
  paintAchievement(checkedArr.length, checkArr.length);
};

/** 화면 및 로컬 스토리지에 todo를 추가하는 함수 */
const addTodo = (text, checked = false) => {
  const id = todoArr.length;
  // 로컬 스토리지에 todo 추가
  todoArr.push({ id, text, checked });
  localStorage.setItem(LS_TODO_LIST, JSON.stringify(todoArr));
  // 화면에 todo 추가
  const li = document.createElement("li");
  li.id = id;
  li.classList.add("todo");
  // check 박스 상태 유지
  if (checked) {
    li.classList.add(ACHIEVED);
    li.innerHTML = `
  <input type="checkbox" class="todoList__checkbox" checked="true" />
  <span class="todoList__text">${text}</span>
  <button class="todoList__del">❌</button>
  `;
  } else {
    li.innerHTML = `
  <input type="checkbox" class="todoList__checkbox" />
  <span class="todoList__text">${text}</span>
  <button class="todoList__del">❌</button>
  `;
  }
  todoList.appendChild(li);
  // todo 삭제 버튼 이벤트 정의
  const todoListDel = document.querySelectorAll(".todoList__del");
  const delArr = Array.from(todoListDel);
  delArr.forEach(btn => btn.addEventListener("click", deleteTodo));

  // check
  const todoListCheck = document.querySelectorAll(".todoList__checkbox");
  const checkArr = Array.from(todoListCheck);
  checkArr.forEach(box => box.addEventListener("click", handleCheck));
  const checkedArr = checkArr.filter(box => box.checked);

  paintAchievement(checkedArr.length, checkArr.length);

  // 일정이 5개가 넘으면 입력 제한
  if (delArr.length >= 5) {
    todoInput.placeholder = "더 적게, 더 좋게! 5개에 집중하세요 :)";
    todoInput.disabled = true;
  }
};

/** to do submit 관리 */
const handleTodoSubmit = e => {
  e.preventDefault();
  addTodo(todoInput.value);
  todoInput.value = "";
};

/** Local Storage 내 to do list를 불러오는 함수 */
const loadTodo = () => {
  if (localStorage.getItem(LS_TODO_LIST)) {
    const parsed = JSON.parse(localStorage.getItem(LS_TODO_LIST));
    parsed.forEach(todo => addTodo(todo.text, todo.checked));
  }
};

/** 초기화 함수 */
const todoInit = () => {
  loadTodo();
  todoForm.addEventListener("submit", handleTodoSubmit);
};

todoInit();
