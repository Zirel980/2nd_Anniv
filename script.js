/* =========================================
   ANNIVERSARY SETTINGS
========================================= */

// Your second anniversary
const anniversaryDate = new Date("2026-08-19T00:00:00+08:00");


/*
    Each memory unlocks at midnight.

    Memory 1 → August 14
    Memory 2 → August 15
    Memory 3 → August 16
    Memory 4 → August 17
    Memory 5 → August 18

    Final → August 19
*/

const memories = [

    {
        id: 1,

        unlockDate: new Date("2026-08-14T00:00:00+08:00"),

        title: "Where It All Began",

        image: "assets/memory1.jpg",

        letter: `

Do you remember this day?

This is one of the memories that I never want
to forget.

Sometimes I look back at this picture and realize
how much has happened since then.

If I could go back to this moment,
I'd still choose to experience it all over again.

        `
    },


    {
        id: 2,

        unlockDate: new Date("2026-08-15T00:00:00+08:00"),

        title: "One of My Favorites",

        image: "assets/memory2.jpg",

        letter: `

Out of all the memories we've made,
this one will always have a special place
in my heart.

It wasn't necessarily a perfect day.

It was simply a day where I was happy
because I was with you.

        `
    },


    {
        id: 3,

        unlockDate: new Date("2026-08-16T00:00:00+08:00"),

        title: "A Day to Remember",

        image: "assets/memory3.jpg",

        letter: `

Another memory.

Another little chapter of our story.

Looking at this reminds me of how many
little moments we've collected together.

And somehow, I want many more.

        `
    },


    {
        id: 4,

        unlockDate: new Date("2026-08-17T00:00:00+08:00"),

        title: "Another Chapter",

        image: "assets/memory4.jpg",

        letter: `

We've changed a lot.

We've grown.

We've learned.

And through all of it,
I'm grateful that I got to experience
another chapter with you.

        `
    },


    {
        id: 5,

        unlockDate: new Date("2026-08-18T00:00:00+08:00"),

        title: "Almost Two Years",

        image: "assets/memory5.jpg",

        letter: `

One more day.

After all the memories,
all the laughs,
all the conversations,
and all the little moments...

we made it here.

Tomorrow is our day.

        `
    }

];


/* =========================================
   COUNTDOWN
========================================= */

function updateCountdown() {

    const now = new Date();

    const difference = anniversaryDate - now;


    // Anniversary has arrived
    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        document.querySelector(".countdown-title").textContent =
            "HAPPY SECOND ANNIVERSARY ❤️";

        unlockAll();

        return;

    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


setInterval(updateCountdown, 1000);

updateCountdown();


/* =========================================
   MEMORY LOCK SYSTEM
========================================= */

function updateMemoryLocks() {

    const now = new Date();

    const cards =
        document.querySelectorAll(".memory-card");


    cards.forEach((card, index) => {

        const memory = memories[index];

        const lockIcon =
            card.querySelector(".lock-icon");

        const unlockText =
            card.querySelector(".unlock-text");

        const button =
            card.querySelector(".open-button");


        if (now >= memory.unlockDate) {

            card.classList.remove("locked");

            card.classList.add("unlocked");

            lockIcon.textContent = "🔓";

            unlockText.textContent =
                "MEMORY UNLOCKED";

            button.disabled = false;

        }

        else {

            card.classList.add("locked");

            card.classList.remove("unlocked");

            lockIcon.textContent = "🔒";

            unlockText.textContent =
                "LOCKED — UNLOCKS SOON";

            button.disabled = true;

        }

    });

}


setInterval(updateMemoryLocks, 1000);

updateMemoryLocks();


/* =========================================
   OPEN MEMORY
========================================= */

const modal =
    document.getElementById("memoryModal");

const modalNumber =
    document.getElementById("modalNumber");

const modalTitle =
    document.getElementById("modalTitle");

const modalImage =
    document.getElementById("modalImage");

const modalLetter =
    document.getElementById("modalLetter");


document.querySelectorAll(".memory-card")
.forEach((card, index) => {

    const button =
        card.querySelector(".open-button");


    button.addEventListener("click", () => {

        if (card.classList.contains("locked")) {

            return;

        }


        const memory = memories[index];


        modalNumber.textContent =
            `MEMORY ${String(memory.id).padStart(2, "0")}`;

        modalTitle.textContent =
            memory.title;

        modalImage.src =
            memory.image;

        modalLetter.textContent =
            memory.letter;


        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


/* =========================================
   CLOSE MEMORY
========================================= */

document.getElementById("closeModal")
.addEventListener("click", closeMemory);


modal.addEventListener("click", (event) => {

    if (
        event.target.classList.contains("modal-background")
    ) {

        closeMemory();

    }

});


function closeMemory() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================
   FINAL ANNIVERSARY
========================================= */

const finalButton =
    document.getElementById("finalButton");

const finalModal =
    document.getElementById("finalModal");


finalButton.addEventListener("click", () => {

    const now = new Date();

    if (now >= anniversaryDate) {

        finalModal.classList.add("active");

        document.body.style.overflow = "hidden";

    }

    else {

        alert(
            "Not yet... ❤️ Come back on August 19."
        );

    }

});


/* =========================================
   CLOSE FINAL
========================================= */

document.getElementById("closeFinal")
.addEventListener("click", () => {

    finalModal.classList.remove("active");

    document.body.style.overflow = "";

});


finalModal.addEventListener("click", (event) => {

    if (
        event.target.classList.contains("modal-background")
    ) {

        finalModal.classList.remove("active");

        document.body.style.overflow = "";

    }

});


/* =========================================
   UNLOCK EVERYTHING
========================================= */

function unlockAll() {

    document.querySelectorAll(".memory-card")
    .forEach(card => {

        card.classList.remove("locked");

        card.classList.add("unlocked");

        card.querySelector(".lock-icon")
            .textContent = "🔓";

        card.querySelector(".unlock-text")
            .textContent = "MEMORY UNLOCKED";

        card.querySelector(".open-button")
            .disabled = false;

    });

}
