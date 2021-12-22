//Use URLSearchParams for orderID number
let params = new URL(document.location).searchParams;
let id = params.get("id");

//Display orderID number on order confirmation page
document.getElementById("orderId").innerHTML = id;
