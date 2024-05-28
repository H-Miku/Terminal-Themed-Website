window.onload = () => {
  const originalSubmitForm = window.submitForm;

  const submitFormWithCommand = () => {
    const chatInput = $(".chat-input").val().trim();

    // Check for the specific command and ask for confirmation
    if (chatInput === "$showtruecolors") {
      const userResponse = prompt("Are you sure you want to see the true colors? Type 'yes' to confirm.");
      if (userResponse && userResponse.toLowerCase() === "yes") {
        window.location.href = "/terminal/terminal.html"; // Update with the correct path to your HTML file
      }
      return; // Prevent the original submitForm from running
    }

    // Call the original submitForm function
    if (typeof originalSubmitForm === 'function') {
      originalSubmitForm();
    }
  };

  // Override the original submitForm function
  window.submitForm = submitFormWithCommand;

  $("#chat-form").submit((e) => {
    e.preventDefault();
    submitFormWithCommand();
  });
};