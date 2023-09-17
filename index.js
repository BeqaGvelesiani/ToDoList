const main = document.getElementById("main");

let main_information = {
  name_of_list: "name",
  task1: "",
  subTask1: ""
};

render();
naming_list();

//-----------------functions--------------------------//

function render() {
  let taskCounter = 1;
  let subTaskCounter = 1;

  main.innerHTML = `
      <input class="bordered" type="text" placeholder="Type name of todo list" id="ListName"/>
      
      <div class="task"> 
        <div class="task_name bordered" id="task${1}">
          <button class="checkbox" id="task${1}check"></button>
          <input class="job" id="task${1}text" type="text" placeholder="task name" />
        </div>

        <div class="sub_task bordered" id="subtask${1}">
          <button class="checkbox" id="subtask${1}check"></button>
          <input class="job" id="subtask${1}text" type="text" placeholder="job to do" />
          <button class="action" id="subtask${1}delete">
            <span class="material-symbols-outlined icon">backspace</span>
          </button>
        </div>
        <div class="sub_task bordered" id="subtask${2}">
          <button class="checkbox" id="subtask${2}check"></button>
          <input class="job" id="subtask${2}text" type="text" placeholder="job to do" />
          <button class="action" id="subtask${2}delete">
            <span class="material-symbols-outlined icon">backspace</span>
          </button>
        </div>
      </div>
    `;

  check_If_Done_task(1);
  check_If_Done(1);
  check_If_Done(2);

  document
    .getElementById(`subtask${subTaskCounter}text`)
    .addEventListener("keyup", () => {
      console.log("hey");
    });
}

function naming_list() {
  const ListName = document.getElementById("ListName");
  const task = document.getElementById("task1");
  ListName.addEventListener("keyup", () => {
    main_information.name_of_list = ListName.value;
    console.log(`name: ${main_information.name_of_list}`);
  });
  task.addEventListener("keyup", () => {
    main_information.task1 = task.value;
    console.log(`task name: ${main_information.task1}`);
  });
}

function check_If_Done(a) {
  let subTaskCheck = document.getElementById(`subtask${a}check`);
  let subTaskText = document.getElementById(`subtask${a}text`);
  let on = true;

  subTaskCheck.addEventListener("click", () => {
    if (subTaskText.value.length == 0) {
      console.log("empty");
    } else {
      if (on == true) {
        subTaskCheck.innerHTML = "<h2>✔️</h2>";
        subTaskCheck.style.backgroundColor = "#434eac";
        on = false;
        subTaskText.style.textDecoration = "line-through";
      } else if (on == false) {
        subTaskCheck.innerHTML = "<h2></h2>";
        subTaskCheck.style.backgroundColor = "rgba(0, 0, 0, 0)";
        on = true;
        subTaskText.style.textDecoration = "none";
      }
    }
  });
}

function check_If_Done_task(a) {
  let taskCheck = document.getElementById(`task${a}check`);
  let taskText = document.getElementById(`task${a}text`);
  let on = true;

  taskCheck.addEventListener("click", () => {
    if (taskText.value.length == 0) {
      console.log("empty");
    } else {
      if (on == true) {
        taskCheck.innerHTML = "<h2>✔️</h2>";
        taskCheck.style.backgroundColor = "#434eac";
        on = false;
        taskText.style.textDecoration = "line-through";
      } else if (on == false) {
        taskCheck.innerHTML = "<h2></h2>";
        taskCheck.style.backgroundColor = "rgba(0, 0, 0, 0)";
        on = true;
        taskText.style.textDecoration = "none";
      }
    }
  });
}
