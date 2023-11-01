const main = document.getElementById("main");

document.getElementById("clearAllBTN").addEventListener("click", ()=>{
  cleardata()
})

let mInfo = {
  name_of_list: "",
  task1: [["", 0]],
};
render();

//-----------------functions--------------------------//

function render() {
  getDataFromLocalStorage()
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
  save();
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
  mInfo[`task${i + 1}`] = [["", 0]];
  save();
  //console.log(mInfo);
  render();
}
function DelTask(i) {
  controls();
  //console.log(i);
  delete mInfo[`task${i}`];
  save();
  //console.log(mInfo);
  render();
}
function DelSubTask(i, d) {
  controls();
  mInfo[`task${i}`].splice(d, 1);
  save();
  render();
}
function addSubTask(i) {
  controls();
  mInfo[`task${i}`].push(["", 0]);
  save();
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
      save();
      //console.log(`task changed ${mInfo[`task${i}`][0][0]}`);
    });

    for (let D = 1; D < mInfo[`task${i}`].length; D++) {
      let subtask = document.getElementById(`subtask${i}_${D}text`);
      subtask.addEventListener("keyup", () => {
        mInfo[`task${i}`][D][0] = subtask.value;
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
  for (let i = 1; i < Object.keys(mInfo).length; i++) {
    if (mInfo[`task${i}`].length == 1) {
      //console.log("hey");

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
      //console.log("hello");

      let B = 0;
      for (let D = 1; D < mInfo[`task${i}`].length; D++) {
        //console.log(mInfo[`task${i}`][D][1]);

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
              save();
            } else {
              mInfo[`task${i}`][D][1] = 0;
              save();
            }

            let A = mInfo[`task${i}`].length - 1;
            let B = 0;

            for (let b = 1; b < mInfo[`task${i}`].length; b++) {
              B += mInfo[`task${i}`][b][1];
              save()
            }

            console.log(`A = ${A}   B = ${B}`);

            if (A === B) {
              getDataFromLocalStorage()
              console.log("it's time");
              mInfo[`task${i}`][0][1] = 1;
              checkSign(
                mInfo[`task${i}`][0][1],
                document.getElementById(`task${i}text`),
                document.getElementById(`task${i}check`)
              );
            } else {
              getDataFromLocalStorage()
              mInfo[`task${i}`][0][1] = 0;
              checkSign(
                mInfo[`task${i}`][0][1],
                document.getElementById(`task${i}text`),
                document.getElementById(`task${i}check`)
              );
            }

            checkSign(
              mInfo[`task${i}`][D][1],
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
    save()
  } else {
    text.style.textDecoration = "line-through";
    text.style.color = "green";
    checksign.innerHTML = "<h2>✔️</h2>";
    save()
  }
}



function save(){
  localStorage.setItem("data", JSON.stringify(mInfo))
}

function getDataFromLocalStorage(){
  mInfo = JSON.parse(localStorage.getItem("data"))
}



function cleardata(){
  localStorage.clear()
  
  let a = {
    name_of_list: "",
    task1: [["", 0]],
  };
  localStorage.setItem("data", JSON.stringify(a))
  console.log("clear!")
  render()
  
}