// UI class : Handle UI Task, (Anything in the user interface,display,remove ,show an alert, that is gonna be within the UI class.)
class UI {
// To open and close pop in page (1. Create Issue Page, 2.Edit Issue page, Note : can be used for creating login and pop up page later)
    static openModal(modal) {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
        }
    static closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
        }
       
//To display issue card( Rendering data from the LocalStorage to UI)
    static displayCard() {
        let issues = Store.getIssues();
        Object.entries(issues).forEach(issue => {
        UI.addCardToBlock(issue[1]);
        })   
        }
    
 // Add Issue card after Create issue button is clicked
    static addCardToBlock(issue) {   
      
        // creating a list element for each new issue and adding class to it. 
        const task = document.createElement('li');
        task.classList.add('task');
        // ensuring the list is draggable
        task.draggable = true;
        // adding the show case text area inside the list. 
        let taskContent = document.createElement('span');
        taskContent.classList.add('task-content');
        taskContent.innerText = `${issue.summary}`;
        let br = document.createElement('br');
        let span1 = document.createElement('span');
        span1.classList.add("issueType");
        span1.innerText = `${issue.type}`;

        let span2 = document.createElement('span');
        span2.classList.add("prio");
        span2.innerText = `${issue.prio}`;

        let span3 = document.createElement('span');
        span3.classList.add("issueId");
        span3.innerText = `${issue.issueId}`;

        // appending the text area in the list
        task.appendChild(taskContent);
        task.appendChild(br);
        task.appendChild(span1);
        task.appendChild(span2);
    
        // appeding the list inside the ul.
        const tasks = document.querySelector('.tasks');
        tasks.appendChild(task); 
        
// Event listener for issue card click--> Pop Page to display issue information,edit or delete the issue.
        task.addEventListener('click',(e)=>{
        // Deactivate the Create issue button and activate the Edit and Delete issue Button 
        let issueSubmit = document.querySelector('.issue-submit');
        issueSubmit.classList.add("deactive");

        let editIssue = document.querySelector('.edit-issue');
        editIssue.classList.add("active");

        let deleteIssue = document.querySelector('.delete-issue');
        deleteIssue.classList.add("active");

        let title = document.querySelector('.title');
        title.classList.add("active");

        let issueInfo = document.querySelector('.issue-info');
        issueInfo.classList.add('active');

        const modal = document.querySelector('#modal');
        // Issue information page
        document.getElementById('issue-type-select').value = issue.type;
        document.getElementById('prio-type-select').value = issue.prio;
        document.querySelector('.summary-input').value = issue.summary;
        document.querySelector('.description-textarea').value = issue.desc;
        document.querySelector('.repo-select').value = issue.repo;
        document.querySelector('.assigne-select').value = issue.assigne;
//Event listener to edit issue 
        let edit = document.querySelector('.edit');
        edit.addEventListener('click',() => {
        let localStoredIssue = Store.getIssues();
        let updateLocalStoredIssue = localStoredIssue[issue.issueId]; 
        // fetching the updated value
        updateLocalStoredIssue.type = document.getElementById('issue-type-select').value;
        updateLocalStoredIssue.prio = document.getElementById('prio-type-select').value;   
        // Restroring the issue object with the updated value
        Store.editIssue(updateLocalStoredIssue);
        UI.closeModal(modal);
        location.reload();   
    })

// Event Listener to Delete Issue
    let issueDelete = document.querySelector('.issue-delete');
    issueDelete.addEventListener('click',() => {
     Store.removeIssue(issue);
     UI.closeModal(modal);
     location.reload();   
    })
        UI.openModal(modal)
    })

// For drag and Drop Functionality
        const alltask = document.querySelectorAll('.task');
        const dragdrop = document.querySelectorAll('.dragdrop');

        alltask.forEach(card => {
            card.addEventListener('dragstart', () => {
            card.classList.add('dragging');
            })

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        })

        dragdrop.forEach ( drop => {
            drop.addEventListener('dragover', (e) => {
                const card = document.querySelector('.dragging');
                drop.appendChild(card);
            })
        })
    })
    }
// To clear form after submit
    static clearFields () {
        type = document.querySelector('#issue-type-select').value = '';
        prio = document.querySelector('#prio-type-select').value = '';
      
        summary = document.querySelector('.summary-input').value = '';
        desc = document.querySelector('.description-textarea').value = '';
    
        repo = document.querySelector('.repo-select').value = '';
        assigne = document.querySelector('.assigne-select').value = '';
    }
// To show alert 
static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        console.log(div);
        let modalHeader = document.querySelector('.modal-header');
        modalHeader.appendChild(div);


        // Vanishing after some time 
        setTimeout(() =>{
            document.querySelector('.alert').remove();
        },3000);

    }

}