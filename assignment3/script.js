// First, I set up all the character data and variables needed for the team selection system.
// I organized the characters in an array to make it easier to manage and loop through them
// -----Character Data & Variables-----------------------------------------
const characters = [
  {
    id: 1,
    name: "Piggy Tank",
    level: 70,
    color: "#ff69b4",
    icon: "🛡️",
    description:
      "A powerful tank with high defense and crowd control abilities.",
  },
  {
    id: 2,
    name: "Flaming Rooster",
    level: 60,
    color: "#ff8c00",
    icon: "🔥",
    description: "Deals massive area damage with fire spells.",
  },
  {
    id: 3,
    name: "Ninja Octopus",
    level: 54,
    color: "#9370db",
    icon: "🗡️",
    description: "High single-target damage with critical strikes.",
  },
  {
    id: 4,
    name: "Thunder Cat",
    level: 70,
    color: "#ffd700",
    icon: "⚡",
    description: "Rapid attacks with lightning element damage.",
  },
  {
    id: 5,
    name: "Ninja Cow",
    level: 65,
    color: "#696969",
    icon: "⚔️",
    description: "Balanced fighter with self-healing abilities.",
  },
];

// Team setup - I made it hold 4 characters instead of 5 to keep teams balanced
let selectedTeam = [null, null, null, null];
let draggedCharacter = null; // This keeps track of which character is being dragged
let sortByLevel = false; // This helps me know if the list should be sorted or not
// ------------------------------------------------------------------------

// -----Character List Creation--------------------------------------------
// This function creates all the character cards at the bottom of the screen
// I loop through each character and create a draggable card for them
function initCharacterList() {
  const characterList = document.getElementById("characterList");
  characterList.innerHTML = ""; // Clear the list first to avoid duplicates

  // Sort characters by level if the sort button was clicked
  let sortedCharacters = [...characters];
  if (sortByLevel) {
    sortedCharacters.sort((a, b) => b.level - a.level); // Higher levels first
  }

  sortedCharacters.forEach((char) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.draggable = true;
    card.dataset.charId = char.id;

    // Check if character is already in team to show the checkmark
    const isInTeam = selectedTeam.some((teamChar) => teamChar?.id === char.id);
    if (isInTeam) {
      card.classList.add("in-team");
      card.draggable = false; // Can't drag if already in team
    }

    // Build the card's HTML with all the character info
    card.innerHTML = `
            <div class="card-avatar" style="background: ${char.color};">${
      char.icon
    }</div>
            <div class="card-level">Lv.${char.level}</div>
            <div class="card-name">${char.name}</div>
            ${isInTeam ? '<div class="checkmark">✓</div>' : ""}
        `;

    // Add the drag and click events to each card
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("click", () => showCharacterInfo(char));

    characterList.appendChild(card);
  });
}
// ------------------------------------------------------------------------

// -----Drag and Drop System-----------------------------------------------
// These functions handle dragging characters from the bottom list into team slots
// I followed a similar approach to what we learned in class for drag and drop

// When you start dragging a character card
function handleDragStart(e) {
  const charId = parseInt(e.target.dataset.charId);
  draggedCharacter = characters.find((c) => c.id === charId);
  e.dataTransfer.effectAllowed = "move";
}

// This allows the slot to accept the dropped character
function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

// Visual feedback when hovering over a slot (I added this to make it more interactive)
function handleDragEnter(e) {
  if (e.target.classList.contains("slot")) {
    e.target.classList.add("drag-over");
  }
}

// Remove the visual feedback when leaving the slot
function handleDragLeave(e) {
  if (e.target.classList.contains("slot")) {
    e.target.classList.remove("drag-over");
  }
}

// When you drop the character into a slot
function handleDrop(e) {
  e.preventDefault();
  const slot = e.target.closest(".slot");
  if (slot && draggedCharacter) {
    slot.classList.remove("drag-over");
    const slotIndex = parseInt(slot.dataset.slot);

    // Check if character is already in team and remove from old spot
    const existingIndex = selectedTeam.findIndex(
      (char) => char?.id === draggedCharacter.id
    );
    if (existingIndex !== -1) {
      selectedTeam[existingIndex] = null;
    }

    // Place character in the new slot
    selectedTeam[slotIndex] = draggedCharacter;
    draggedCharacter = null;
    updateTeamDisplay();
    initCharacterList();
  }
}
// ------------------------------------------------------------------------

// -----Team Display Updates-----------------------------------------------
// This updates what you see in the team slots after adding/removing characters

