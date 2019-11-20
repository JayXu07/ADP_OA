const access_token = "z3YuLe14jsuaVIlPAwVzfPhWhHeRer6eyVFYhQQkMz29yiPiwRUzgxyJ0ThwPWLqLLvljFf6RDK736b45szJ1psipBov0f4qekrRjM1q5XwSiAvN5sikt4XMW2DUXXYx";
const businesses_url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=icecream&location=Alpharetta'
let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + access_token);


function getData() {
  fetch(businesses_url, {
    headers: myHeaders
  }).then((res) => {
    return res.json();
  }).then((data) => {

    // sort the top 5
    var len = data.businesses.length;
    for (let i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
        if (data.businesses[j].rating > data.businesses[j + 1].rating) {
          var temp = data.businesses[j];
          data.businesses[j] = data.businesses[j + 1];
          data.businesses[j + 1] = temp;
        }
      }
    }
    var newData = (data.businesses.slice(-5)).reverse();
    //console.log(newData);
    var newReview = Array(newData.length).fill({});
    async function fetchReviews() {
      for (let i = 0; i < newData.length; i++) {
        let awaitFetch = await fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + newData[i].id + "/reviews", {
          headers: myHeaders
        });
        let res = await awaitFetch.json();
        console.log(" Business Name: ", newData[i].name + "\n",
          "Business address: ", newData[i].location.address1, newData[i].location.city + "\n",
          "Rating: ", newData[i].rating + "\n",
          "Reviews: ", res.reviews.map((review) => {
            return review.text + [];
          })
        )

      }
    }
    fetchReviews();


  });



}