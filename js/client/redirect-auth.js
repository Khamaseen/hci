//redirects when no correct token is applied

var token = localStorage.getItem('authToken')

if(!token) {
    document.location.href="/hci/pages/login.html"
}