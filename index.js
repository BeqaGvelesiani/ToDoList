const main = document.getElementById("main");

let main_information = {
  name_of_list: "name",
  tasks: {},
  subTasks: {}
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
        <div class="task_name bordered" id="task${taskCounter}">
          <button class="checkbox" id="task${taskCounter}check"></button>
          <input class="job" id="task${taskCounter}text" type="text" placeholder="task name" />
        </div>

        <div class="sub_task bordered" id="subtask${subTaskCounter}">
          <button class="checkbox" id="subtask${subTaskCounter}check"></button>
          <input class="job" id="subtask${subTaskCounter}text" type="text" placeholder="job to do" />
          <button class="action" id="subtask${subTaskCounter}clear">
            <span class="material-symbols-outlined icon">backspace</span>
          </button>
          <button class="action" id="subtask${subTaskCounter}delete">
            <span class="material-symbols-outlined icon">delete</span>
          </button>
        </div>
      </div>
    `;

  hit_enter(subTaskCounter);
    

  check_If_Done_task(taskCounter);
  check_If_Done(subTaskCounter);
  naming_task(taskCounter);
  naming_SubTask(subTaskCounter);
}


function hit_enter(a){
  document.getElementById(`subtask${a}text`).addEventListener("keyup", function(e){
    e.key === 'Enter' ? addSubTask() : console.log(e.key);
  })
}

function addSubTask(){
  console.log("add sub task")
}


function naming_list() {
  const ListName = document.getElementById("ListName");
  ListName.addEventListener("keyup", () => {
    main_information.name_of_list = ListName.value;
    console.log(`name: ${main_information.name_of_list}`);
  });
}

function naming_task(a) {
  const task = document.getElementById(`task${a}text`);
  task.addEventListener("keyup", () => {
    main_information.subTasks.a = task.value;
    console.log(`subTask${a} name: ${main_information.subTasks.a}`);
  });
}

function naming_SubTask(a) {
  const sub_task = document.getElementById(`subtask${a}text`);
  sub_task.addEventListener("keyup", () => {
    main_information.tasks.a = sub_task.value;
    console.log(`task${a} name: ${main_information.tasks.a}`);
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
