//Getting the date and time
const spanDate = document.getElementById("date");
const spanMonth = document.getElementById("month");
const spanYear = document.getElementById("year");
const spanWeekday = document.getElementById("weekday");

function loadbody() {
    const date = new Date();
    const month = date.toLocaleString('default', {month: 'long'});
    const myDate = date.getDate();
    const year = date.getFullYear();
    const day = date.toLocaleDateString('default', {weekday: 'long' });

    spanDate.innerText = myDate;
    spanMonth.innerText = month;
    spanYear.innerText = year + ",";
    spanWeekday.innerText = day;
}

//Signup script
const signupform =  document.getElementById('signup-form');

signupform.addEventListener('submit', e => {
    e.preventDefault();

    const name = signupform['name'].value;
    const email = signupform['email'].value;
    const password = signupform['password'].value;

    // console.log(name, email, password);

    signupform.reset();

    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        return db.collection('users').doc(cred.user.uid).set({
            Name: name,
            Email: email,
            Password: password
        }).then(() => {
            location = "login.html";
        }).catch (err => {
            const signupError = document.getElementById('signupError');
            signupError.innerText = err.message;
        })
    }).catch(err => {
        const signupError2 = ducument.getElementById('signupError2');
        signupError2.innerText = err.message;
    })
})