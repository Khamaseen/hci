const url = 'http://localhost:3000/user/signup';

const fullnameContainer = document.getElementById("InputName1");
const emailContainer = document.getElementById("InputEmail1");
const passwordContainer = document.getElementById("InputPassword1");
const dateofbirthContainer = document.getElementById("InputBirthday");
const doctorContainer = document.getElementById("InputDoctor");
const babynameContainer = document.getElementById("InputBabyName");
const babydobContainer = document.getElementById("InputBabyDateOfBirth");
const maritialContainer = document.getElementById("InputMaritialStatus");

const signUpForm = document.getElementById("signUpForm");
console.log("element gotten")
const button = document.getElementById('thisButton');

button.addEventListener('click', async function(e) {
    e.preventDefault();

    try {
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: fullnameContainer.value,
                email: emailContainer.value,
                password: passwordContainer.value,
                dateofbirth: new Date(dateofbirthContainer.value),
                dateOptedIn: new Date().getDate(),
                lastRelapse: new Date().getDate(),
                doctor: doctorContainer.value,
                babyname: babynameContainer.value,
                babydob: new Date(babydobContainer.value),
                maritial: maritialContainer.value
            }),
            headers: {
                "Content-type": "application/json",
            }
        });

        //Handle if the request is successful.
        if (response.ok) {
            console.log("singup response ok")
            console.log(`${response.status}`)

        }
    } catch (error) {
        console.log("singup response NOT ok")

        console.log(error);
    }

})
