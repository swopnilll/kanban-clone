// To open Pop Up Create Issue Page Once the user clicks on Create Issue Button
const openModalButtons = document.querySelectorAll('[data-modal-target]')
openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    UI.openModal(modal)
  })
})
// To Cancel Create Issue Pop Up form 
const overlay = document.getElementById('overlay')
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
   UI.closeModal(modal)
  })
})

// To cancel Pop Up-Create Issue Form by clicking the X button 
const closeModalButtons = document.querySelectorAll('[data-close-button]')
closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
   const modal = button.closest('.modal')
   UI.closeModal(modal)
  })
})

// Event 
document.addEventListener('DOMContentLoaded', UI.displayCard);

// Event : add Issue (Both in UI and Local Storage)
  document.querySelector('#create-issue-form').addEventListener('submit',(e) => {

// create a random Issue Id 
  randomId = document.getElementById('custId');
  randomId.value =  Math.floor((Math.random() * 1000*999) + 1);

  e.preventDefault();
 
  // get form values 
  type = document.querySelector('#issue-type-select').value;
  prio = document.querySelector('#prio-type-select').value;

  summary = document.querySelector('.summary-input').value;
  desc = document.querySelector('.description-textarea').value;

  repo = document.querySelector('.repo-select').value;
  assigne = document.querySelector('.assigne-select').value;

  issueId = document.querySelector('#custId').value;
  
    // Validate 
  if (summary === '' || desc === ''){
    UI.showAlert("Please fill in the neccessary detail","danger")
  }
  else {
    UI.showAlert("issueCreated","sucess");
    // instantiate Issue 
    const issue = new Issue(type,prio,summary,desc,repo,assigne,issueId);
   
    // Create a Issue Card 
    UI.addCardToBlock(issue);

    //Add Issue info to the local Storage
    Store.addIssue(issue);
   
    // Clear Fields
    UI.clearFields();
   
    // Close Pop Up   
    UI.closeModal(modal);
  }  
})

