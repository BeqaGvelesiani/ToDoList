const main = document.getElementById("main");

export let mInfo = {
  name_of_list: "სახელი",
  task1: [["", 0]],
};

render();

//-----------------functions--------------------------//

function render() {
  main.innerHTML = `
      <input class="bordered" type="text" placeholder="type list name" value="${mInfo.name_of_list}" id="ListName"/>
    `;

  for (let i = 1; i < Object.keys(mInfo).length; i++) {
    main.innerHTML += `
      <div class="task" id="t${i}"> 
        <div class="task_name bordered" id="task${i}">
          <button class="checkbox" id="task${i}check"></button>
          <input class="job" id="task${i}text" type="text" placeholder="type task" value="${
      mInfo[`task${i}`][0][0]
    }" />
          <button class="addBTN popupADD" id="taskicheck">
            <span class="material-symbols-outlined icon " id="add${i}">add</span>
          </button>
          <button class="addBTN popupDEL" id="taskicheck">
            <span class="material-symbols-outlined icon" id="del${i}">delete</span>
          </button>
          
        </div>
      </div>
      `;

    for (let D = 1; D < mInfo[`task${i}`].length; D++) {
      let text = mInfo[`task${i}`][D][0];
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
  mInfo.name_of_list = ListName.value;
  //console.log(`name changed: ${mInfo.name_of_list}`);
});
// ---↑--- rename the list ---↑---//
//
// ---↓--- control unit (this unit controls buttons and other) ---↓---//
function controls() {
  for (let i = 1; i < Object.keys(mInfo).length; i++) {
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
    for (let D = 1; D < mInfo[`task${i}`].length; D++) {
      document
        .getElementById(`subtask${i}_${D}text`)
        .addEventListener("keyup", function (e) {
          mInfo[`task${i}`][D][0] = document.getElementById(
            `subtask${i}_${D}text`
          ).value;
          console.log(mInfo);
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
  mInfo[`task${i + 1}`] = [["", 0]];
  //console.log(mInfo);
  render();
}
function DelTask(i) {
  controls();
  //console.log(i);
  delete mInfo[`task${i}`];
  //console.log(mInfo);
  render();
}
function DelSubTask(i, d) {
  controls();
  mInfo[`task${i}`].splice(d, 1);
  render();
}
function addSubTask(i) {
  controls();
  mInfo[`task${i}`].push(["", 0]);
  //console.log(mInfo);
  render();
}
// ---↑--- control unit ---↑---//
//
function makeChanges() {
  for (let i = 1; i < Object.keys(mInfo).length; i++) {
    let task = document.getElementById(`task${i}text`);

    task.addEventListener("keyup", () => {
      mInfo[`task${i}`][0][0] = task.value;
      //console.log(`task changed ${mInfo[`task${i}`][0][0]}`);
    });

    for (let D = 1; D < mInfo[`task${i}`].length; D++) {
      let subtask = document.getElementById(`subtask${i}_${D}text`);
      subtask.addEventListener("keyup", () => {
        mInfo[`task${i}`][D][0] = subtask.value;
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
  for (let i = 1; i < Object.keys(mInfo).length; i++) {
    if (mInfo[`task${i}`].length == 1) {
      console.log("hey");

      checkSign(
        mInfo[`task${i}`][0][1],
        document.getElementById(`task${i}text`),
        document.getElementById(`task${i}check`)
      );

      document.getElementById(`task${i}check`).addEventListener("click", () => {
        if ((mInfo[`task${i}`][0][1] == 0) & (mInfo[`task${i}`][0][0] != "")) {
          mInfo[`task${i}`][0][1] = 1;
        } else {
          mInfo[`task${i}`][0][1] = 0;
        }
        checkSign(
          mInfo[`task${i}`][0][1],
          document.getElementById(`task${i}text`),
          document.getElementById(`task${i}check`)
        );
      });
    } else {
      console.log("hello");

      for (let D = 1; D < mInfo[`task${i}`].length; D++) {
        let state = 0;

        console.log(mInfo[`task${i}`][D][1]);

        checkSign(
          mInfo[`task${i}`][D][1],
          document.getElementById(`subtask${i}_${D}text`),
          document.getElementById(`subtask${i}_${D}check`)
        );

        document
          .getElementById(`subtask${i}_${D}check`)
          .addEventListener("click", () => {
            if (
              (mInfo[`task${i}`][D][1] == 0) &
              (mInfo[`task${i}`][D][0] != "")
            ) {
              mInfo[`task${i}`][D][1] = 1;
              state += 1
            } else {
              mInfo[`task${i}`][D][1] = 0;
              state -= 1;
            }




            checkSign(
              mInfo[`task${i}`][D][1],
              document.getElementById(`subtask${i}_${D}text`),
              document.getElementById(`subtask${i}_${D}check`)
            );
          });

        

        if (A) {
          checkSign(
            mInfo[`task${i}`][0][1],
            document.getElementById(`task${i}text`),
            document.getElementById(`task${i}check`)
          );
        }
      }
    }
  }
}

// for (let i = 1; i < Object.keys(mInfo).length; i++) {
//   let task = document.getElementById(`task${i}check`);
//   let taskText = document.getElementById(`task${i}text`);
//   let taskN = mInfo[`task${i}`][0][1];
//   foo(
//     taskN,
//     taskText,
//     task,
//     mInfo[`task${i}`][0][1],
//     mInfo[`task${i}`].length
//   );

//   for (let D = 1; D < mInfo[`task${i}`].length; D++) {
//     let subtask = document.getElementById(`subtask${i}_${D}check`);
//     let subtasktext = document.getElementById(`subtask${i}_${D}text`);

//     subtask.addEventListener("mouseup", () => {
//       if (subtasktext.value == false) {
//       } else if (mInfo[`task${i}`][D][1] == 0) {
//         subtasktext.style.textDecoration = "line-through";
//         subtasktext.style.color = "green";
//         subtask.innerHTML = "<h2>✔️</h2>";
//         mInfo[`task${i}`][D][1] = 1;
//         //console.log(mInfo);
//         //console.log(tu)
//         taskN += mInfo[`task${i}`][D][1];

//         foo(
//           taskN,
//           taskText,
//           task,
//           mInfo[`task${i}`][D][1],
//           mInfo[`task${i}`].length
//         );
//         console.log("taskN = " + taskN);
//       } else {
//         subtasktext.style.textDecoration = "none";
//         subtasktext.style.color = "black";
//         subtask.innerHTML = "<h2></h2>";
//         mInfo[`task${i}`][D][1] = 0;
//         //console.log(mInfo)
//         taskN -= 1;

//         foo(
//           taskN,
//           taskText,
//           task,
//           mInfo[`task${i}`][D][1],
//           mInfo[`task${i}`].length
//         );
//         console.log("taskN = " + taskN);
//       }
//     });

//       if (mInfo[`task${i}`][D][1]) {
//         subtasktext.style.textDecoration = "line-through";
//         subtasktext.style.color = "green";
//         subtask.innerHTML = "<h2>✔️</h2>";
//       } else {
//         subtasktext.style.textDecoration = "none";
//         subtasktext.style.color = "black";
//         subtask.innerHTML = "<h2></h2>";
//       }
//     }
//   }
// }

function checkSign(indicator, text, checksign) {
  if (indicator === 0) {
    text.style.textDecoration = "none";
    text.style.color = "black";
    checksign.innerHTML = "<h2></h2>";
  } else {
    text.style.textDecoration = "line-through";
    text.style.color = "green";
    checksign.innerHTML = "<h2>✔️</h2>";
  }
}
