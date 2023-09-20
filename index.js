const main = document.getElementById("main");

let main_information = {
  name_of_list: "",
  task1: [
    ["", 0],
    ["", 0],
  ],
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
      main_information[`task${i}`][0][0]
    }" />
        </div>
      </div>
      `;

    for (let D = 1; D < main_information[`task${i}`].length; D++) {
      let text = main_information[`task${i}`][D][0];

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
  check_If_Done();
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
    //console.log(`name changed: ${main_information.name_of_list}`);
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
  //console.log(i);
  main_information[`task${i + 1}`] = [
    ["", 0],
    ["", 0],
  ];
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
  main_information[`task${i}`].push(["", 0]);
  //console.log(main_information);
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
      main_information[`task${i}`][0][0] = task.value;
    });

    for (let D = 1; D < main_information[`task${i}`].length; D++) {
      let subtask = document.getElementById(`subtask${i}_${D}text`);
      subtask.addEventListener("keyup", () => {
        main_information[`task${i}`][D][0] = subtask.value;
      });
    }
  }
  //console.log(main_information);
}
// |
// |
// |
// |
function check_If_Done() {
  for (let i = 1; i < Object.keys(main_information).length; i++) {
    let task = document.getElementById(`task${i}check`);
    let taskText = document.getElementById(`task${i}text`);
    let taskN = main_information[`task${i}`][0][1];
    foo(taskText, task, taskN, main_information[`task${i}`], taskN);

    for (let D = 1; D < main_information[`task${i}`].length; D++) {
      let subtask = document.getElementById(`subtask${i}_${D}check`);
      let subtasktext = document.getElementById(`subtask${i}_${D}text`);

      subtask.addEventListener("mouseup", () => {
        if (subtasktext.value == false) {
        } else if (main_information[`task${i}`][D][1] == 0) {
          subtasktext.style.textDecoration = "line-through";
          subtasktext.style.color = "green";
          subtask.innerHTML = "<h2>✔️</h2>";
          main_information[`task${i}`][D][1] = 1;
          //console.log(main_information);
          //console.log(tu)
          taskN += main_information[`task${i}`][D][1];

          foo(taskText, task, taskN, main_information[`task${i}`], taskN);
          console.log("taskN = " + taskN);
        } else {
          subtasktext.style.textDecoration = "none";
          subtasktext.style.color = "black";
          subtask.innerHTML = "<h2></h2>";
          main_information[`task${i}`][D][1] = 0;
          //console.log(main_information)
          taskN -= 1;

          foo(taskText, task, taskN, main_information[`task${i}`], taskN);
          console.log("taskN = " + taskN);
        }
      });

      if (main_information[`task${i}`][D][1]) {
        subtasktext.style.textDecoration = "line-through";
        subtasktext.style.color = "green";
        subtask.innerHTML = "<h2>✔️</h2>";
      } else {
        subtasktext.style.textDecoration = "none";
        subtasktext.style.color = "black";
        subtask.innerHTML = "<h2></h2>";
      }
    }
  }
}

function foo(a, b, c, d, e) {
  e >= d.length - 1 ? (c = 1) : (c = 0);

  if (c) {
    a.style.textDecoration = "line-through";
    a.style.color = "green";
    b.innerHTML = "<h2>✔️</h2>";
  } else {
    a.style.textDecoration = "none";
    a.style.color = "black";
    b.innerHTML = "<h2></h2>";
  }

  console.log(`cheker: ${e}, length: ${d.length - 1}`);
}
