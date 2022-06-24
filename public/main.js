
 /* main.js */



window.addEventListener('DOMContentLoaded', event =>{
    console.log('DOMContentLoaded')

    // var elements = document.getElementsByClassName("button-add-transit");   

    Array.from(document.getElementsByClassName('button-add-transit')).forEach(function (elm) { 
        elm.addEventListener('click', myHandler)
        
    })


    function myHandler() {
        console.log('asdasd')
    }
    // for(var i = 0, len = elements.length; i < len; i++) {   
    //     // console.log("Button: ", elements[i].value);
    //     elements[i].addEventListener('click', ()=> {
    //         console.log('Clicked button', i)
    //     })
    // }


    // console.log(i)
    // elements[i].addEventListener('click', ()=>{
    //     console.log(elements[i].value)
    // })    


// <ul>
// 						<li>Sender PostCode</li>
// 						<li>Recipient PostCode</li>
// 						<li>Weight</li>
// 						<li>Recipient Name</li>
// 						<li>Sender Username</li>
// 						<li>Date Posted</li>
// 						<li>Unique ID</li>
// 						<li>Status</li>
// 					<ul>




  
})