function updateTeamDisplay() {
  const slots = document.querySelectorAll(".slot");
  slots.forEach((slot, index) => {
    const char = selectedTeam[index];
    if (char) {
      // Create the character display inside the slot
      slot.innerHTML = `
                <div class="character-in-slot" style="background: ${char.color};" draggable="true" data-slot-index="${index}">
                    <div class="char-avatar" style="background: ${char.color}; border: 3px solid white;">${char.icon}</div>
                    <div class="char-level">Lv.${char.level}</div>
                    <button class="remove-btn" data-remove="${index}">✕</button>
                </div>
            `;

      // Allow dragging characters out of slots (for repositioning)
      const charElement = slot.querySelector(".character-in-slot");
      charElement.addEventListener("dragstart", handleSlotDragStart);

      // Add click event to remove button (I added this for easier character removal)
      const removeBtn = slot.querySelector(".remove-btn");
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        removeFromTeam(index);
      });
    } else {
      slot.innerHTML = ""; // Empty slot
    }
  });

  updateTeamLimits(); // Update the dots showing how many characters are in team
}

// When dragging a character that's already in a slot
function handleSlotDragStart(e) {
  const slotIndex = parseInt(e.target.dataset.slotIndex);
  draggedCharacter = selectedTeam[slotIndex];
  selectedTeam[slotIndex] = null; // Remove from current slot
  e.dataTransfer.effectAllowed = "move";
}

// Remove character from team slot
function removeFromTeam(slotIndex) {
  selectedTeam[slotIndex] = null;
  updateTeamDisplay();
  initCharacterList(); // Refresh list to remove checkmark
}

// Clear button functionality (removes all characters from team)
function clearTeam() {
  selectedTeam = [null, null, null, null];
  updateTeamDisplay();
  initCharacterList();
}

// Update the yellow dots that show team capacity
function updateTeamLimits() {
  const filledCount = selectedTeam.filter((char) => char !== null).length;
  const dots = document.querySelectorAll(".limit-dot");
  dots.forEach((dot, index) => {
    if (index < filledCount) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }
  });
}
// ------------------------------------------------------------------------

// -----Character Info Modal-----------------------------------------------
// When you click on a character card, this shows a popup with their details

function showCharacterInfo(char) {
  const modal = document.getElementById("characterModal");
  document.getElementById("modalAvatar").style.background = char.color;
  document.getElementById("modalAvatar").textContent = char.icon;
  document.getElementById("modalName").textContent = char.name;
  document.getElementById("modalLevel").textContent = `Level: ${char.level}`;
  document.getElementById("modalRole").textContent = "";
  document.getElementById("modalPower").textContent = "";
  document.getElementById("modalDescription").textContent = char.description;
  modal.classList.add("show");
}

// Close the character info popup
function closeModal() {
  document.getElementById("characterModal").classList.remove("show");
}
// ------------------------------------------------------------------------

// -----Filter and Sort Functions------------------------------------------
// These handle the buttons at the bottom left of the screen

// Filter button (placeholder for now, but ready for future features like filtering by type)
function toggleFilter() {
  console.log("Filter button clicked - functionality to be implemented");
  // Could add filtering by character type, element, etc. later
}

// Power button - sorts characters by level
// I added a toggle so clicking it switches between ascending and descending
function togglePowerSort() {
  sortByLevel = !sortByLevel;
  const powerBtn = document.getElementById("powerBtn");

  if (sortByLevel) {
    powerBtn.textContent = "Power: Level ▲"; // Sorted by level
  } else {
    powerBtn.textContent = "Power: Level ▼"; // Default order
  }

  initCharacterList(); // Refresh the list with new sort order
}
// ------------------------------------------------------------------------

// -----Event Listeners----------------------------------------------------
// Here I connect all the buttons to their functions
// I organized these all together to keep track of what does what

// Clear team button
document.getElementById("clearBtn").addEventListener("click", clearTeam);

// Modal close button
document.getElementById("modalClose").addEventListener("click", closeModal);

// Close modal when clicking outside (I added this for better user experience)
document.getElementById("characterModal").addEventListener("click", (e) => {
  if (e.target.id === "characterModal") {
    closeModal();
  }
});

// Add drag and drop listeners to all team slots
// I have to select the slots after the page loads to make sure they exist
const slots = document.querySelectorAll(".slot");
slots.forEach((slot) => {
  slot.addEventListener("dragover", handleDragOver);
  slot.addEventListener("dragenter", handleDragEnter);
  slot.addEventListener("dragleave", handleDragLeave);
  slot.addEventListener("drop", handleDrop);
});
// ------------------------------------------------------------------------

// -----Initialize Everything----------------------------------------------
// When the page loads, create the character list and set up the empty team
// This needs to run after the DOM is fully loaded
initCharacterList();
updateTeamDisplay();
// ------------------------------------------------------------------------
