//Use URLSearchParams
let params = new URL(document.location).searchParams;
let id = params.get("id");

document.getElementById("orderId").innerHTML = id;
