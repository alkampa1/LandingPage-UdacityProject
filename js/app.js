/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * highlights section in viewport upon scrolling,
 * collapses sections,
 * and moves users back to the top of the screen.
 *
 *
 */

/**
 * Define Global Variables
 */
const navList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const collapSects = document.getElementsByClassName("collapsible");
const bkTopBtn = document.getElementById("bkTopBtn");

/**
 * End Global Variables
 * Begin Main Functions
 *
 */

/**
 * @desc dynamically creates the top navigation
 *
 */
navBuilder = () => {
  for (let i = 0; i < sections.length; i++) {
    // creates the li and a tags.
    let li = document.createElement("li");
    let anchor = document.createElement("a");

    // Gets the attributes from the sections for the name and link of the nav
    let name = sections[i].getAttribute("data-nav");
    let link = sections[i].getAttribute("id");

    // creates the nav by settings the attributes, adding the class and appending the anchor tag to the li
    anchor.setAttribute("href", "#" + link);
    anchor.setAttribute("id", "secNum" + [i + 1]);
    anchor.className += "menu__link";
    anchor.innerHTML = name;
    li.appendChild(anchor);

    // Appends everything to the ul tag
    navList.appendChild(li);

    // Adds scroll to anchor ID
    document
      .getElementById("secNum" + [i + 1])
      .addEventListener("click", () => {
        console.log("heyy!");
        ScrollToAchor(i + 1);
      });
  }
};

/**
 * @desc ddds an 'active' class to the sections when near top of viewport
 */
makeActive = () => {
  for (let section of sections) {
    let box = section.getBoundingClientRect();
    if (box.top >= 0) {
      section.classList.add("your-active-class");
    } else {
      section.classList.remove("your-active-class");
    }
  }
};

/**
 * @desc add class 'active' to nav menu
 */
activeNav = () => {
  let links = navList.querySelectorAll("li");
  for (let link of links) {
    link.addEventListener("click", () => {
      if (link.className === "active") {
        link.classList.remove("active");
      } else {
        link.classList.add("active");
      }
    });
  }
};

/**
 * @desc Scroll to anchor ID using scrollTO event
 * @param {num} the number in the id of the active nav
 */
ScrollToAchor = (num) => {
  let sectionMenu = document.querySelector("#secNum" + num);
  window.scrollTo({
    top: sectionMenu,
    behavior: "smooth",
  });
};

/**
 * @desc collapsible sections
 *
 */
collSections = () => {
  for (let j = 0; j < collapSects.length; j++) {
    collapSects[j].addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.toggle("collActive");
      let contents = document.querySelectorAll(".content");
      if (contents[j].style.display === "block") {
        contents[j].style.display = "none";
      } else {
        contents[j].style.display = "block";
      }
    });
  }
};

/**
 * @desc moves back to the top of the screen
 *
 */
backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/**
 * End Main Functions
 * Begin Events and function calls
 *
 */

// scroll to top button
bkTopBtn.addEventListener("click", backToTop);

// Collapsible sections
collSections();

// Active top navigation
document.addEventListener("click", activeNav);

// Build menu
navBuilder();

// Set sections as active
document.addEventListener("scroll", makeActive);

/**
 * Ends Events and function calls
 *
 */
