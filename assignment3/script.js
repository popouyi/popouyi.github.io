// ------------------------------------------------------------------------
// TEAM SELECTION SYSTEM, CHARACTER MANAGEMENT + DRAG & DROP FUNCTIONALITY
// ------------------------------------------------------------------------
// This is my complete team selection system for a small RPG-style game UI.
// I used ideas I saw in YouTube tutorials about drag-and-drop mechanics,
// "Vanilla JavaScript Project: Team Picker Game UI" by Dev Ed
// plus some tweaks I made myself after testing and debugging multiple times.
// ------------------------------------------------------------------------

// -----Character Data & Variables-----------------------------------------
// First, I set up all the character data and variables needed for the team system.
// I organized the characters inside an array so that I can easily loop through them
// and dynamically create character cards in the DOM (instead of hardcoding HTML).
// I followed this technique from a front-end tutorial I watched on YouTube about
// "Creating draggable cards with vanilla JavaScript" it made everything cleaner.
// I learned this data structure approach from a video called
// “JavaScript Objects and Arrays Explained” by Programming with Mosh.
const characters = [
  {
    id: 1,
    name: "Piggy Tank",
    level: 70,
    color: "#ff69b4",
    image: "piggy-tank.png",
    description:
      "A powerful tank with high defense and crowd control abilities.",
  },
  {
    id: 2,
    name: "Flaming Rooster",
    level: 60,
    color: "#ff8c00",
    image: "flaming-rooster.png",
    description: "Deals massive area damage with fire spells.",
  },
  {
    id: 3,
    name: "Rabbit Reaper",
    level: 54,
    color: "#9370db",
    image: "rabbit-reaper.png",
    description: "High single-target damage with critical strikes.",
  },
  {
    id: 4,
    name: "Thunder Cat",
    level: 70,
    color: "#ffd700",
    image: "thunder-cat.png",
    description: "Rapid attacks with lightning element damage.",
  },
  {
    id: 5,
    name: "Ninja Cow",
    level: 65,
    color: "#696969",
    image: "ninja-cow.png",
    description: "Balanced fighter with self-healing abilities.",
  },
];

// Team setup, I made it hold 4 characters (instead of 5 like some games),
// because it keeps team composition tighter and avoids unbalanced setups.
let selectedTeam = [null, null, null, null];
let draggedCharacter = null; // Keeps track of which character card is currently being dragged
// ------------------------------------------------------------------------

// -----Character List Creation--------------------------------------------
// This function dynamically creates all the character cards at the bottom section.
// I learned about using `document.createElement()` and template literals together
// from a YouTube video by "Web Dev Simplified",  it made DOM creation so much easier!
// Each character becomes a draggable card with color, image, and level.
function initCharacterList() {
  const characterList = document.getElementById("characterList");
  if (!characterList) return;
  characterList.innerHTML = ""; // Clear existing cards to prevent duplicates after re-render

  // Loop through the characters array and generate a card for each one
  characters.forEach((char) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.dataset.charId = String(char.id);

    // Check if character is already part of the team
    const isInTeam = selectedTeam.some((teamChar) => teamChar?.id === char.id);
    if (isInTeam) {
      card.classList.add("in-team");
      card.draggable = false; // Disable dragging for those already assigned
    } else {
      card.draggable = true; // Only available ones can be dragged
    }

    // Build card UI using template literals
    card.innerHTML = `
      <div class="card-avatar" style="background: ${char.color};">
        <img src="${char.image}" alt="${char.name}" class="char-image">
      </div>
      <div class="card-level">Lv.${char.level}</div>
      <div class="card-name">${char.name}</div>
      ${isInTeam ? '<div class="checkmark">✓</div>' : ""}
    `;

    // Connect drag and click interactions
    // (I learned about drag events from MDN Docs and a tutorial by "Programming with Mosh")
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("click", () => showCharacterInfo(char));

    characterList.appendChild(card);
  });
}
// ------------------------------------------------------------------------

// -----Drag and Drop System-----------------------------------------------
// This section manages dragging characters from the list into the team slots.
// I used the native HTML5 drag and drop API for this,  it was confusing at first,
// but I figured it out after watching multiple videos on it (especially on Fireship).
// The idea is simple: dragstart stores which character is being moved, and drop places it.

// Fired when dragging begins on a character card
function handleDragStart(e) {
  const charId = parseInt(e.currentTarget.dataset.charId, 10);
  draggedCharacter = characters.find((c) => c.id === charId) || null;
  if (e.dataTransfer) {
    e.dataTransfer.setData("text/plain", String(charId));
    e.dataTransfer.effectAllowed = "move";
  }
}

// Allows drop targets (team slots) to accept dragged elements
function handleDragOver(e) {
  e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
}

// Adds a visual highlight when the dragged character enters a valid slot
function handleDragEnter(e) {
  e.currentTarget.classList.add("drag-over");
}

// Removes the highlight when the dragged character leaves a slot area
function handleDragLeave(e) {
  e.currentTarget.classList.remove("drag-over");
}

