
$(document).ready(function (){
    const userName = document.getElementById("dashUsername")
    const dashboard = document.getElementById("dashboard")
    const dashboardText = document.getElementById("dashboardText")
    const dashboardDaysIn = document.getElementById("dashboardDaysIn")
    const dashboardDaysSinceBirth = document.getElementById("dashboardDaysSinceBirth")
    const dashboardLastRelapse = document.getElementById("dashboardLastRelapse")
    const button = document.getElementById("logoutButton")
    const relapseButton = document.getElementById("relapseButton")

    button.addEventListener('click', e => {
        e.preventDefault()
        localStorage.removeItem('authToken')
        const token = localStorage.getItem('authToken')
        if(!token) { document.location.href="/hci/pages/login.html" }
    })


    async function setName() {
        try {

            var id = localStorage.getItem("userID")
            var id = id.slice(1, -1)

            var url = 'http://localhost:3000/user/user'+ '/' + id 
            let response = await fetch(url)
        
            //Handle if the request is successful.
            if (response.ok) {
                let jsonObj = await response.json()
                var user = jsonObj.user
                userName.innerText = user.name
                var dateObj = user.babydob
                var date = new Date(dateObj)
                dashboardDaysSinceBirth.innerText = `It has been ${date.getMonth()} months and ${date.getDay()} days since ${user.babyname} has came to this little planet`
                dashboardText.innerHTML = `Hi there ${user.name}, we are ready for your support!`
                var dateObj = user.dateOptedIn
                var date = new Date(dateObj)
                dashboardDaysIn.innerHTML = `You've travelled ${date.getMonth()} months and ${date.getDay()} days with us.`
                var dateObj = user.lastRelapse
                var date = new Date(dateObj)
                dashboardLastRelapse.innerHTML = `Your last relapse.. ${date.getMonth()} months and ${date.getDay()} days ago.`
            }
        }catch (e) {
            console.log("Couldn't fetch the user")
        }
    }

    setName()

    relapseButton.addEventListener('click', async function(e) {
        e.preventDefault()
        try {

            var id = localStorage.getItem("userID")
            var id = id.slice(1, -1)

            var url = 'http://localhost:3000/user/' + id 

            var dd = new Date().getDate()
            
            console.log(dd)
        
            let response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify({
                    lastRelapse: new Date().getDate()
                }),
                headers: {
                    "Content-type": "application/json",
                }
            });
        
            //Handle if the request is successful.
            if (response.ok) {
                let jsonObj = await response.json()
                var user = jsonObj.user
                var dateObj = user.lastRelapse
                var date = new Date(dateObj)
                dashboardLastRelapse.innerHTML = `Your last relapse.. ${date.getMonth()} months and ${date.getDay()} days ago.`
            }
        }catch (e) {
            console.log("Couldn't fetch the user")
        };
    })
})
