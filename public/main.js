
 /* main.js */

window.addEventListener('DOMContentLoaded', event =>{
    console.log('DOMContentLoaded')
    document.querySelector('button').addEventListener('click', makeCall)


})

            

async function makeCall() {
 
 const axiosPostCall = async () => {
    try {
      const { data } = await axios.post('https://julietgarage-secondpackage-8080.codio-box.uk/',  {
      // your expected POST request payload goes here
      a:1, 
      plm:"asdasd"

      })
   // enter you logic when the fetch is successful
      console.log(`data: `, data.msg)
   
    } catch (error) {
  // enter your logic for when there is an error (ex. error toast)
      console.log(`error: `, error)
    }
  }


axiosPostCall()
}
