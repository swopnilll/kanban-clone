// Issue class : Represents a issue, Everytime we create a issue, it will instantiate a issue object.
class Issue {
    constructor(type,prio,summary,desc,repo,assigne,issueId) {
        Object.assign(this,{type,prio,summary,desc,repo,assigne,issueId});
    }
}

// Store class : Handles Storage - Local Storage.
class Store {
    static getIssues () {
        let issues;
        if(localStorage.getItem('issues') === null){
            localStorage.clear();
            issues = {};      
        }
        else {
            issues = JSON.parse(localStorage.getItem('issues'));
        }
            return issues;
    }

    static addIssue (issue){
       let issues = Store.getIssues();
       issues[issue.issueId] = issue;
       localStorage.setItem('issues',JSON.stringify(issues));
    }

    static editIssue (issue){
        let issues = Store.getIssues();
        issues[issue.issueId] = issue;
        localStorage.setItem('issues',JSON.stringify(issues));
    }

    static removeIssue (issue) {
        let issues = Store.getIssues();
        let id = issue.issueId;  
        console.log(id);
        delete issues[id];
        localStorage.setItem('issues',JSON.stringify(issues));
        }
}

