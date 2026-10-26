
const roastButton = document.getElementById("roast-button");
const roastType = document.getElementById("roast-type");
const roastText = document.getElementById("roast-text");
const copyButton = document.getElementById("copy-button");

// Our collection of roasts
const roasts = {
    gentle: [
        "Your brain has 47 tabs open, and somehow music is playing from all of them.",
        "You're not lazy. You're just on energy-saving mode. Permanently.",
        "You have the energy of a sleepy cat and the ambitions of a billionaire.",
        "Your to-do list is starting to qualify as historical fiction."
    ],

    bestie: [
        "You're the reason the group chat needs a separate group chat.",
        "You say 'I'm on my way' while choosing what to wear.",
        "Your life isn't a mess. It's a limited edition disaster collection.",
        "You give amazing advice for someone who ignores every bit of their own."
    ],

    academic: [
        "Your study timetable has more fiction than a fantasy novel.",
        "You opened the textbook and immediately needed a study break.",
        "Your academic comeback is currently buffering. Please wait.",
        "You highlight everything because apparently the whole syllabus is important."
    ],

    delulu: [
        "They viewed your story. Wedding venue booked. Invitations pending.",
        "One 'hey' and suddenly you're naming the imaginary pets.",
        "Your standards are high, but your fictional scenarios are higher.",
        "They liked your post and you've already written season two."
    ]
};

// Remember the previous roast for each category
const previousRoast = {};

roastButton.addEventListener("click", function () {
    const category = roastType.value;
    const choices = roasts[category];

    let roast;

    // Avoid repeating the previous roast immediately
    do {
        const randomIndex = Math.floor(
            Math.random() * choices.length
        );

        roast = choices[randomIndex];
    } while (
        choices.length > 1 &&
        roast === previousRoast[category]
    );

    previousRoast[category] = roast;

    // Display the selected roast
    roastText.textContent = roast;

    // Show the copy button
    copyButton.hidden = false;
});

// Copy the roast
copyButton.addEventListener("click", async function () {
    try {
        await navigator.clipboard.writeText(roastText.textContent);
        copyButton.textContent = "Copied! ♡";
    } catch (error) {
        copyButton.textContent = "Copy unavailable — select the text";
    }
});

/* ===== LOVE CALCULATOR ===== */

const loveButton = document.getElementById("love-button");
const yourNameInput = document.getElementById("your-name");
const crushNameInput = document.getElementById("crush-name");
const loveScore = document.getElementById("love-score");
const loveVerdict = document.getElementById("love-verdict");
const loveHearts = document.getElementById("love-hearts");
const loveResult = document.getElementById("love-result");

const loveVerdicts = [
    {
        min: 0,
        max: 29,
        text: "The plot is plotting... but perhaps as friends. 👀"
    },
    {
        min: 30,
        max: 49,
        text: "Potential detected. The writers need more episodes. 🎬"
    },
    {
        min: 50,
        max: 69,
        text: "Cute chemistry! But communication beats calculations. 💌"
    },
    {
        min: 70,
        max: 89,
        text: "Rom-com energy detected. Cue the imaginary soundtrack! 🎶"
    },
    {
        min: 90,
        max: 100,
        text: "DELULU PREMIUM UNLOCKED. Someone call the screenplay writers. 💗"
    }
];

loveButton.addEventListener("click", function () {
    const yourName = yourNameInput.value.trim();
    const crushName = crushNameInput.value.trim();

    if (yourName === "" || crushName === "") {
        loveScore.textContent = "Oops! Missing a name 💌";
        loveVerdict.textContent =
            "Enter both names first. Even our imaginary science needs input!";
        loveHearts.textContent = "♡";
        return;
    }

    // Generate a playful score from 0 to 100.
    const score = Math.floor(Math.random() * 101);

    const result = loveVerdicts.find(function (verdict) {
        return score >= verdict.min && score <= verdict.max;
    });

    loveScore.textContent = score + "% compatibility ✨";
    loveVerdict.textContent = result.text;
    loveHearts.textContent =
        score >= 70 ? "♥ ♥ ♥" :
        score >= 40 ? "♥ ♥ ♡" : "♥ ♡ ♡";

    // Replay the reveal animation on every calculation.
    loveResult.classList.remove("reveal");
    void loveResult.offsetWidth;
    loveResult.classList.add("reveal");
});

/* ===== EXAM SOS ===== */

// 1. BREATHING TOOL
const breatheButton = document.getElementById("breathe-button");
const breathingCircle = document.getElementById("breathing-circle");
const breathingText = document.getElementById("breathing-text");
const breathingInstruction = document.getElementById("breathing-instruction");

let breathingTimer = null;
let breathingRunning = false;
let breathingPhase = 0;

const breathingPhases = [
    {
        text: "Breathe in",
        instruction: "Gently breathe in, if comfortable.",
        className: "inhale",
        duration: 4000
    },
    {
        text: "Breathe out",
        instruction: "Slowly breathe out. No need to force it.",
        className: "exhale",
        duration: 6000
    }
];

function runBreathingPhase() {
    const phase = breathingPhases[breathingPhase];

    breathingText.textContent = phase.text;
    breathingInstruction.textContent = phase.instruction;

    breathingCircle.classList.remove("inhale", "exhale");
    breathingCircle.classList.add(phase.className);

    breathingTimer = setTimeout(function () {
        if (!breathingRunning) return;

        breathingPhase = 1 - breathingPhase;
        runBreathingPhase();
    }, phase.duration);
}

breatheButton.addEventListener("click", function () {
    if (breathingRunning) {
        breathingRunning = false;
        clearTimeout(breathingTimer);

        breathingCircle.classList.remove("inhale", "exhale");
        breathingText.textContent = "Ready?";
        breathingInstruction.textContent =
            "Paused! Take your time.";
        breatheButton.textContent = "Start breathing 🌬️";
        return;
    }

    breathingRunning = true;
    breathingPhase = 0;
    breatheButton.textContent = "Stop breathing ✋";
    runBreathingPhase();
});


// 2. BRAIN DUMP + CHARACTER COUNTER
const brainDump = document.getElementById("brain-dump-text");
const characterCount = document.getElementById("character-count");
const clearDumpButton = document.getElementById("clear-dump");

brainDump.addEventListener("input", function () {
    characterCount.textContent =
        brainDump.value.length + " / 1000";
});

clearDumpButton.addEventListener("click", function () {
    brainDump.value = "";
    characterCount.textContent = "0 / 1000";
    brainDump.focus();
});


// 3. RANDOM STUDY BREAK GENERATOR
const breakButton = document.getElementById("break-button");
const breakSuggestion = document.getElementById("break-suggestion");

const studyBreaks = [
    "🚶 Walk around for 2 minutes.",
    "💧 Drink some water.",
    "🪟 Look out the window and rest your eyes.",
    "🎵 Listen to one favourite song.",
    "🙆 Stretch your shoulders gently.",
    "🐈 Watch a silly animal video.",
    "🧹 Tidy one tiny corner of your desk.",
    "🌿 Step outside for some fresh air, if possible.",
    "📝 Write down the ONE task you'll do next.",
    "☕ Take a few minutes to sit quietly."
];

let previousBreak = -1;

breakButton.addEventListener("click", function () {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * studyBreaks.length);
    } while (randomIndex === previousBreak);

    previousBreak = randomIndex;
    breakSuggestion.textContent = studyBreaks[randomIndex];
});
