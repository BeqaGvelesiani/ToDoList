const main = document.getElementById("main");

document.getElementById("clearAllBTN").addEventListener("click", () => {
  document.getElementById("modal").style.display = "flex";
});

let mInfo = ["", [["", 0]]];

document.getElementById("yesClear").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
  cleardata();
});

document.getElementById("cancel").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

render();

//-----------------functions--------------------------//

function render() {
  getDataFromLocalStorage();
  main.innerHTML = `
      
      <input class="bordered" type="text" placeholder="type list name" value="${mInfo[0]}" id="ListName"/>
      <p class="text-center"><strong>Today: ${date()}</strong></p>
    `;

  for (let i = 1; i < mInfo.length; i++) {
    main.innerHTML += `

      <div class="task col-11" id="t${i}"> 
        <div class="task_name bordered" id="task${i}">
          
          <button class="checkbox col-1" id="task${i}check"></button>
          <input class="job col-4" id="task${i}text" type="text" placeholder="type task" value="${mInfo[i][0][0]}" />
          
          <button class="addBTN popupADD" id="taskicheck">
            <span class="material-symbols-outlined icon " id="add${i}">add</span>
          </button>
          <button class="addBTN popupDEL" id="taskicheck">
            <span class="material-symbols-outlined icon" id="del${i}">delete</span>
          </button>
          
        </div>
      </div>
      `;

    for (let D = 1; D < mInfo[i].length; D++) {
      let text = mInfo[i][D][0];
      //console.log(`task${i}` + " " + text);

      document.getElementById(`t${i}`).innerHTML += `
        <div class="sub_task bordered" id="subtask${i}_${D}">
            <button class="checkbox" id="subtask${i}_${D}check"></button>
            
            <input class="job" id="subtask${i}_${D}text" type="text" placeholder="type subtask" value="${text}"/>
            
            <button class="action popupDEL backspace">
              <span class="material-symbols-outlined icon" id="subtask${i}_${D}delete">backspace</span>
            </button>
        </div>
        `;
    }
  }
  controls();
  check_If_Done();
  //makeChanges();
}

