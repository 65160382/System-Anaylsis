document.addEventListener('DOMContentLoaded', function() {
  const initialProgress = 66;
  const stepNum = initialProgress / 33; // Adjust based on the step size and initial progress

  // Set initial progress bar width
  const percentElement = document.querySelector('.percent');
  percentElement.style.width = `${initialProgress}%`;

  // Update the step classes based on the initial progress
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, index) => {
      if (index < stepNum) {
          step.classList.add('completed');
      } else if (index === stepNum) {
          step.classList.add('selected');
      } else {
          step.classList.remove('selected', 'completed');
      }
  });
  
  // Add event listeners for click events on steps
  steps.forEach((step, index) => {
      step.addEventListener('click', (e) => {
          progress(index);
      });
  });
});

function progress(stepNum) {
  let p = stepNum * 33; // Adjust based on the step size
  document.getElementsByClassName('percent')[0].style.width = `${p}%`;
  
  const steps = document.querySelectorAll('.step');
  steps.forEach((e, index) => {
      if (index === stepNum) {
          e.classList.add('selected');
          e.classList.remove('completed');
      } else if (index < stepNum) {
          e.classList.add('completed');
          e.classList.remove('selected');
      } else {
          e.classList.remove('selected', 'completed');
      }
  });
}
