
$(function() {
    $('#login-button').on('click', function(event) {
        event.preventDefault();

        var requestData = $('#login-form, :input').serializeArray();
        // var email = requestData[0].value;
        $('#random').html(requestData[1].value);

    })
})
