const handleLogoutBtn = () => {
  localStorage.removeItem(LS_USERNAME);
  localStorage.removeItem(LS_TODO_LIST);
  handleGreetingsText();

  logoutBtn.classList.add(HIDE); // 로그아웃 버튼 숨기기
  todoInput.classList.add(HIDE); // todo 입력창 숨기기
};

const handleGreetingsInput = e => {
  e.preventDefault();
  // local storage에 유저 입력값 저장, 이름 불러오기
  localStorage.setItem(LS_USERNAME, greetingsInput.value);
  handleGreetingsText();
  // 이름값 지우고 숨기기
  greetingsInput.value = "";
  greetingsInput.classList.add(HIDE);

  logoutBtn.classList.remove(HIDE); // 로그아웃 버튼 드러내기
  todoInput.classList.remove(HIDE); // todo 입력창 드러내기
};

const handleGreetingsText = () => {
  if (localStorage.getItem(LS_USERNAME) === null) {
    greetingsText.innerHTML = "이름을 입력하세요";
    greetingsInput.classList.remove(HIDE);

    logoutBtn.classList.add(HIDE); // 로그아웃 버튼 숨기기
    todoInput.classList.add(HIDE); // todo 입력창 숨기기
  } else {
    greetingsText.innerHTML = `안녕하세요 ${localStorage.getItem(LS_USERNAME)} 님`;
    greetingsInput.classList.add(HIDE);

    logoutBtn.classList.remove(HIDE); // 로그아웃 버튼 드러내기
    todoInput.classList.remove(HIDE); // todo 입력창 드러내기
  }
};

const greetingsInit = () => {
  handleGreetingsText();
  greetingsForm.addEventListener("submit", handleGreetingsInput);
  logoutBtn.addEventListener("click", handleLogoutBtn);
};

greetingsInit();
