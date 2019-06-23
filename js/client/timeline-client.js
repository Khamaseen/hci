const button = document.getElementById("logoutButton")
const userName = document.getElementById("dashUsername")

button.addEventListener('click', e => {
    e.preventDefault()
    localStorage.removeItem('authToken')
    const token = localStorage.getItem('authToken')
    if(!token) { document.location.href="/hci/pages/login.html" }
})

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

$(document).ready(function (){
    
    const url = 'http://localhost:3000/timeline';
    
    $.get(url, function(result){
        result.docs.forEach(document => {
            var timelineTemplate = 
                `<div class="row no-gutters justify-content-end justify-content-md-around align-items-start  timeline-nodes">
                    <div class="col-10 col-md-5 order-3 order-md-1 timeline-content">
                        <h3 class=" text-light">${document.title}</h3>
                        <p>${document.paragraph}.</p>
                    </div>
                    <div class="col-2 col-sm-1 px-md-3 order-2 timeline-image text-md-center">
                        <img src="../resources/myAvatar.png" class="img-fluid" alt="img">
                    </div>
                    <div class="col-10 col-md-5 order-1 order-md-3 py-3 timeline-date">
                        <time>${document.date}</time>
                    </div>
                </div>`
            
            $("div.timeline").prepend(timelineTemplate);
        });
    });
});


$("#timelineSubmit").click(async function () {  
    const url = 'http://localhost:3000/timeline';

    try {
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                title: $("#titleInput").val(),
                paragraph: $('#textInput').val(),
                date: new Date().toDateString()
            }),
            headers: {
                "Content-type": "application/json",
            }
        });

        //Hanndle if the request is successful.
        if (response.ok) {
            let jsonResponse = await response.json();
            const headerTest = jsonResponse.createdTimeline.title;
            const paragraphTest = jsonResponse.createdTimeline.paragraph;
            const date = jsonResponse.createdTimeline.date;

            var timelineTemplate = 
        `<div class="row no-gutters justify-content-end justify-content-md-around align-items-start  timeline-nodes">
            <div class="col-10 col-md-5 order-3 order-md-1 timeline-content">
                <h3 class=" text-light">${headerTest}</h3>
                <p>${paragraphTest}.</p>
            </div>
            <div class="col-2 col-sm-1 px-md-3 order-2 timeline-image text-md-center">
                <img src="../resources/myAvatar.png" class="img-fluid" alt="img">
            </div>
            <div class="col-10 col-md-5 order-1 order-md-3 py-3 timeline-date">
                <time>${date}</time>
            </div>
        </div>`

            $("div.timeline").prepend(timelineTemplate);
            $("#addStoryModal").modal("hide");      
        }
    } catch (error) {
        console.log(error);
    }

});
