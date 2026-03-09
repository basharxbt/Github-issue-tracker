const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

const bugArray = (arr) => {
  const bugElement = arr.map((bug) => {
    if (bug === "bug") {
      return `<p class="bg-red-200 px-6 text-red-700 rounded-2xl "><i class="fa-solid fa-bug"></i> ${bug} </p>`;
    } else if (bug === "help wanted") {
      return ` 
        <p class="bg-yellow-100 px-6 text-yellow-700  rounded-2xl"> 
          <i class="fa-solid fa-handshake-angle"></i>
           ${bug}</p>`;
    } else if (bug === "enhancement") {
      return ` 
        <p class="bg-green-200 px-6 text-green-900  rounded-2xl"> 
         
           ${bug}</p>`;
    } else if (bug === "good first issue") {
      return ` 
        <p class="bg-gray-300 px-6 text-neutral-900  rounded-2xl"> 
         
           ${bug}</p>`;
    } else {
      return ` 
        <p class="bg-purple-200 px-6 text-neutral-900  rounded-2xl"> 
         
           ${bug}</p>`;
    }
  });
  return bugElement.join(" ");
};

const issueModalDetails = (id) => {
  console.log(id);
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((response) => response.json())
    .then((modal) => {
      displayModal(modal.data);
    });
};

const displayModal = (modal) => {
  const modalContainer = document.getElementById("modalInfo");
  modalContainer.innerHTML = `
   <div  class="p-2 rounded-lg space-y-4">
  
      <h3 class="font-semibold text-[20px]"> ${modal.title} </h3>
     <div class="flex gap-3"> 
      <p class="bg-green-700 rounded-2xl text-white px-3">${modal.status}</p>
    <p> <i class="fa-solid fa-circle fa-sm"></i> ${modal.author}</p>
    <p><i class="fa-solid fa-circle fa-sm"></i> ${new Date(modal.updatedAt).toLocaleDateString("en-US")}</p>
    </div>
      <div class="flex gap-2">
       ${bugArray(modal.labels)}
        </div>
    <p class="text-neutral/60">${modal.description}</p>
    
 <div class="flex justify-between bg-gray-200 rounded-lg p-3">
  <div>
    <p  class="text-neutral/70">Assignee:</p>
    <p class="text-[16px] font-semibold">${modal.assignee ? modal.assignee : "Unknown"}</p>
  </div>
  <div>
    <p  class="text-neutral/70">Priority:</p>
     ${priorityAll(modal.priority)}


  </div>
 </div>

       

    </div>
  
  `;
  document.getElementById("issue_modal").showModal();
};

let toggleStatus = [];
const issues = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      toggleStatus = data.data;
      displayIssues(toggleStatus);
    });
};

const priorityAll = (priority) => {
  if (priority === "high") {
    return `<p class="bg-red-200 px-6  rounded-2xl">${priority}</p> `;
  } else if (priority === "medium") {
    return `<p class="bg-yellow-100 px-6 text-yellow-700  rounded-2xl">${priority}</p> `;
  } else if (priority === "low") {
    return `<p class="bg-gray-300 px-6 text-neutral-900 rounded-2xl">${priority}</p> `;
  }
};

const displayIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";
  issues.forEach((issue) => {
    manageSpinner(true);
    const issueDiv = document.createElement("div");
    const status = issue.status;
    const priority = issue.priority;

    if (status === "open") {
      issueDiv.innerHTML = `
       <div onclick="issueModalDetails(${issue.id})"
class="shadow-xl p-4 sm:p-5 border-t-4 border-green-500 rounded-lg bg-white flex flex-col h-full">
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <img class="w-6 h-6 sm:w-7 sm:h-7" src="./assets/Open-Status.png" alt="status" />
      ${priorityAll(issue.priority)}
    </div>
    <h3 class="font-semibold text-lg sm:text-xl break-words line-clamp-2 min-h-[3rem]">
      ${issue.title}
    </h3>
    <p class="text-neutral/60 text-sm sm:text-base break-words line-clamp-2">
      ${issue.description}
    </p>
    <div class="flex flex-wrap gap-2">
      ${bugArray(issue.labels)}
     </div>
    </div>
    <div class="mt-auto">
    <hr class="border-neutral/20 my-2">
    <div class="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm text-neutral/60 gap-1">
      <p>#${issue.id} ${issue.author}</p>
      <p>${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
    </div>
  </div>
</div>
    `;
    } else if (status === "closed") {
      issueDiv.innerHTML = `
        <div onclick='issueModalDetails(${issue.id})' class="shadow-xl p-4 sm:p-5 border-t-4 border-green-500 rounded-lg bg-white flex flex-col h-full">
     <div class="flex justify-between">
    <img src="./assets/Closed- Status .png" alt="" />
    ${priorityAll(issue.priority)}
  </div>
  <h3 class="font-semibold text-lg sm:text-xl break-words min-h-[3rem] line-clamp-2">
    ${issue.title}
  </h3>
  <p class="text-neutral/60 text-sm sm:text-base break-words line-clamp-2">
    ${issue.description}
  </p>
  <div class="flex flex-wrap gap-2">
    ${bugArray(issue.labels)}
  </div>
  <div class="mt-auto">
    <hr class="border-neutral/20 my-2">
    <div class="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm text-neutral/60 gap-1">
      <p class="text-neutral/60">#${issue.id} ${issue.author}</p>
      <p class="text-neutral/60">${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
    </div>
  </div>
</div>
    `;
    }
    issuesContainer.appendChild(issueDiv);
  });
  manageSpinner(false);
  totalCount();
};

const totalCount = () => {
  const issueCount = document.getElementById("issue-count");
  const allCount = document.getElementById("issues-container").children.length;
  issueCount.innerText = allCount;
  console.log(allCount);
};

const clickToggle = (id) => {
  manageSpinner(true);

  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  document.getElementById(id).classList.add("btn-primary");

  setTimeout(() => {
    if (id === "all-btn") {
      displayIssues(toggleStatus);
    } else if (id === "open-btn") {
      const openIssues = toggleStatus.filter(
        (issue) => issue.status === "open",
      );
      displayIssues(openIssues);
    } else if (id === "closed-btn") {
      const closedIssues = toggleStatus.filter(
        (issue) => issue.status === "closed",
      );
      displayIssues(closedIssues);
    }

    manageSpinner(false);
  }, 200);
};

document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  let searchValue = searchInput.value;
  manageSpinner(true);
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`)
    .then((res) => res.json())
    .then((search) => {
      const allSearch = search.data;
      allBtn.classList.remove("btn-primary");
      openBtn.classList.remove("btn-primary");
      closedBtn.classList.remove("btn-primary");

      const matchedData = allSearch.filter((issue) =>
        issue.title.toLowerCase().includes(searchValue.toLowerCase()),
      );

      displayIssues(matchedData);
      manageSpinner(false);
    });
});

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("issues-container").classList.add("hidden");
    document.getElementById("spinner").classList.remove("hidden");
  } else {
    document.getElementById("issues-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
issues();
