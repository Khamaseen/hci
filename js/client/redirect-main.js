//redirects to main when there already is a valid token present

var token = localStorage.getItem('authToken')

if(token) {
    document.location.href="/hci/pages/main.html"
}