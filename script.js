// ========================================
// ANNIVERSARY SETTINGS
// ========================================

const anniversaryDate = new Date("2026-08-19T00:00:00+08:00");


// ========================================
// MEMORY DATA
// ========================================

const memories = [

    {
        id: 1,

        unlockDate: new Date("2026-08-14T00:00:00+08:00"),

        title: "Where It All Began",

        image: "assets/memory1.jpg",

        clue: "What was the first place where we spent time together?",

        answer: "school",

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

        clue: "What food did we eat on one of our favorite dates?",

        answer: "pizza",

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

        clue: "What was the first movie we watched together?",

        answer: "your movie",

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

        clue: "What nickname do I usually call you?",

        answer: "baby",

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

        clue: "What is the date we officially became a couple?",

        answer: "august 19 2024",

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


// ========================================
// COUNTDOWN
// ========================================

function updateCountdown() {

    const now = new Date();

    const difference =
        anniversaryDate.getTime() - now.getTime();


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        document.querySelector(".countdown-title").textContent =
            "HAPPY SECOND ANNIVERSARY ❤️";

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


updateCountdown();

setInterval(updateCountdown, 1000);


// ========================================
// MEMORY LOCKS
// ========================================

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
                "MEMORY AVAILABLE";

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


updateMemoryLocks();

setInterval(updateMemoryLocks, 1000);


// ========================================
// PASSWORD / CLUE MODAL
// ========================================

const passwordModal =
    document.getElementById("memoryModal");


// Create the password interface
function createPasswordInterface(memory) {

    const modalContent =
        document.querySelector("#memoryModal .modal-content");


    modalContent.innerHTML = `

        <button class="close-button" id="closePassword">
            ×
        </button>

        <div class="modal-number">
            MEMORY ${String(memory.id).padStart(2, "0")}
        </div>

        <h2>
            ${memory.title}
        </h2>

        <div class="password-lock">
            🔐
        </div>

        <p class="password-intro">
            This memory is protected.
            <br>
            Answer the question to unlock it.
        </p>

        <div class="clue-box">

            <span>YOUR CLUE</span>

            <p>
                ${memory.clue}
            </p>

        </div>

        <input
            type="text"
            id="passwordInput"
            class="password-input"
            placeholder="Enter your answer..."
            autocomplete="off"
        >

        <button
            id="unlockButton"
            class="unlock-button"
        >
            UNLOCK MEMORY
        </button>

        <p
            id="wrongAnswer"
            class="wrong-answer"
        ></p>

    `;


    document.body.style.overflow = "hidden";

    passwordModal.classList.add("active");


    document
        .getElementById("closePassword")
        .addEventListener("click", closePasswordModal);


    document
        .getElementById("unlockButton")
        .addEventListener("click", () => {

            checkAnswer(memory);

        });


    document
        .getElementById("passwordInput")
        .addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                checkAnswer(memory);

            }

        });

}


// ========================================
// CHECK ANSWER
// ========================================

function checkAnswer(memory) {

    const input =
        document.getElementById("passwordInput");

    const wrongAnswer =
        document.getElementById("wrongAnswer");


    const userAnswer =
        input.value
            .trim()
            .toLowerCase();


    const correctAnswer =
        memory.answer
            .trim()
            .toLowerCase();


    if (userAnswer === correctAnswer) {

        showMemory(memory);

    }

    else {

        wrongAnswer.textContent =
            "Not quite... Think about it again. ❤️";

        input.classList.add("wrong");


        setTimeout(() => {

            input.classList.remove("wrong");

        }, 500);

    }

}


// ========================================
// SHOW MEMORY
// ========================================

function showMemory(memory) {

    const modalContent =
        document.querySelector("#memoryModal .modal-content");


    modalContent.innerHTML = `

        <button
            class="close-button"
            id="closeMemory"
        >
            ×
        </button>

        <div class="modal-number">
            MEMORY ${String(memory.id).padStart(2, "0")}
        </div>

        <div class="success-symbol">
            🔓
        </div>

        <h2>
            ${memory.title}
        </h2>

        <img
            src="${memory.image}"
            alt="Our memory"
        >

        <div class="letter">

            <div class="letter-line"></div>

            <p>
                ${memory.letter}
            </p>

            <div class="letter-signature">
                — With love ❤️
            </div>

        </div>

    `;


    document
        .getElementById("closeMemory")
        .addEventListener("click", closePasswordModal);

}


// ========================================
// CLOSE MODAL
// ========================================

function closePasswordModal() {

    passwordModal.classList.remove("active");

    document.body.style.overflow = "";

}


// ========================================
// OPEN MEMORY BUTTONS
// ========================================

document
    .querySelectorAll(".memory-card")
    .forEach((card, index) => {

        const button =
            card.querySelector(".open-button");


        button.addEventListener("click", () => {

            if (
                card.classList.contains("locked")
            ) {

                return;

            }


            const memory =
                memories[index];


            createPasswordInterface(memory);

        });

    });
