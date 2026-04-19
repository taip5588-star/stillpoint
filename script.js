document.addEventListener("DOMContentLoaded", () => {
  /* SCROLL OBSERVER */
  // Only setup observer if reduced motion is not preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          
          // Add delay if specified
          const delay = el.getAttribute('data-delay');
          if (delay) {
            setTimeout(() => {
              el.classList.add('visible');
            }, parseInt(delay));
          } else {
            el.classList.add('visible');
          }
          
          obs.unobserve(el);
        }
      });
    }, observerOptions);

    const elementsToFade = document.querySelectorAll('.fade-up');
    elementsToFade.forEach(el => observer.observe(el));
  } else {
    // If reduced motion is preferred, immediately show all elements
    const elementsToFade = document.querySelectorAll('.fade-up');
    elementsToFade.forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
      el.classList.add('visible');
    });
  }

  /* FORM HANDLING */
  const forms = document.querySelectorAll('.waitlist-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      if (!email) return;

      // Disable input and button while processing
      const submitBtn = form.querySelector('button');
      if(submitBtn) submitBtn.disabled = true;
      if(emailInput) emailInput.disabled = true;
      
      // Simulate submission network request to Buttondown via API or form POST
      // Since we don't have the real endpoint, we'll fake a short delay.
      setTimeout(() => {
        const successMsg = form.nextElementSibling; // Form success block
        
        // Hide form and show success message
        form.style.display = 'none';
        
        if (successMsg && successMsg.classList.contains('form-success')) {
          successMsg.style.display = 'block';
        }
      }, 500);
    });
  });
});
