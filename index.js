const main = document.getElementById("main");

let main_information = {
  name_of_list: "name",
  tasks: { subTask: "" },
};

render();
naming_list();
check_If_Done();



//-----------------functions--------------------------//


function render() {
  main.innerHTML = `
      <input class="bordered" type="text" placeholder="Type name of todo list" id="ListName"/>
      
      <div class="task"> 
        <div class="task_name bordered" id="task${1}">
          <button class="checkbox" id="task${1}check"></button>
          <input class="job" id="task${1}text" type="text" placeholder="add task" />
        </div>

        <div class="sub_task bordered" id="subtask${1}">
          <button class="checkbox" id="subtask${1}check"></button>
          <input class="job" id="subtask${1}text" type="text" placeholder="add job to do" />
        </div>
      </div>
    `;

    fill();
}



function naming_list() {
  const ListName = document.getElementById("ListName");
  const task = document.getElementById("task1");
  ListName.addEventListener("keyup", () => {
    main_information.name_of_list = ListName.value;
    console.log(main_information);
    //console.log(main_information.tasks);
  });
  task1.addEventListener("keyup", () => {
    main_information.name_of_list = ListName.value;
    console.log(main_information);
    //console.log(main_information.tasks);
  });
}

function check_If_Done() {
  let subTaskCheck = document.getElementById(`subtask${1}check`);
  let subTaskText = document.getElementById(`subtask${1}text`);
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



function fill(){
  console.log(main_information.name_of_list)
}