// Handles the actual drop event when character is placed into a slot
function handleDrop(e) {
  e.preventDefault();
  const slot = e.currentTarget;
  slot.classList.remove("drag-over");

  // Safety check to recover the dragged data (in case of refresh or fast drag)
  if (!draggedCharacter && e.dataTransfer) {
    const idStr = e.dataTransfer.getData("text/plain");
    const id = parseInt(idStr, 10);
    if (!Number.isNaN(id))
      draggedCharacter = characters.find((c) => c.id === id) || null;
  }

  if (slot && draggedCharacter) {
    const slotIndex = parseInt(slot.dataset.slot, 10);

    // Prevent duplicates by removing old instance of the character if found
    const existingIndex = selectedTeam.findIndex(
      (char) => char?.id === draggedCharacter.id
    );
    if (existingIndex !== -1) {
      selectedTeam[existingIndex] = null;
    }

    // Assign the dragged character to the new slot position
    selectedTeam[slotIndex] = draggedCharacter;
    draggedCharacter = null;

    // Update both UI sections to reflect the change
    updateTeamDisplay();
    initCharacterList();
  }
}
// ------------------------------------------------------------------------

// -----Team Display Updates-----------------------------------------------
// This part refreshes the team slots every time a character is added, moved, or removed.
// It dynamically creates HTML content for each slot based on `selectedTeam`.
// I learned about dynamically updating UIs in a YouTube crash course on
// "DOM Manipulation in JavaScript" it’s all about replacing innerHTML smartly.
function updateTeamDisplay() {
  const slots = document.querySelectorAll(".slot");
  slots.forEach((slot, index) => {
    const char = selectedTeam[index];
    slot.dataset.slot = String(index);

    if (char) {
      slot.innerHTML = `
        <div class="character-in-slot" style="background: ${char.color};" draggable="true" data-slot-index="${index}">
          <div class="char-avatar" style="background: ${char.color}; border: 3px solid white;">
            <img src="${char.image}" alt="${char.name}" class="char-image">
          </div>
          <div class="char-level">Lv.${char.level}</div>
          <button class="remove-btn" data-remove="${index}">✕</button>
        </div>
      `;

      // Enable reordering by dragging characters already in team
      const charElement = slot.querySelector(".character-in-slot");
      if (charElement)
        charElement.addEventListener("dragstart", handleSlotDragStart);

      // Quick remove button (I added this after testing user-friendliness)
      const removeBtn = slot.querySelector(".remove-btn");
      if (removeBtn) {
        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          removeFromTeam(index);
        });
      }
    } else {
      slot.innerHTML = ""; // Reset empty slot visuals
    }
  });

  updateTeamLimits(); // Update capacity dots at the bottom
}

// Allows dragging existing team members to different slots
function handleSlotDragStart(e) {
  const slotIndex = parseInt(e.currentTarget.dataset.slotIndex, 10);
  draggedCharacter = selectedTeam[slotIndex];
  selectedTeam[slotIndex] = null;
  if (e.dataTransfer && draggedCharacter) {
    e.dataTransfer.setData("text/plain", String(draggedCharacter.id));
    e.dataTransfer.effectAllowed = "move";
  }
  updateTeamDisplay();
  initCharacterList();
}

// Removes a character from a specific team slot
function removeFromTeam(slotIndex) {
  selectedTeam[slotIndex] = null;
  updateTeamDisplay();
  initCharacterList();
}

// Clears the entire team (reset button)
// This idea came from a game UI design tutorial I watched about “Reset States”
function clearTeam() {
  selectedTeam = [null, null, null, null];
  updateTeamDisplay();
  initCharacterList();
}

// Updates the yellow dots below the team, showing how many slots are filled
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
// When you click on a character card, this shows a detailed popup (modal)
// with their name, level, and description.
// I implemented this after watching a YouTube tutorial on “Creating Modals with Vanilla JS”.
// It gave me the idea to make the background clickable to close the modal.
function showCharacterInfo(char) {
  const modal = document.getElementById("characterModal");
  if (!modal) return;
  const modalAvatar = document.getElementById("modalAvatar");
  if (modalAvatar) {
    modalAvatar.style.background = char.color;
    modalAvatar.innerHTML = `<img src="${char.image}" alt="${char.name}" class="char-image">`;
  }
  const nameEl = document.getElementById("modalName");
  if (nameEl) nameEl.textContent = char.name;
  const levelEl = document.getElementById("modalLevel");
  if (levelEl) levelEl.textContent = `Level: ${char.level}`;
  const descEl = document.getElementById("modalDescription");
  if (descEl) descEl.textContent = char.description;

  modal.classList.add("show");
}

// Closes the modal when the close button is pressed
function closeModal() {
  const modal = document.getElementById("characterModal");
  if (modal) modal.classList.remove("show");
}
// ------------------------------------------------------------------------

// -----Event Listeners & Initialization-----------------------------------
// Here I connect all the interactive elements to their functions.
// I used DOMContentLoaded to ensure the DOM is ready before querying elements.
// This approach came from a Stack Overflow post about event binding timing.
document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn) clearBtn.addEventListener("click", clearTeam);

  const modalClose = document.getElementById("modalClose");
  if (modalClose) modalClose.addEventListener("click", closeModal);

  const modal = document.getElementById("characterModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.id === "characterModal") {
        closeModal();
      }
    });
  }

  // Add drag-and-drop listeners to all 4 team slots
  const slots = document.querySelectorAll(".slot");
  slots.forEach((slot) => {
    slot.addEventListener("dragover", handleDragOver);
    slot.addEventListener("dragenter", handleDragEnter);
    slot.addEventListener("dragleave", handleDragLeave);
    slot.addEventListener("drop", handleDrop);
  });

  // Initial UI setup when page loads
  initCharacterList();
  updateTeamDisplay();
});
// ------------------------------------------------------------------------
