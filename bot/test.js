window.onload = async () => {
  let awaitingConfirmation = false;

  const displayChatbotMessage = (message) => {
    $("main").append(`
      <div class="chat-msg-box bot">
        <p>${message}</p>
      </div>
    `);
  };

  const displayUserMessage = (message) => {
    $("main").append(`
      <div class="chat-msg-box clint">
        <p>${message}</p>
      </div>
    `);
  };

  const showLoadingMessage = () => {
    $("main").append(`
      <div class="chat-msg-box bot">
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
        <p>Loading...</p>
      </div>
    `);
  };

  const submitForm = () => {
    const chatInput = $(".chat-input").val().trim();

    if (awaitingConfirmation) {
      displayUserMessage(chatInput);
      if (chatInput.toLowerCase() === "yes") {
        showLoadingMessage();
        setTimeout(() => {
          window.location.href = "/terminal/terminal.html"; // Update with the correct path to your HTML file
        }, 2000); // 2-second delay before redirection
      }
      awaitingConfirmation = false;
      $(".chat-input").val(""); // Clear the input field
      return; // Prevent further processing
    }

    if (chatInput === "$accessterminal") {
      displayUserMessage(chatInput); // Display the command in the chat box

      awaitingConfirmation = true;
      displayChatbotMessage("Are you sure you want to access the terminal? Warning: This terminal is not for beginners proceed with caution. Type 'yes' to confirm.");
      $(".chat-input").val("");

      return; // Prevent the original submitForm from running
    }
    displayUserMessage(chatInput);

    $.ajax({
      url: `https://javascript-chatbot.vercel.app/api/question/?q=${encodeURIComponent(chatInput)}`,
      method: "GET",
      cache: false,
      beforeSend: () => {
        $(".chat-input").val("");
        $(".typing").show();
        $("main").append(`
          <div class="chat-msg-box bot">
            <div class="spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
          </div>
        `);
        if ($(".chat-msg-box").length >= 10) {
          $([document.documentElement, document.body]).animate(
          {
            scrollTop: $(".chat-msg-box.bot:last-child").offset().top,
          }, { duration: 500 }, );
        }
      },
      success: (data) => {
        const response = data.responseText.replace(/\n/gm, "</br>");
        $(".chat-msg-box.bot:last-child").html(`<p>${response}</p>`);
      },
      error: () => {
        $(".chat-msg-box.bot:last-child").remove();
      },
      complete: () => {
        $(".typing").hide();
      },
    });
  };

  setTimeout(() => {
    $.ajax({
      url: "https://javascript-chatbot.vercel.app/api/welcome",
      success: (data) => {
        $("main").append(
          `<div class="chat-msg-box bot"><p>${data.responseText}</p></div>`,
        );
      },
    });
  }, 3000);

  $.ajax({
    url: "https://javascript-chatbot.vercel.app/api/allquestions",
    success: (data) => {
      data.forEach((qus) => {
        $(".questions.container").append(`
          <div class="question">
            <p>${qus}</p>
          </div>
        `);
      });
    },
  });

  const toogleShowSuggestions = () => {
    if ($("main").css("display") === "none") {
      $(".all-questions").hide();
      $("header img").attr(
        "src",
        "https://javascript-chatbot.vercel.app/src/images/chat_icon.png",
      );
      $("main").show();
      $("footer").show();
    } else {
      $(".all-questions").show();
      $("header img").attr(
        "src",
        "https://javascript-chatbot.vercel.app/src/images/close.png",
      );
      $("main").hide();
      $("footer").hide();
    }
  };

  $("#toogle-chat").on("click", () => {
    toogleShowSuggestions();
  });

  window.onresize = () => {
    if (window.innerHeight < 580) {
      $("header").css("top", "-4em");
    } else {
      $("header").css("top", "0vh");
    }
  };

  $("#chat-form").submit((e) => {
    e.preventDefault();
    submitForm();
  });

  const typed = new Typed(".chat-input", {
    strings: [
      "how many mm in 1 cm?",
      "change 10 l into ml",
      "what is computer?",
      "what is linux?",
      "tell me about Mercurial",
      "who is Bill Gates",
      "what is typescript",
      "When do you have birthday?",
      "I want a funny joke.",
      "Can you tell me a joke please?",
      "Can you tell me something about your creators?",
      "Are you just a bot?",
      "Date of your birthday.",
      "How are you today?",
      "could you be my friend?",
      "where are you from",
      "search for pythagoras theorem",
      "what is Javascript?",
      "what is HTML?",
      "who is Hatsune Miku?",
      "tell me a joke?"
    ],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1500,
    showCursor: true,
    cursorChar: "|",
    attr: "placeholder",
    loop: true,
    bindInputFocusEvents: false,
    shuffle: true,
  });
};


const submitForm = () => {
  const chatInput = $(".chat-input").val().trim();

  if (awaitingConfirmation) {
    // Handle confirmation logic...
    return;
  }

  // Display user message
  displayUserMessage(chatInput);

  // Show loading message
  showLoadingMessage();

  // Simulate a delay before processing the message
  setTimeout(() => {
    // Make AJAX request
    $.ajax({
      url: `https://javascript-chatbot.vercel.app/api/question/?q=${encodeURIComponent(chatInput)}`,
      method: "GET",
      cache: false,
      beforeSend: () => {
        $(".chat-input").val("");
        $(".typing").show();
        if ($(".chat-msg-box").length >= 10) {
          $([document.documentElement, document.body]).animate(
          {
            scrollTop: $(".chat-msg-box.bot:last-child").offset().top,
          }, { duration: 500 }, );
        }
      },
      success: (data) => {
        const response = data.responseText.replace(/\n/gm, "</br>");
        $(".chat-msg-box.bot:last-child").html(`<p>${response}</p>`);
      },
      error: () => {
        $(".chat-msg-box.bot:last-child").remove();
      },
      complete: () => {
        $(".typing").hide();
      },
    });
  }, 1000); // 1-second delay before making the AJAX request
};

document.getElementById('backButton').addEventListener('click', function() {
  window.location.href = '/homepage/homepage.html';
});