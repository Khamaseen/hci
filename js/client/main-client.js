


$(document).ready(function (){
    const userName = document.getElementById("dashUsername")
    const dashboardText = document.getElementById("dashboardText")
    const dashboardDaysIn = document.getElementById("dashboardDaysIn")
    const dashboardDaysSinceBirth = document.getElementById("dashboardDaysSinceBirth")
    const dashboardLastRelapse = document.getElementById("dashboardLastRelapse")
    const button = document.getElementById("logoutButton")
    const quoteBox = document.getElementById('quoteBox')


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

    function getQuote() {
        const day = new Date().getDay()
        return quotes[day]
    }
    quoteBox.innerText = getQuote()

})

const quotes = ["Your life is in your hands, to make of it what you choose.",
"Smoking is a habit that drains your money and kills you slowly, one puff after another. Quit smoking, start living.",
"A cigarette is the only consumer product which when used as directed kills its consumer.",
"Smoking cigarettes is like paying to have your life cut shorter.",
"If you ever lit a cigarette in your life, you have very little will to live.",
"Burn calories, not cigarettes.",
"The key is focusing on the positive. Build up the good things in your life and the smoking will go away by itself.",
"Be brighter, put down the lighter.",
"Life’s vibrant hues are way too beautiful and precious to be distorted by the smoke of cigarettes.",
"Only a fool would put his lips at the other end of a burning fire. Stop being a fool.",
"A cigarette a day keeps the doctor in pay.",
"Cigarette: A fire at one end, a fool at the other, and a bit of tobacco in between.",
"It’s never too late – in fiction or in life – to revise.",
"Tar the roads, not your lungs.",
"Cigarettes are the classy way to commit suicide.",
"I count him braver who overcomes his desires than him who conquers his enemies; for the hardest victory is over self.-Aristotle ", 
"Thousands of people stop smoking a day – by dying from it.",
"If people don’t love themselves enough to cut down on their smoking, they may love someone else enough to do it.",
"When you can stop, you don’t want to, and when you want to stop, you can’t.",
"Gift your lungs oxygen not tar. Gift your body exercise not bad health. Gift your lips kisses not cigarette butts. Gift yourself a life not death.",
"Smokers, male and female, inject and excuse idleness in their lives every time they light a cigarette.",
"We cannot, in a moment, get rid of habits of a lifetime.- Mahatma Gandhi", 
"Smokers don’t grow old…they die young.",
"What lies in our power to do, lies in our power not to do.-Aristotle",
"Inhale the future, exhale the past.",
"Disadvantages of smoking are many but those of quitting are none. Advantages of smoking are none but those of quitting are many.",
"The mind always fails first, not the body. The secret is to make the mind work for you not against you.",
"Say yes to life, say no to tobacco.",
"Good habits are just as addictive as bad habits. But much more rewarding.",
"Giving up doesn’t always mean you are weak, sometimes it means you are strong enough and smart enough to let go.",
"Don’t exchange what you want most for what you want at that moment.",
"Smoking helps in losing weight, one lung at a time.",
"Cigarettes are killers that travel in packs.",
"Smoking: It ruins your life, her life, and their lives.",
"Your craving is TEMPORARY but the damage to your lungs is PERMANENT.",
"Replacing the smoke on your face with a smile today will replace illness in your life with happiness tomorrow.",
"A cigarette says: Today you turn me into ashes, but tomorrow is my turn.",
"Health is not everything, but without health, everything else is nothing.",
"This could be the day you stop doing that self-destructive thing you do.",
"The best time to quit smoking was the day you started, the second best time to quit is today."]


