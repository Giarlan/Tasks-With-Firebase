
const todoContainer = document.getElementById('todo-container');

//Greetings time
var myDate = new Date();
var hrs = myDate.getHours();

var greet;

if (hrs < 12) {
    greet = 'Good Morning!';
}else if (hrs >= 12 && hrs <= 17) {
    greet = 'Good Afternoon!';
}else {
    greet = 'Good Evening!';
}

document.getElementById('greetings').innerHTML = greet;

// Retriving username from database
auth.onAuthStateChanged(user => {
    const username = document.getElementById('username');
    if (user) {
        db.collection('users').doc(user.uid).get().then((snapshot) => {
            username.innerHTML = snapshot.data().Name;
        })
    }
})

//Make tasks items
function renderData(individualDoc) {
    // Parent Div
    let parentDiv = document.createElement("li");
    parentDiv.className = 'w-100 todo-box';
    parentDiv.setAttribute('data-id', individualDoc.id);

    // Todo div
    let todoDiv = document.createElement("p");
    todoDiv.textContent = individualDoc.data().todos;

    // Trash button
    let trash = document.createElement("button");
    let i = document.createElement("i");
    i.className = "far fa-trash-alt";

    trash.appendChild(i);

    parentDiv.appendChild(todoDiv);
    parentDiv.appendChild(trash);

    todoContainer.appendChild(parentDiv);

    // Trash clicking event 
    trash.addEventListener('click', e => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection(user.uid).doc(id).delete()
            }
        })
    })
}

//Adding todo to firebase database
const form = document.getElementById('form');
let date = new Date;
let time = date.getTime();
let counter = time;

form.addEventListener('submit', e => {
    e.preventDefault();

    const todos = form['todos'].value;

    let id = counter += 1;
    form.reset();

    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection(user.uid).doc('_' + id).set({
                id: '_' + id,
                todos                
            }).then(() => {
                console.log('todo added');
            }).catch(err => {
                console.log('User is not signed in!');
            })
        }
    })
})

// Realtime listener
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection(user.uid).onSnapshot((snapshot) => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if(change.type == 'added') {
                    renderData(change.doc);
                }else if (change.type == 'removed') {
                    let li = todoContainer.querySelector('[data-id=' + change.doc.id + ']');
                    todoContainer.removeChild(li);
                }
            })
        })
    }
})

// Checking if user is signin or not
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User at Sign in');
    }else {
        alert('Your login session has expired or you have logged out, please login again!');
        location = 'login.html';
    }
})

// logout
function logout() {
    auth.signOut();
}