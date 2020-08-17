const randomWord = () => {
    const words = ` Açaí
    Ackee
    Apple
    Apricot
    Avocado
    Banana
    Bilberry
    Blackberry
    Blackcurrant
    Black
    Blueberry
    Boysenberry
    Breadfruit
    Buddha
    Cactus pear
    Crab apple
    Currant
    Cherry
    Cherimoya (Custard Apple)
    Chico fruit
    Cloudberry
    Coconut
    Cranberry
    Damson
   Dragonfruit (or Pitaya)
    Durian
    Elderberry
    Feijoa
    Fig
    Goji berry
    Gooseberry
    Grape
    Grewia asiatica (phalsa or falsa)
    Raisin
    Grapefruit
    Guava
    Hala Fruit
      Honeyberry
    Huckleberry
    Jabuticaba
    Jackfruit
    Jambul
    Japanese plum
    Jostaberry
    Jujube
    Juniper berry
    Kiwano (horned melon)
    Kiwifruit
    Kumquat
    Lemon
    Lime
    Loganberry
    Loquat
    Longan
    Lychee
    Mango
    Mangosteen
    Marionberry
    Melon
    Cantaloupe
    Galia melon
    Honeydew
    Watermelon
    Miracle fruit
    Monstera Delisiousa
      Mulberry
    Nance
    Nectarine
    Orange
    Blood orange
    Clementine
    Mandarine
    Tangerine
    Papaya
    Passionfruit
    Peach
    Pear
    Persimmon
    Plantain
    Plum
    Prune (dried plum)
    Pineapple
    Pineberry
    Plumcot (or Pluot)
    Pomegranate
    Pomelo
    Purple mangosteen
    Quince
    Raspberry
    Salmonberry
    Rambutan (or Mamin Chino)
    Redcurrant
    Salal berry
    Salak
    Satsuma
    Soursop
    Star apple
    Star fruit
    Strawberry
    Surinam cherry
    Tamarillo
    Tamarind
    Tangelo
    Tayberry
    Ugli fruit
    White currant
    White sapote
    Yuzu `;
    const wordSplit = words.split("\n");
    return "a b";
    return wordSplit[Math.floor(Math.random() * wordSplit.length)];
  };
  const maxNumWrongGuesses = 7;
  let word = "";
  let correctGuesses = [];
  let wrongGuesses = [];
  const updateRevealedWord = () => {
    const revealedWord = word
      .split("")
      .map((letter) =>
        correctGuesses.includes(letter.toUpperCase()) || letter == " "
          ? letter
          : "_"
      )
      .join("");
    document.getElementById("revealed-word").textContent = revealedWord;
    if (revealedWord == word) {
      document.getElementById(
        "message-content"
      ).innerHTML = `<h1>You are Not smart was easy </h1><p>The word was <strong>${word}</strong></p>`;
      document.querySelector(".message").classList.remove("hidden");
    }
  };
  const updateHangman = () => {
    const numWrongGuesses = wrongGuesses.length;
    for (let index = 0; index < wrongGuesses.length; index++) {
      document.getElementById("hangmanPic").src =
        "imags/" +index+ ".png";
      };
    document.getElementById(
      "hangman"
    ).textContent = `${numWrongGuesses} / ${maxNumWrongGuesses}`;
    if (numWrongGuesses >= maxNumWrongGuesses) {
      document.getElementById(
        "message-content"
      ).innerHTML = `<h1> you have been hanged </h1><p>The word was <strong>${word}</strong></p>`;
      document.querySelector(".message").classList.remove("hidden");
    }
    if (numWrongGuesses == maxNumWrongGuesses - 2) {
      document.querySelector(".help").classList.remove("hidden");
    }
  
    document.getElementById("solution-button").addEventListener("click", () => {
      document.getElementById(
        "solutiont-content"
      ).innerHTML = ` <h1> The solution </h1><p>The word was <strong>${word}</strong></p>`;
      document.getElementById("solution-content").classList.remove("gone");
    });
    document.getElementById("hint-button").addEventListener("click", () => {
      document.getElementById(
        "hint-conent"
      ).innerHTML = ` <h1> The hint </h1><p>The hint is <strong>${word}</strong></p>`;
      document.getElementById("hint-content").classList.remove("gone");
    });
  };
  const guess = (letter) => {
    if (correctGuesses.includes(letter) || wrongGuesses.includes(letter)) {
      return;
    }
    document
      .querySelector(`button[data-letter="${letter}"]`)
      .classList.add("disabled");
  
    if (word.toUpperCase().includes(letter)) {
      correctGuesses.push(letter);
      updateRevealedWord();
    } else {
      wrongGuesses.push(letter);
      updateHangman();
    }
  };
  const startGame = () => {
    word = randomWord();
    correctGuesses = [];
    wrongGuesses = [];
    updateRevealedWord();
    updateHangman();
    document
      .querySelectorAll(".letter")
      .forEach((button) => button.classList.remove("disabled"));
  };
  
  document.querySelectorAll(".letter").forEach((button) =>
    button.addEventListener("click", () => {
      guess(button.dataset.letter);
    })
  );
  
  document.getElementById("start-game").addEventListener("click", () => {
    document.querySelector(".message").classList.add("hidden");
    document.querySelector(".help").classList.add("hidden");
    document.getElementById("start-game").classList.add("hidden");
    startGame();
  });
  document.getElementById("try-again").addEventListener("click", () => {
    document.querySelector(".message").classList.add("hidden");
    document.querySelector(".help").classList.add("hidden");
    document.getElementById("try-again").classList.add("hidden");
    startGame();
  });
  
  startGame();
  