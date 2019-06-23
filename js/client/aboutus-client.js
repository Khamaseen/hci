const button = document.getElementById("logoutButton")
const userName = document.getElementById("dashUsername")

async function setName() {
    console.log("set name")
    try {
        console.log("tryyy")
        console.log(`${localStorage.getItem('userID')}`)

        var id = localStorage.getItem("userID")
        var id = id.slice(1, -1)
        console.log(id)

        var url = 'http://localhost:3000/user/whatever'+ '/' + id 
    
        console.log(`url: ${url}`)
        let response = await fetch(url)
        console.log("fetch main get name")
    
        //Handle if the request is successful.
        if (response.ok) {
            let jsonObj = await response.json()
            console.log(`response ok ${jsonObj.user}`)
            userName.innerText = jsonObj.user.name
        }
    }catch (e) {
        console.log("something wrong with fetching at main")
    }
}

setName();

button.addEventListener('click', e => {
    e.preventDefault()
    localStorage.removeItem('authToken')
    const token = localStorage.getItem('authToken')
    if(!token) { document.location.href="/hci/pages/login.html" }
})