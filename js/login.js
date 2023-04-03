//Login script
const loginform =  document.getElementById('login-form');

loginform.addEventListener('submit', e => {
    e.preventDefault();

    const loginemail = loginform['login-email'].value;
    const loginpassword = loginform['login-password'].value;

    // console.log(name, email, password);

    auth.signInWithEmailAndPassword(loginemail, loginpassword).then(() => {
            location = "users.html";
        }).catch (err => {
            const loginError = document.getElementById('loginError');
            loginError.innerText = err.message;
        });
});
