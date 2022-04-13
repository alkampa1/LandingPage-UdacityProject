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
    anchor.className += "menu__link";
    anchor.innerHTML = name;
    li.appendChild(anchor);

    // Appends everything to the ul tag
    navList.appendChild(li);
  }
};

/**
 * @desc ddds an 'active' class to the sections when near top of viewport
 */
activeSection = () => {
  for (let section of sections) {
    let box = section.getBoundingClientRect();
    if (box.top <= 150 && box.bottom >= 150) {
      section.classList.add("your-active-class");
    } else {
      section.classList.remove("your-active-class");
    }
  }
};

/**
 * @desc Scroll to anchor ID using scrollTO event
 */
ScrollToAchor = () => {
  let sectionMenu = document.querySelectorAll(".menu_link");
  for (sect of sectionMenu) {
    sect.addEventListener("click", function (e) {
      e.preventDefault();
      sect.scrollIntoView({
        behavior: "smooth",
      });
    });
  }
};

/**
 * End Main Functions
 * Begin Events and function calls
 *
 */

// Build Navigation
navBuilder();

// Scroll to Anchor
ScrollToAchor();

// Section Active State
document.addEventListener("scroll", activeSection);

/**
 *  Additional features
 *
 */

/**
 * @desc add class 'active' to nav menu
 */
activeNav = () => {
  let links = navList.querySelectorAll("li");
  for (let link of links) {
    link.addEventListener("click", function (e) {
      //e.preventDefault(); --- Removing because preventDefault() stops the scroll to section event. Using stopImmediatePropagation() instead.
      e.stopImmediatePropagation();
      let prev = document.getElementsByClassName("activeNv");
      if (prev && prev[0]) {
        prev[0].classList.remove("activeNv");
      }
      this.classList.add("activeNv");
    });
  }
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
  bkTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

// Active top navigation
activeNav();

// scroll to top button
backToTop();

// Collapsible sections
collSections();

/**
 * Ends Events and function calls
 *
 */
