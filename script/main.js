let allIssues = [];

const loadCards = () => {
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
    

    <div class="bg-white shadow-md border-t-4 ${borderColor} rounded-lg">
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
};


document.getElementById("allBtn").addEventListener("click", () => {
  displayCards(allIssues);
  setActive("allBtn");
});

document.getElementById("openBtn").addEventListener("click", () => {
  const openIssues = allIssues.filter((issue) => issue.status === "open");
  displayCards(openIssues);
  setActive("openBtn");
});

document.getElementById("closedBtn").addEventListener("click", () => {
  const closedIssues = allIssues.filter((issue) => issue.status === "closed");
  displayCards(closedIssues);
  setActive("closedBtn");
});



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





