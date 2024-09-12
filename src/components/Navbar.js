import Link from "next/link";
import Image from "next/image";
import "@/assets/scss/Navbar.scss";
import Logo from "@/assets/img/DigitalBeauty.svg";
import gsap from "gsap";
import { useEffect, useState } from "react";

const Navbar = ({ mainMenu, error }) => {
  useEffect(() => {
    var dataText = [
      "Magic",
      "Delicious",
      "Divine",
      "Enchanting",
      "Ravishing",
      "Heavenly",
      "Ambrosial",
      "Flavorful",
      "Gratifying",
      "Exquisite",
      "Delightful",
    ];

    // Function to type one text in the typewriter
    function typeWriter(text, i, fnCallback) {
      // Check if text isn't finished yet
      if (i < text.length) {
        // Add next character to html element
        document.querySelector("#typewriter").innerHTML =
          text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

        // Wait for a while and call this function again for next character
        setTimeout(function () {
          typeWriter(text, i + 1, fnCallback);
        }, 100);
      }
      // Text finished, call callback if there is
      else if (typeof fnCallback == "function") {
        // Call callback after timeout
        setTimeout(fnCallback, 1500);
      }
    }

    function StartTextAnimation(i) {
      // Restart
      if (i >= dataText.length) {
        i = 0;
      }
      // Start typewriter animation for the current text
      typeWriter(dataText[i], 0, function () {
        StartTextAnimation(i + 1);
      });
    }

    StartTextAnimation(0);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        document.querySelector(".navbar").classList.add("scrolled");
      } else {
        document.querySelector(".navbar").classList.remove("scrolled");
      }
    });
  }, []);

  const toggleHamburgerMenu = () => {
    const hiddenWrapper = document.querySelector(".navbar__hidden-wrapper");
    const mainMenuItems = document.querySelectorAll(
      ".navbar__divisions-menu-item"
    );

    const mainMenu = document.querySelector(".navbar__main-menu");
    mainMenu.classList.toggle("active");
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      gsap.to(mainMenu, {
        opacity: 0,
        duration: 0.3,
      });
    } else {
      gsap.to(mainMenu, {
        opacity: 1,
        duration: 0.3,
      });
    }
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar__logo">
          <Link href={"/"} className="navbar-link">
            <picture>
              <Image src={Logo} alt="Figmenta Logo" />
            </picture>
            <span className="navbar__logo-text">
              is <span id="typewriter"></span>
            </span>
          </Link>
        </div>
        <div className="navbar__right-side">
          <div
            className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
            onClick={toggleHamburgerMenu}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <ul className="navbar__main-menu">
            {mainMenu.map((menuItem, index) => {
              const isLastItem = index === mainMenu.length - 1;

              if (isLastItem) {
                return (
                  <li
                    key={index}
                    className="navbar__main-menu-item special-item"
                    //onClick={openContactModal}
                  >
                    <Link href="/" className="contact-modal-trigger">
                      {menuItem.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={index} className="navbar__main-menu-item">
                  <Link href={"/"} className="navbar-link" passHref>
                    {menuItem.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
