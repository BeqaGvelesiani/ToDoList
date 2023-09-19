const main = document.getElementById("main");

let main_information = {
  name_of_list: "",
  task1: ["", ""],
};

render();

//-----------------functions--------------------------//

function render() {
  main.innerHTML = `
      <input class="bordered" type="text" placeholder="type list name" value="${main_information.name_of_list}" id="ListName"/>
    `;

  for (let i = 1; i < Object.keys(main_information).length; i++) {
    main.innerHTML += `
      <div class="task" id="t${i}"> 
        <div class="task_name bordered" id="task${i}">
          <button class="checkbox" id="task${i}check"></button>
          <input class="job" id="task${i}text" type="text" placeholder="type summery name" value="${
      main_information[`task${i}`][0]
    }" />
        </div>
      </div>
      `;

    for (let D = 1; D < main_information[`task${i}`].length; D++) {
      let text = main_information[`task${i}`][D];

      document.getElementById(`t${i}`).innerHTML += `
        <div class="sub_task bordered" id="subtask${i}_${D}">
          <button class="checkbox" id="subtask${i}_${D}check"></button>
            <input class="job" id="subtask${i}_${D}text" type="text" placeholder="type job to do" value="${text}"/>
            
            <button class="action" id="subtask${i}_${D}delete">
              <span class="material-symbols-outlined icon">delete</span>
          </button>
        </div>
        `;
    }
  }
  hit_enter();
}

naming_list();

// |
// |
// |
// |
// |
function naming_list() {
  const ListName = document.getElementById("ListName");
  ListName.addEventListener("keyup", () => {
    main_information.name_of_list = ListName.value;
    console.log(`name changed: ${main_information.name_of_list}`);
  });
}
// |
// |
// |
// |
function hit_enter() {
  for (let i = 1; i < Object.keys(main_information).length; i++) {
    document
      .getElementById(`task${i}text`)
      .addEventListener("keyup", function (e) {
        e.key === "Enter" ? addTask(i) : makeChanges();
      });

    for (let D = 1; D < main_information[`task${i}`].length; D++) {
      document
        .getElementById(`subtask${i}_${D}text`)
        .addEventListener("keyup", function (e) {
          e.key === "Enter" ? addSubTask(i, D) : makeChanges();
        });
    }
  }
}
// |
// |
// |
// |
function addTask(i) {
  hit_enter();
  console.log(i);
  main_information[`task${i + 1}`] = ["", ""];
  console.log(main_information);
  render();
}
// |
// |
// |
// |
function addSubTask(i, D) {
  hit_enter();
  console.log(i, D);
  main_information[`task${i}`].push("");
  console.log(main_information);
  render();
}
// |
// |
// |
// |
function makeChanges() {
  for (let i = 1; i < Object.keys(main_information).length; i++) {
    let task = document.getElementById(`task${i}text`);

    task.addEventListener("keyup", () => {
      main_information[`task${i}`][0] = task.value;
    });

    for (let D = 1; D < main_information[`task${i}`].length; D++) {
      let subtask = document.getElementById(`subtask${i}_${D}text`);
      subtask.addEventListener("keyup", () => {
        main_information[`task${i}`][D] = subtask.value;
      });
    }
  }
  console.log(main_information)
}
// |
// |
// |
// |
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
