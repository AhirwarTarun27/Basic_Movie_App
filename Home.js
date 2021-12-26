const apikey = `a3756eaf`;
let url = "http://www.omdbapi.com/?s=";

var images = [
  "https://live.staticflickr.com/4191/34054101300_067a8df1af_b.jpg",
  "https://www.imago-images.com/bild/st/0097823035/w.jpg",
  "https://webneel.net/file/images/11-16/8-xmen-movie-poster-design.jpg",
  "http://themoviemensch.com/wp-content/uploads/2018/04/avengers-logo.jpg",
];

let slideBox = document.getElementById("slideShow");

let i = 0;

let slideShow = () => {
  setInterval(() => {
    if (i == images.length) {
      i = 0;
    }

    slideBox.innerHTML = null;

    let img = document.createElement("img");
    img.style.width = "100%";
    img.style.height = "100%";

    img.src = images[i];

    slideBox.append(img);
    i++;
  }, 3000);
};
slideShow();

// Debouncing =>

let movies_div = document.getElementById("movieList");
let timerId;

async function displayMovies() {
  try {
    movies_div.textContent = null;
    let name = document.getElementById("search").value;
    console.log("name:", name);

    if (name.length > 1) {
      let res = document.getElementById("movieList");
      res.style.display = "block";
    }
    if (name.length < 1) {
      let res = document.getElementById("movieList");
      res.style.display = "none";
      return false;
    }

    let response = await fetch(
      `http://www.omdbapi.com/?s=${name}&apikey=a3756eaf`
    );

    let new_data = await response.json();

    return new_data.Search;
  } catch (error) {
    console.log("error:", error);
  }
}

// movies_div.addEventListener("mouseleave", () => {
//   movies_div.style.display = "none";
// });

async function listMovies() {
  console.log("fired after 2sec");
  movies_div.innerHTML = null;

  let movie_data = await displayMovies();

  if (movie_data == undefined) {
    return false;
  }

  movie_data.forEach(function (movie) {
    let p = document.createElement("p");
    p.setAttribute("id", "movieName");
    console.log("movie:", movie.Title);
    p.innerText = movie.Title;

    p.onclick = () => {
      showImdb(movie.Title);
    };
    // let np = document.getElementById("movieName");
    // np.addEventListener("click", function () {
    //   console.log("Hi");
    // });
    movies_div.append(p);
  });
}

//function for clicking the movie name in the listmovies function

function debounce(func, delay) {
  let name = document.getElementById("search").value;
  console.log("name:", name);

  clearInterval(timerId);

  timerId = setTimeout(() => {
    func();
  }, delay);
}

let body = document.querySelector("body");

