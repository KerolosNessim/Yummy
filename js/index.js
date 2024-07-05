let submitBtn;
let sideWidth = $("aside .side-tabs").outerWidth();

$(document).ready(() => {
  SearchByName("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});

let openSide = () => {
  $("aside").animate({ left: 0 }, 500);
  $("aside .side-logo i.open-close-icon").removeClass("fa-align-justify");
  $("aside .side-logo i.open-close-icon").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $("aside .side-tabs ul li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
};
let closeSide = () => {
  $("aside").animate({ left: -sideWidth }, 500);
  $("aside .side-logo i.open-close-icon").addClass("fa-align-justify");
  $("aside .side-logo i.open-close-icon").removeClass("fa-x");
  $("aside .side-tabs ul li").animate({ top: 500 }, 500);
};
closeSide();
$("aside .side-logo i.open-close-icon").click(() => {
  if ($("aside").css("left") == "0px") {
    closeSide();
  } else {
    openSide();
  }
});

let SearchByFirstLitter = async (term) => {
  let finalTerm;
  term == "" ? (term = "a") : "";
  if (term.length > 1) {
    finalTerm = term.slice(0, 1);
  } else {
    finalTerm = term;
  }
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${finalTerm}`
  );
  let data = await response.json();
  let meals = data.meals;
  meals ? displayMeals(meals) : displayMeals([]);
  console.log(meals);
};
let SearchByName = async (term) => {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  let data = await response.json();
  let meals = data.meals;
  meals ? displayMeals(meals) : displayMeals([]);
  console.log(meals);
};
SearchByName("");

let displayMeals = (arr) => {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="col-md-3">
              <div class="meal overflow-hidden position-relative rounded-2">
                <img
                  class="img-fluid"
                  src=${arr[i].strMealThumb}
                  alt=""
                />
                <div class="meal-overlayer position-absolute d-flex align-items-center px-3 ">
                  <h3>${arr[i].strMeal}</h3>
                </div>
              </div>
        </div>
    
    `;
  }
  $("#rowData").html(cartona);
};
let getCategs = async () => {
  $(".search").html("");
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let data = await response.json();
  let categories = data.categories;
  displayCategories(categories);
  console.log(categories);
};
let displayCategories = (arr) => {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
            <div onclick="getCategMeals('${
              arr[i].strCategory
            }')" class="col-md-3">
              <div class="meal overflow-hidden position-relative rounded-2">
                <img
                  class="img-fluid"
                  src=${arr[i].strCategoryThumb}
                  alt=""
                />
                <div class="meal-overlayer position-absolute d-flex flex-column align-items-center px-3 ">
                  <h3>${arr[i].strCategory}</h3>
                  <P>${arr[i].strCategoryDescription
                    .split(" ")
                    .slice(0, 10)
                    .join(" ")}</P>
                </div>
              </div>
        </div>
    
    `;
  }
  $("#rowData").html(cartona);
};
let getAreas = async () => {
  $(".search").html("");
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let data = await response.json();
  let areas = data.meals;
  displayAreas(areas);
  console.log(data);
};
let displayAreas = (arr) => {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
            <div onclick="getAreaMeals('${arr[i].strArea}')" class="col-md-3">
              <div class="text-center">
              <i class="fa-solid fa-house fa-10x mb-2 "></i>

                  <h3>${arr[i].strArea}</h3>
              </div>
        </div>
    
    `;
  }
  $("#rowData").html(cartona);
};
let getIngerdients = async () => {
  $(".search").html("");
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let data = await response.json();
  let ingerdients = data.meals;
  displayIngerdients(ingerdients.slice(0, 20));
  console.log(data);
};
let displayIngerdients = (arr) => {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
            <div onclick="getIngredMeals('${
              arr[i].strIngredient
            }')" class="col-md-3">
              <div class="text-center">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
              </div>
        </div>
    
    `;
  }
  $("#rowData").html(cartona);
};
let getCategMeals = async (categ) => {
  $(".search").html("");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`
  );
  let data = await response.json();
  let meals = data.meals;
  displayMeals(meals.slice(0, 20));
  console.log(meals);
};
let getAreaMeals = async (area) => {
  $(".search").html("");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let data = await response.json();
  let meals = data.meals;
  displayMeals(meals.slice(0, 20));
  console.log(meals);
};
let getIngredMeals = async (ingred) => {
  $(".search").html("");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`
  );
  let data = await response.json();
  let meals = data.meals;
  displayMeals(meals.slice(0, 20));
  console.log(meals);
};
let getMealDetails = async (mealID) => {
  $(".search").html("");
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
};

let displayMealDetails = (meal) => {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  // let tags = meal.strTags.split(",")
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  $("#rowData").html(cartona);
};
function showSearch() {
  $(".search").html(`
            <div class="container py-3">
          <div class="row ">
            <div class="col-md-6">

              <input onkeyup="SearchByName(this.value)" class="form-control " type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
              <input onkeyup="SearchByFirstLitter(this.value)"  maxlength="1" class="form-control " type="text" placeholder="Search By First letter">
            </div>

          </div>
        </div>
    `);
  $("#rowData").html(``);
}
function showContacts() {
  $("#rowData")
    .html(`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-warning text-white  px-3 mt-3">Submit</button>
    </div>
</div> `);
  submitBtn = document.getElementById("submitBtn");
  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