//--------------------------------------------------------------------------------------------//
//
// ---↓--- rename the list ---↓---//
document.getElementById("ListName").addEventListener("keyup", () => {
  mInfo[0] = ListName.value;
  save();
  console.log(`name changed: ${mInfo[0]}`);
});
// ---↑--- rename the list ---↑---//
//
// ---↓--- control unit (this unit controls buttons and other) ---↓---//
function controls() {
  for (let i = 1; i < mInfo.length; i++) {
    document
      .getElementById(`task${i}text`)
      .addEventListener("keyup", function (e) {
        e.key === "Enter" ? addTask(i) : makeChanges();
      });

    document.getElementById(`add${i}`).addEventListener("click", function () {
      addSubTask(i);
    });
    //
    document.getElementById(`del${i}`).addEventListener("click", function () {
      DelTask(i);
    });
    //
    for (let D = 1; D < mInfo[i].length; D++) {
      document
        .getElementById(`subtask${i}_${D}text`)
        .addEventListener("keyup", function (e) {
          mInfo[i][D][0] = document.getElementById(
            `subtask${i}_${D}text`
          ).value;
          save();
          //console.log(mInfo);
        });

      document
        .getElementById(`subtask${i}_${D}delete`)
        .addEventListener("click", function () {
          DelSubTask(i, D);
        });
    }
  }
}
function addTask(i) {
  controls();
  mInfo.push([["", 0]]);

  save();
  //console.log(mInfo);
  render();
}
function DelTask(i) {
  controls();
  //console.log(i);
  mInfo.splice(i, 1);

  save();
  //console.log(mInfo);
  render();
}
function DelSubTask(i, d) {
  controls();
  mInfo[i].splice(d, 1);

  save();
  render();
}
function addSubTask(i) {
  controls();
  mInfo[i].push(["", 0]);
  mInfo[i][0][1] = 0;
  save();
  //console.log(mInfo);
  render();
}
// ---↑--- control unit ---↑---//
//
function makeChanges() {
  for (let i = 1; i < mInfo.length; i++) {
    let task = document.getElementById(`task${i}text`);

    task.addEventListener("keyup", () => {
      mInfo[i][0][0] = task.value;
      save();
      //console.log(`task changed ${mInfo[`task${i}`][0][0]}`);
    });

    for (let D = 1; D < mInfo[i].length; D++) {
      let subtask = document.getElementById(`subtask${i}_${D}text`);
      subtask.addEventListener("keyup", () => {
        mInfo[i][D][0] = subtask.value;
        save();
        //console.log(`subTask changed ${mInfo[`task${i}`][D][0]}`);
      });
    }
  }
}
// |
// |
// |
// |
function check_If_Done() {
  for (let i = 1; i < mInfo.length; i++) {
    if (mInfo[i].length == 1) {
      //console.log("hey");

      checkSign(
        mInfo[i][0][1],
        document.getElementById(`task${i}text`),
        document.getElementById(`task${i}check`)
      );

      document.getElementById(`task${i}check`).addEventListener("click", () => {
        if ((mInfo[i][0][1] == 0) & (mInfo[i][0][0] != "")) {
          mInfo[i][0][1] = 1;
        } else {
          mInfo[i][0][1] = 0;
        }
        checkSign(
          mInfo[i][0][1],
          document.getElementById(`task${i}text`),
          document.getElementById(`task${i}check`)
        );
      });
    } else {
      //console.log("hello");

      let B = 0;
      for (let D = 1; D < mInfo[i].length; D++) {
        //console.log(mInfo[`task${i}`][D][1]);

        checkSign(
          mInfo[i][D][1],
          document.getElementById(`subtask${i}_${D}text`),
          document.getElementById(`subtask${i}_${D}check`)
        );

        checkSign(
          mInfo[i][0][1],
          document.getElementById(`task${i}text`),
          document.getElementById(`task${i}check`)
        );

        document
          .getElementById(`subtask${i}_${D}check`)
          .addEventListener("click", () => {
            if ((mInfo[i][D][1] == 0) & (mInfo[i][D][0] != "")) {
              mInfo[i][D][1] = 1;
              save();
            } else {
              mInfo[i][D][1] = 0;
              save();
            }

            let A = mInfo[i].length - 1;
            let B = 0;

            for (let b = 1; b < mInfo[i].length; b++) {
              B += mInfo[i][b][1];
              console.log(`b = ${B}`);
              save();
            }

            console.log(`A = ${A}   B = ${B}`);

            if (A === B) {
              getDataFromLocalStorage();
              console.log("it's time");
              mInfo[i][0][1] = 1;
              save();
              checkSign(
                mInfo[i][0][1],
                document.getElementById(`task${i}text`),
                document.getElementById(`task${i}check`)
              );
            } else {
              getDataFromLocalStorage();
              mInfo[i][0][1] = 0;
              save();
              checkSign(
                mInfo[i][0][1],
                document.getElementById(`task${i}text`),
                document.getElementById(`task${i}check`)
              );
            }

            checkSign(
              mInfo[i][D][1],
              document.getElementById(`subtask${i}_${D}text`),
              document.getElementById(`subtask${i}_${D}check`)
            );
          });
      }
    }
  }
}

function checkSign(indicator, text, checksign) {
  if (indicator === 0) {
    text.style.textDecoration = "none";
    text.style.color = "black";
    checksign.innerHTML = "<h2></h2>";
    save();
  } else {
    text.style.textDecoration = "line-through";
    text.style.color = "green";
    checksign.innerHTML = "<h2>✔️</h2>";
    save();
  }
}

function save() {
  localStorage.setItem("data", JSON.stringify(mInfo));
}

function getDataFromLocalStorage() {
  mInfo = JSON.parse(localStorage.getItem("data"));
}

function cleardata() {
  localStorage.clear();

  let a = ["", [["", 0]]];
  localStorage.setItem("data", JSON.stringify(a));
  console.log("clear!");
  render();
}

function date() {
  var currentdate = new Date();
  var date = `${currentdate.getDate()}/${currentdate.getMonth()}/${currentdate.getFullYear()}`
  return date
}
