const main = document.getElementById("main");

let main_information = {
  name_of_list: "Type name of todo list",
  task1: ["კვება", ["ვჭამო"], ["ბევრი წყალი დავლიო"]],
  task2: ["ტასკის სახელი", ["job to do"]]
};

render();

//-----------------functions--------------------------//

function render() {

  main.innerHTML = `
      <input class="bordered" type="text" placeholder="${main_information.name_of_list}" id="ListName"/>
    `;


    for (var i=1; i<Object.keys(main_information).length; i++){
      let a = i
      main.innerHTML += `
      <div class="task" id="t${i}"> 
        <div class="task_name bordered" id="task${i}">
          <button class="checkbox" id="task${i}check"></button>
          <input class="job" id="task${i}text" type="text" placeholder="task" />
        </div>
      </div>
      `
      document.getElementById(`task${i}text`).value = "hey";

      for (var S=1; S<main_information.task1.length; S++){
        document.getElementById(`t${i}`).innerHTML += `
        <div class="sub_task bordered" id="subtask${S}">
          <button class="checkbox" id="subtask${S}check"></button>
            <input class="job" id="subtask${S}text" type="text" placeholder="job" />
            <button class="action" id="subtask${S}clear">
              <span class="material-symbols-outlined icon">backspace</span>
            </button>
            <button class="action" id="subtask${S}delete">
              <span class="material-symbols-outlined icon">delete</span>
          </button>
        </div>
        `
        document.getElementById(`subtask${S}text`).value = main_information.task1[S]
        console.log(i)

      }
      
    }


    


      

        


  //hit_enter(subTaskCounter);
  //check_If_Done_task(taskCounter);
  //check_If_Done(subTaskCounter);
  //naming_task(taskCounter);
  //naming_SubTask(subTaskCounter);
}


function hit_enter(a){
  document.getElementById(`subtask${a}text`).addEventListener("keyup", function(e){
    e.key === 'Enter' ? addSubTask() : console.log(e.key);
  })
}

function addSubTask(){

  // <div class="sub_task bordered" id="subtask${subTaskCounter}">
  //         <button class="checkbox" id="subtask${subTaskCounter}check"></button>
  //         <input class="job" id="subtask${subTaskCounter}text" type="text" placeholder="job to do" />
  //         <button class="action" id="subtask${subTaskCounter}clear">
  //           <span class="material-symbols-outlined icon">backspace</span>
  //         </button>
  //         <button class="action" id="subtask${subTaskCounter}delete">
  //           <span class="material-symbols-outlined icon">delete</span>
  //         </button>
  // </div>

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
