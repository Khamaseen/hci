const url = 'http://localhost:3000/user/login';

const emailContainer = document.getElementById("InputEmail1");
const passwordContainer = document.getElementById("Password1");
const signInForm = document.getElementById("signIn-form");

signInForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = emailContainer.value;
    const password = passwordContainer.value;
    console.log(`${email}: ${password}`)

    try {
        console.log("fetch url login")
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json",
            }
        });

        //Handle if the request is successful.
        if (response.ok) {
            let jsonObj = await response.json();
            console.log(`response is: ${jsonObj}`)

            localStorage.setItem('authToken', JSON.stringify(jsonObj.token))
            localStorage.setItem('userID', JSON.stringify(jsonObj.userID))

            console.log(`authToken: ${localStorage.getItem('token')}: message ${jsonObj.message}: id ${jsonObj.userID}`)
            console.log(`${localStorage.getItem('userID')}`)
            // document.location.href="/hci/pages/main.html"
        }
    } catch (error) {
        console.log(error);
    }

})
