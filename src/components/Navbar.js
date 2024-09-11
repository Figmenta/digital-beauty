import Link from "next/link";
import Image from "next/image";
import "@/assets/scss/Navbar.scss";
import Logo from "@/assets/img/DigitalBeauty.svg";
import gsap from "gsap";
import { useEffect, useState } from "react";

const Navbar = ({ mainMenu, error }) => {
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
            <span className="navbar__logo-text">is magic</span>
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
                    <a href="/" className="contact-modal-trigger">
                      {menuItem.label}
                    </a>
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
