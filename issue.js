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

const priorityAll = (priority) => {
  if (priority === "high") {
    return `<p class="bg-red-200 px-6  rounded-2xl">${priority}</p> `;
  } else if (priority === "medium") {
    return `<p class="bg-yellow-100 px-6 text-yellow-700  rounded-2xl">${priority}</p> `;
  } else if (priority === "low") {
    return `<p class="bg-gray-300 px-6 text-neutral-900 rounded-2xl">${priority}</p> `;
  }
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

const displayIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-container");

  const toggleStatus = "allBtn";
  issuesContainer.innerHTML = "";
  issues.forEach((issue) => {
    const issueDiv = document.createElement("div");
    const status = issue.status;
    const priority = issue.priority;

    if (toggleStatus === "allBtn") {
    }

    if (status === "open") {
      issueDiv.innerHTML = `
         <div class=" shadow-xl p-5 border-t-3 border-green-500 rounded-lg space-y-3">
  <div class="flex justify-between h-full ">
        <img src="./assets/Open-Status.png" alt="" />
       ${priorityAll(issue.priority)}
      </div>
      <h3 class="font-semibold text-[20px]"> ${issue.title} </h3>
      <p class="text-neutral/60">${issue.description}</p>
      <div class="flex gap-2">
       ${bugArray(issue.labels)}
        </div>
        <hr>

        <span class="border-t-2"></span>
        <p class="text-neutral/60">#${issue.id} ${issue.author}</p>

        <p class="text-neutral/60">${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
      

    </div>
    
    `;
    } else if (status === "closed") {
      issueDiv.innerHTML = `
         <div class=" shadow-xl p-5 border-t-3 border-purple-500 rounded-lg space-y-3">
  <div class="flex justify-between h-full ">
        <img src="./assets/Closed- Status .png" alt="" />
        ${priorityAll(issue.priority)}
      </div>
      <h3 class="font-semibold text-[20px]"> ${issue.title} </h3>
      <p class="text-neutral/60">${issue.description}</p>
      <div class="flex gap-2">
        ${bugArray(issue.labels)}
        </div>
        <hr>

        <span class="border-t-2"></span>
        <p class="text-neutral/60">#${issue.id} ${issue.author}</p>

        <p class="text-neutral/60">${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
      

    </div>
    
    `;
    }

    issuesContainer.appendChild(issueDiv);
  });
  totalCount();
};

// allBtn.addEventListener("click", () => {});

// openBtn.addEventListener("click", () => {});

// closedBtn.addEventListener("click", () => {
//   const closedIssues = toggleStatus.filter(
//     (issue) => issue.status === "closed",
//   );
//   displayIssues(closedIssues);
// });

const totalCount = () => {
  const issuCount = document.getElementById("issue-count");
  const allCount = document.getElementById("issues-container").children.length;
  issuCount.innerText = allCount;
  console.log(allCount);
};

const clickToggle = (id) => {
  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  document.getElementById(id).classList.add("btn-primary");

  if (id === "all-btn") {
    issues();
    displayIssues(toggleStatus);
  } else if (id === "open-btn") {
    const openIssues = toggleStatus.filter((issue) => issue.status === "open");
    displayIssues(openIssues);
  } else if (id === "closed-btn") {
    const closedIssues = toggleStatus.filter(
      (issue) => issue.status === "closed",
    );
    displayIssues(closedIssues);
  }
};

issues();
