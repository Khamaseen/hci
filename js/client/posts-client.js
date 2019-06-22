

$(document).ready(function (){
    
    const url = 'http://localhost:3000/post';
    
    $.get(url, function(result){
        result.docs.forEach(document => {
            var postTemplate = 
                `<div class="row no-gutters justify-content-end justify-content-md-around align-items-start  timeline-nodes">
                    <div class="col-10 col-md-5 order-3 order-md-1 timeline-content">
                        <h3 class=" text-light">${document.username}</h3>
                        <p>${document.paragraph}.</p>
                        <br>
                        <p class="text-white justify-content-left"> <b>"somebody: "</b> Great! Keep it going!</p>

                        <button class="btn btn-primary">comment <i class="far fa-comments"></i></button>
                    </div>
                    <div class="col-2 col-sm-1 px-md-3 order-2 timeline-image text-md-center">
                        <img src="../resources/myAvatar.png" class="img-fluid" alt="img">
                    </div>
                    <div class="col-10 col-md-5 order-1 order-md-3 py-3 timeline-date">
                        <time>${document.date}</time>
                    </div>
                </div>`
            
            $("div.timeline").prepend(postTemplate);
        });
    });
});


$("#postSubmit").click(async function () {  
    const url = 'http://localhost:3000/post';

    try {
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username: "Test User - This should be correct username",
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
            const headerTest = jsonResponse.createdTimeline.username;
            const paragraphTest = jsonResponse.createdTimeline.paragraph;
            const date = jsonResponse.createdTimeline.date;

            var postTemplate = 
        `<div class="row no-gutters justify-content-end justify-content-md-around align-items-start  timeline-nodes">
            <div class="col-10 col-md-5 order-3 order-md-1 timeline-content">
                <h3 class=" text-light">${headerTest}</h3>
                <p>${paragraphTest}.</p>
                <br>
                <p class="text-white justify-content-left"> <b>"somebody: "</b> Great! Keep it going!</p>

                <button class="btn btn-primary">comment <i class="far fa-comments"></i></button>
            </div>
            <div class="col-2 col-sm-1 px-md-3 order-2 timeline-image text-md-center">
                <img src="../resources/myAvatar.png" class="img-fluid" alt="img">
            </div>
            <div class="col-10 col-md-5 order-1 order-md-3 py-3 timeline-date">
                <time>${date}</time>
            </div>
        </div>`

            $("div.timeline").prepend(postTemplate);
        }
    } catch (error) {
        console.log(error);
    }

});