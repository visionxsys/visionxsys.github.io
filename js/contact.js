/* ==========================================================================
   VISIONXSYSTEMS — Contact form (front-end only)
   Note: this is a static, front-end-only build. There is no backend, so
   submissions are not actually sent anywhere yet — wire this up to your
   form handler / email service (e.g. Formspree, EmailJS) when ready.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successMsg = document.getElementById("form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const requiredFields = form.querySelectorAll("[required]");
    let valid = true;

    requiredFields.forEach((field) => {
      field.classList.remove("field-error");
      if (!field.value.trim()) {
        valid = false;
        field.classList.add("field-error");
      }
    });

    const emailField = form.querySelector("#email");
    if (emailField && emailField.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailField.value.trim())) {
        valid = false;
        emailField.classList.add("field-error");
      }
    }

    if (!valid) return;

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      successMsg.classList.add("visible");
      setTimeout(() => successMsg.classList.remove("visible"), 5000);
    }, 900);
  });

  form.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("input", () => field.classList.remove("field-error"));
  });
});