function Select() {
  //   e.preventDefault();
  var search = document.getElementById("search").value;

  let newUrl = url + search + `&apikey=${apikey}`;
  console.log("newUrl:", newUrl);

  async function getProducts() {
    try {
      const response = await fetch(newUrl);

      const new_data = await response.json();
      // console.log("new_data:", new_data);
      insertProduct(new_data.Search);
    } catch (error) {
      let body = document.querySelector("body");
      let div = document.createElement("div");
      div.setAttribute("id", "errorBox");

      // let img = document.createElement("img");
      // img.setAttribute("id", "errorImg");
      // img.src =
      //   "https://tenor.com/view/404-whoops-afas-afas-software-erro-gif-14844976";

      let div2 = document.createElement("div");
      div2.setAttribute("class", "gif");
      div2.innerHTML = `<iframe src="https://giphy.com/embed/UoeaPqYrimha6rdTFV" width="480" height="270" frameBorder="0" class="giphy-embed" ></iframe><p></p>`;

      div.append(div2);
      body.append(div);
    }
  }

  let mainDiv = document.getElementById("main");
  getProducts();

  function insertProduct(product) {
    mainDiv.innerHTML = "";
    product.forEach(function (data) {
      // console.log("data:", data);

      //for Pagination effect i made mainImg div where all the items were inserted and make position: relative
      let div1 = document.createElement("div");
      div1.setAttribute("class", "mainImg");

      //i made image as a display block which eleminate bottom space
      let img = document.createElement("img");
      img.setAttribute("class", "movie_img");
      img.src = data.Poster;

      //overlay box for cover the background by setting position absolute
      let div_overlay = document.createElement("div");
      div_overlay.setAttribute("class", "img_overlay");
      div_overlay.addEventListener("click", () => showImdb(data.Title));

      let overDiv = document.createElement("div");
      overDiv.setAttribute("class", "overDiv");

      var p_title = document.createElement("p");
      p_title.setAttribute("id", "title");
      p_title.innerText = data.Title;

      let r_date = document.createElement("p");
      r_date.setAttribute("class", "rdate");
      r_date.innerText = data.Year;

      overDiv.append(p_title);

      div_overlay.append(overDiv, r_date);

      div1.append(img, div_overlay);

      mainDiv.append(div1);

      // document.getElementById("search").value = "";
    });
  }

  const newKey = `c2a4d9ff`;

  //function for the pageination box
}
function showImdb(name) {
  let url2 = "http://www.omdbapi.com/?t=";

  // let title = document.getElementById("title");
  // console.log("title:", title.innerText);

  let disUrl = url2 + name + `&apikey=c2a4d9ff`;
  console.log("disUrl:", disUrl);

  async function getData() {
    const res = await fetch(disUrl);

    const data = await res.json();
    console.log("data:", data);
    getImdb(data);
  }
  getData();

  function getImdb(input) {
    console.log("input:", input.Poster);

    // console.log("title:", title);

    let secBox = document.createElement("div");
    secBox.setAttribute("class", "secBox");

    let mainDiv2 = document.createElement("div");
    mainDiv2.setAttribute("id", "mainDiv2");

    let leftBox = document.createElement("div");
    leftBox.setAttribute("class", "leftBox");

    let img = document.createElement("img");
    img.setAttribute("class", "pageOverImg");
    img.src = input.Poster;

    leftBox.append(img);

    let rightBox = document.createElement("div");
    rightBox.setAttribute("class", "rightBox");

    let removeBox = document.createElement("div");
    removeBox.setAttribute("class", "remove");

    let remove = document.createElement("button");
    remove.innerHTML = "Back";
    remove.addEventListener("click", function (e) {
      let rem = document.getElementsByClassName("secBox");
      console.log("rem:", rem);
      rem[0].remove();
      // e.parentNode.style.display = "none";
      // // rem.style.display = "none";

      remEle(rem);
    });

    removeBox.appendChild(remove);

    let heading = document.createElement("div");
    heading.setAttribute("class", "pageOverHead");
    heading.innerHTML = `<h1>${name}</h1>`;

    let dis = document.createElement("div");
    dis.setAttribute("class", "discription");

    let p1 = document.createElement("p");
    p1.innerHTML = `<span><h3>Genre :-</h3></span> ${input.Genre}`;

    let p2 = document.createElement("p");
    p2.innerHTML = `<h3>Director :-</h3> ${input.Director}`;

    let p3 = document.createElement("p");
    p3.innerHTML = `<h3>Plot :</h3> ${input.Plot}`;

    let p4 = document.createElement("p");
    p4.innerHTML = `<h3>IMDb Rating :- </h3> <h2>${input.imdbRating}</h2>`;

    let recomdation = document.createElement("div");
    recomdation.setAttribute("class", "reTag");

    if (input.imdbRating > 8.5) {
      recomdation.style.backgroundColor = "#2b4783";
      recomdation.style.textAlign = "center";
      recomdation.style.padding = "10px";
      recomdation.innerHTML = `<h2>Recommended</h2>`;
    } else {
      recomdation.innerHTML = null;
    }

    dis.append(p1, p2, p3, p4);

    rightBox.append(removeBox, heading, dis, recomdation);

    mainDiv2.append(leftBox, rightBox);
    secBox.append(mainDiv2);

    body.append(secBox);
  }
}
