const issuesContainer = document.getElementById("issues-container");
const issueCount = document.getElementById("issue-count");

let alldatas = [];
const btnIds = ["btn-all", "btn-open", "btn-close"];


const loadIssues = async () => {
  spinnerTime(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  alldatas = data.data;

  issueCount.innerText = alldatas.length;

  showAllIssuCard(alldatas);
  spinnerTime(false);
};

// level implement by condtion and add styles & text dynamically
const showIssuesLabels = (labels) => {
  const newArraay = labels.map((x) => {
    if (x == "bug") {
      return `<div class="badge badge-soft p-2 bg-[#FEECEC] text-[#EF4444] border-[#FECACA] text-xs"><i class="fa-solid fa-bug"></i>
            BUG</div>`;
    } else if (x == "help wanted") {
      return `<div class="badge badge-soft p-2 bg-[#FFF8DB] text-[#D97706] border-[#FDE68A] text-xs"><i class="fa-solid fa-life-ring"></i> 
        HELP WANTED</div>`;
    } else if (x == "enhancement") {
      return `<div class="badge badge-soft p-2 bg-[#DEFCE8] text-[#00A96E] border-[#BBF7D0] text-xs"><i class="fa-solid fa-ranking-star"></i>
            ENHANCEMENT</div>`;
    } 
    else if (x == "good first issue") {
      return `<div class="badge badge-soft p-2 bg-[#def6fc] text-[#007fa9] border-[#bbe5f7] text-xs"><i class="fa-solid fa-thumbs-up"></i>
            GOOD FIRST ISSUE</div>`;
    } else {
      return `<div class="badge badge-soft p-2 bg-[#fafcde] text-[#a9a600] border-[#f7f6bb] text-xs"><i class="fa-solid fa-file-invoice"></i>
            DOCUMENTATION</div>`;
    }
  });
  const newArraayToString = newArraay.join(" ");

  //   return the string of the new array that has styles conditinally
  return newArraayToString;
};

const spinnerTime = (status) => {
  const spinner = document.getElementById("spinner");

  if (status === true) {
    spinner.classList.remove("hidden");
    issuesContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    issuesContainer.classList.remove("hidden");
  }
};

const spinnerTimeForModal = (status) =>{
  const spinnerOfModal = document.getElementById("spinner-of-modal")
  status === true
  ?spinnerOfModal.classList.remove("hidden"):spinnerOfModal.classList.add("hidden")
}

const showAllIssuCard = (datas) => {
  issuesContainer.innerHTML = "";

  datas.forEach((data) => {
    const id = data.id;
    const title = data.title;
    const description = data.description;
    const status = data.status;
    const labels = data.labels;
    const priority = data.priority;
    const author = data.author;
    const assignee = data.assignee;
    const createdAt = data.createdAt;
    const updatedAt = data.updatedAt;

    const div = document.createElement("div");
    div.innerHTML = `

        <div onclick="showModal(${id})"  class="box-border w-[100%] h-full bg-base-100 rounded-lg border-t-4 ${status == "open" ? "border-[#00A96E]" : "border-[#a855f7]"} ">
          <div class="space-y-3 p-4  border-b-2 border-base-300">
             <div class="flex justify-between"> 
                ${
                  status == "open"
                    ? ` <img src="./assets/Open-Status.png" alt=""> `
                    : ` <img src="./assets/Closed-Status.png" alt="">`
                }
                <div class="badge badge-soft px-3 
                ${
                  priority == "high"
                    ? "bg-[#FEECEC] text-[#EF4444]"
                    : priority == "medium"
                      ? "bg-[#FFF6D1] text-[#F59E0B]"
                      : "bg-[#EEEFF2] text-[#9CA3AF]"
                } 
                ">
                ${priority.toUpperCase()}
                </div>
             </div>
             <div class="space-y-3 ">
              <h2 class="line-clamp-2 text-lg font-semibold">${title}</h2>
              <p class="line-clamp-2 text-sm font-extralight">${description}</p>
              <div class="flex gap-1 space-y-1 flex-wrap">
                ${showIssuesLabels(labels)}
              </div>
             </div>
          </div>
          <div class="p-4 space-y-1">
        <div class="flex justify-between ">
          <p class="text-sm font-extralight">#${id} by ${author}</p>
          <p class="text-sm font-extralight">${new Date(createdAt)
            .toLocaleDateString("en-US")
            .replaceAll("/", "-")}</p>
        </div>
        <div class="flex justify-between mt-2">
          <p class="text-sm font-extralight">Assignee:<br> ${assignee}</p>
          <p class="text-sm font-extralight">Updated:<br> ${new Date(updatedAt)
            .toLocaleDateString("en-US")
            .replaceAll("/", "-")}</p>
        </div>
          </div>
        </div>
        `;

    issuesContainer.append(div);
  });
  showIssuesNotFoundMassage();
};

const showfilterIssues = (status) => {
  if (status === "all") {
    showAllIssuCard(alldatas);
    issueCount.innerText = alldatas.length;
  } else if (status == "open") {
    const filterOfOpen = alldatas.filter((data) => data.status === "open");
    issueCount.innerText = filterOfOpen.length;

    spinnerTime(true);
    setTimeout(()=>{
      spinnerTime(false);
    showAllIssuCard(filterOfOpen);
    }, 500)
  
  } else {
    const filterOfClose = alldatas.filter((data) => data.status === "closed");
    issueCount.innerText = filterOfClose.length;

      spinnerTime(true);
    setTimeout(()=>{
      spinnerTime(false);
    showAllIssuCard(filterOfClose);
    }, 500)
  }
};

const loadSearchIssues = async () => {
  const searchInput = document.getElementById("ipt-search");
  const searchValue = searchInput.value;
  console.log(searchValue.trim());
  btnIds.forEach((btn) => {
    const getBtn = document.getElementById(btn);
    getBtn.classList.remove("btn-primary");
  });
  // search value when emtey
  if (searchValue.trim() === "") {
    document.getElementById("btn-all").classList.add("btn-primary");
    loadIssues();
    return;
  }
  spinnerTime(true);

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue.trim()}`,
  );
  const allDatas = await res.json();
  const searchResult = allDatas.data;

  alldatas = searchResult;
  showAllIssuCard(alldatas);
  issueCount.innerText = alldatas.length;
  spinnerTime(false);
};

const showModal = async (id) => {
  // console.log(id);
spinnerTimeForModal(true);
const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
const object = await res.json();
const datas = object.data;
  showModalCard(datas)
 setTimeout(()=>{
    spinnerTimeForModal(false);
  modal.showModal();
 }, 800)
};

const showModalCard = (data) => {
  // console.log(data)
  // const id = data.id;
  const title = data.title;
  const description = data.description;
  const status = data.status;
  const labels = data.labels;
  const priority = data.priority;
  const author = data.author;
  const assignee = data.assignee;
  const createdAt = data.createdAt;


  const modal = document.getElementById("modal");

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";

  const createElement = document.createElement("div");
  createElement.innerHTML = `
            <div class=" p-4">
              <p class="text-lg font-bold">${title}</p>
              <div class="flex gap-2 mt-2">
                <div class="badge badge-soft text-white px-3 ${status == "open"?"bg-[#00A96E]":"bg-[#a855f7]"}">
                ${status.toUpperCase()}
              </div>
              <p class="text-sm font-extralight flex gap-2"><span>•</span>Opened by ${author}<span>•</span></p>
              <p class="text-sm font-extralight">${new Date(createdAt).toLocaleDateString("en-US").replaceAll("/", "-")}</p>
              </div>
              <div class="labelBox flex mt-6 gap-2">
                ${showIssuesLabels(labels)}
              </div>
              <p class="text-sm font-extralight space-y-0 my-6">${description}</p>
              <div class="grid grid-cols-2 justify-start rounded-md bg-[#F8FAFC] p-4 items-center">
                <div class="space-y-1">
                  <p class="text-sm font-extralight">Assignee:</p>
                  <p class="text-lg font-semibold">${assignee}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-extralight">Priority:</p>
                  <div class="badge badge-soft px-3 
                ${
                  priority == "high"
                    ? "bg-[#FEECEC] text-[#EF4444]"
                    : priority == "medium"
                      ? "bg-[#FFF6D1] text-[#F59E0B]"
                      : "bg-[#EEEFF2] text-[#9CA3AF]"
                } 
                ">
                ${priority.toUpperCase()}
                </div>
                </div>
              </div>
            </div>
          `;
  modalContainer.append(createElement);
};

const activeBtn = (id) => {
  btnIds.forEach((btn) => {
    const getBtn = document.getElementById(btn);
    getBtn.classList.remove("btn-primary");
  });

  const getBtn = document.getElementById(id);
  getBtn.classList.add("btn-primary");
};

const showIssuesNotFoundMassage = () => {
  if (alldatas.length == 0) {
    issuesContainer.innerHTML = `
    <p class="text-lg font-light text-error col-span-4 text-center">NO ISSUES FOUND! </p>
    `;
  }
};

const clock = document.getElementById("clock");

function showTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  clock.innerText = ` ${hours}:${minutes}:${seconds}`;
}
// update per second
setInterval(showTime, 1000);

loadIssues();
