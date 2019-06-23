const button = document.getElementById("logoutButton")
const userName = document.getElementById("dashUsername")

async function setName() {
    try {
        var id = localStorage.getItem("userID")
        var id = id.slice(1, -1)

        var url = 'http://localhost:3000/user/user'+ '/' + id 
    
        let response = await fetch(url)
    
        //Handle if the request is successful.
        if (response.ok) {
            let jsonObj = await response.json()
            console.log(`response ok ${jsonObj.user}`)
            userName.innerText = jsonObj.user.name
        }
    }catch (e) {
        console.log("Couldn't fetch the user")
    }
}

setName();

button.addEventListener('click', e => {
    e.preventDefault()
    localStorage.removeItem('authToken')
    const token = localStorage.getItem('authToken')
    if(!token) { document.location.href="/hci/pages/login.html" }
})