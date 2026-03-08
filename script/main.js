let allIssues = [];

const loadCards = () => {

  manageSpiner(true)


  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data;
      displayCards(allIssues);
    });
};

const displayCards = (cards) => {
  const cardContainer = document.getElementById("card-container");
  const issuesCount = document.getElementById("issues-count");

  cardContainer.innerHTML = "";


   if (cards.length === 1) {
  issuesCount.innerText = "1 Issue";
} else {
  issuesCount.innerText = cards.length + " Issues";
}

  cards.forEach((card) => {
    let statusImage = "";

    if (card.status === "open") {
      statusImage = `<img src="./assets/Open-Status.png" class="w-6 h-6 object-contain"/>`;
    } else {
      statusImage = `<img src="./assets/Closed-Status.png" class="w-6 h-6 object-contain"/>`;
    }



    let borderColor = "";

if (card.status === "open") {
  borderColor = "border-[#00A96E]";
} else {
  borderColor = "border-[#A855F7]"; 
}

   

    let badgeColor = "";

    if (card.priority === "high") {
      badgeColor = "text-[#EF4444] bg-[#FEECEC]";
    } else if (card.priority === "medium") {
      badgeColor = "text-[#F59E0B] bg-[#FFF6D1]";
    } else {
      badgeColor = "text-[#9CA3AF] bg-[#EEEFF2]";
    }


   const labelStyles = {
  bug: "text-[#EF4444] bg-[#FEECEC]",
  "help wanted": "text-[#D97706] bg-[#FFF6D1]",
  enhancement: "text-[#16A34A] bg-[#DCFCE7]",
  documentation: "text-[#2563EB] bg-[#DBEAFE]",
  "good first issue": "text-[#7C3AED] bg-[#EDE9FE]",
};

const labels = card.labels
  .filter((label) =>
    Object.keys(labelStyles).includes(label)
  )
  .map((label) => {
    return `
      <span class="text-sm font-medium px-3 py-1 whitespace-nowrap rounded-full uppercase ${labelStyles[label]}">
        ${label}
      </span>
    `;
  })
  .join("");


    const allCards = document.createElement("div");
    allCards.innerHTML = `
    

    <div onclick="loadCardDetail(${card.id})" class="bg-white shadow-md border-t-4 ${borderColor} rounded-lg">
          <div class="flex flex-col gap-3 px-3 py-6">
            <div class="flex justify-between items-center">
              <div>${statusImage}</div>

              <div
                class="badge px-5 py-3 text-base rounded-full uppercase ${badgeColor}"
              >
                ${card.priority}
              </div>
            </div>

            <h2 class="card-title text-base text-[#1F2937] font-semibold line-clamp-1">
              ${card.title}
            </h2>

            <p class="text-[#64748B] text-sm line-clamp-2">${card.description}</p>

            <div class="flex gap-2">${labels}</div>
          </div>

          <div class="border-t px-6 py-3 text-sm text-[#64748B]">
            <p class="pb-2">#${card.id} by ${card.author}</p>
            <p>${new Date(card.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
    

    `;

    cardContainer.append(allCards);
  });

  manageSpiner(false)
};


document.getElementById("allBtn").addEventListener("click", () => {
  manageSpiner(true)
  displayCards(allIssues);
  setActive("allBtn");
});

document.getElementById("openBtn").addEventListener("click", () => {
  manageSpiner(true)
  const openIssues = allIssues.filter((issue) => issue.status === "open");
  displayCards(openIssues);
  setActive("openBtn");
});



document.getElementById("closedBtn").addEventListener("click", () => {
  manageSpiner(true)
  const closedIssues = allIssues.filter((issue) => issue.status === "closed");
  displayCards(closedIssues);
  setActive("closedBtn");
});


const manageSpiner = (status) =>{
 if(status == true){
  document.getElementById("spinner").classList.remove("hidden")
  document.getElementById("card-container").classList.add("hidden")
 }
 else{
  
  document.getElementById("card-container").classList.remove("hidden")
  document.getElementById("spinner").classList.add("hidden")
 }
}


const loadCardDetail = async (id) =>{

  const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

  const res = await fetch(url);
  const detail = await res.json();
  showCardDatail(detail.data)
}

const showCardDatail = (card) => {


  let statusColor = "";

if (card.status === "open") {
  statusColor = "bg-[#00A96E] text-white";
} else {
  statusColor = "bg-[#A855F7] text-white";
}


let badgeColor = "";

    if (card.priority === "high") {
      badgeColor = "text-white bg-[#EF4444]";
    } else if (card.priority === "medium") {
      badgeColor = "text-white bg-[#D97706]";
    } else {
      badgeColor = "text-white bg-[#9CA3AF]";
    }

  const labelStyles = {
  bug: "text-[#EF4444] bg-[#FEECEC]",
  "help wanted": "text-[#D97706] bg-[#FFF6D1]",
  enhancement: "text-[#16A34A] bg-[#DCFCE7]",
  documentation: "text-[#2563EB] bg-[#DBEAFE]",
  "good first issue": "text-[#7C3AED] bg-[#EDE9FE]",
};

const labels = card.labels
  .filter((label) => Object.keys(labelStyles).includes(label))
  .map((label) => {
    return `
      <span class="text-sm font-medium px-3 py-1 whitespace-nowrap rounded-full uppercase ${labelStyles[label]}">
        ${label}
      </span>
    `;
  })
  .join("");
 

  const detailModal = document.getElementById("detail-container");
  detailModal.innerHTML = `
  
  <div>
            <h3 id="issue_title" class="text-2xl font-bold mb-2">
              ${card.title}
            </h3>

            <div class="flex items-center gap-2 text-sm mb-4">
              <span class="badge ${statusColor} rounded-full text-sm text-white">${card.status}</span>
              <span>•</span>
              <span
                 class="text-[#64748B]">Opened by
                <span id="issue_author"
                  >${card.author}</span
                ></span
              >
              <span>•</span>
              <span id="issue_date" class="text-[#64748B]">${new Date(card.createdAt).toLocaleDateString()}</span>
            </div>

            <div class="flex gap-2 mb-4 -translate-x-3 py-3">
              <span class="badge">${labels}</span>
            </div>

            <p id="issue_description" class="text-[#64748B] text-base mb-6">
              ${card.description}
            </p>

            <div class="bg-base-200 p-4 rounded-lg flex items-center gap-40">
              <div>
                <p class="text-base text-[#64748B]">Assignee:</p>
                <p id="issue_assignee" class="font-semibold text-base text-[#1F2937]">${card.author}</p>
              </div>

              <div>
                <p class="text-base text-[#64748B]">Priority</p>
                <span id="issue_priority" class="badge ${badgeColor} rounded-full text-lg">${card.priority}</span>
              </div>
            </div>
          </div>
  `

  document.getElementById("my_modal_5").showModal()
}


const setActive = (activeId) => {
  const buttons = ["allBtn", "openBtn", "closedBtn"];

  buttons.forEach((id) => {
    const btn = document.getElementById(id);

    btn.classList.remove("btn-primary");

    if (id === activeId) {
      btn.classList.add("btn-primary");
    }
  });
};


loadCards();


document.getElementById("search-btn").addEventListener("click", () => {

  const input = document.getElementById("search-input");
  const searchValue = input.value.trim().toLowerCase();

  manageSpiner(true);

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {

      const allIssues = data.data;

      const filterIssues = allIssues.filter((issue) =>
        issue.title.toLowerCase().includes(searchValue)
      );

      displayCards(filterIssues);

    });
});













