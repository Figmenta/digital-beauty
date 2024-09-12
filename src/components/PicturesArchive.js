import "@/assets/scss/PicturesArchive.scss";
import Image from "next/image";
import viewIcon from "@/assets/img/view-icon.svg";
import { useEffect, useState, useRef } from "react";
import "@/assets/scss/TaxFilters.scss";
import closeIcon from "@/assets/img/close.svg";
import closePill from "@/assets/img/close-icon.svg";
import tickIcon from "@/assets/img/tick-icon.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

const PicturesArchive = ({ pictures, categories }) => {
  const [filteredPictures, setFilteredPictures] = useState(pictures);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [responsive, setResponsive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openTl = useRef(null);

  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
    setTimeout(() => {
      gsap.fromTo(
        ".tax-filters__modal-content",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power1.inOut" }
      );

      gsap.fromTo(
        ".tax-filters__category-option",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.5,
          stagger: { each: 0.2, amount: 0.4 },
          ease: "power1.inOut",
        }
      );
    }, 100);
  };

  const closeCategoryModal = () => {
    gsap.to(".tax-filters__category-option", {
      opacity: 0,
      y: 20,
      duration: 0.2,
      stagger: { each: 0.2, amount: 0.5, from: "end" },
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(".tax-filters__modal-content", {
          opacity: 0,
          duration: 0.4,
          ease: "power1.inOut",
          onComplete: () => {
            setIsCategoryModalOpen(false);
          },
        });
      },
    });
  };

  useEffect(() => {
    if (selectedCategory) {
      setFilteredPictures(
        pictures.filter((pic) =>
          pic.categories.nodes.some(
            (category) => category.name === selectedCategory
          )
        )
      );
    } else {
      setFilteredPictures(pictures);
    }
  }, [selectedCategory, pictures]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    closeCategoryModal();
  };

  const handleCloseIconBehavior = (e) => {
    e.stopPropagation();
    setSelectedCategory("");
  };

  // Dividir las imágenes en columnas, por ejemplo, 3 columnas
  let columns = 4;
  if (responsive < 768) {
    columns = 2;
  } else if (responsive < 1024) {
    columns = 3;
  }

  const pictureColumns = Array.from({ length: columns }, () => []);

  filteredPictures.forEach((picture, index) => {
    pictureColumns[index % columns].push(picture);
  });

  useEffect(() => {
    setTimeout(() => {
      const container = document.querySelector(".pictures-archive");

      gsap.fromTo(
        container,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duracion: 0.5,
        }
      );

      const pictures = document.querySelectorAll(
        ".pictures-archive__column picture"
      );

      pictures.forEach((pic) => {
        gsap.fromTo(
          pic,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duracion: 0.5,
            delay: 0.3,
            scrollTrigger: {
              trigger: pic,
              toggleActions: "play none none reverse",
              start: "top bottom-=10%",
            },
          }
        );
      });
    }, 100);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setResponsive(window.innerWidth);
    });
    window.addEventListener("load", () => {
      setResponsive(window.innerWidth);
    });
  }, []);

  let wasOpened = false;

  const openModal = (e, reverse = false) => {
    const pictureWrapper = e.target.querySelector(".picture-wrapper")
      ? e.target.querySelector(".picture-wrapper")
      : e.target.closest(".picture-wrapper");
    const picture = pictureWrapper.querySelector(".pictures-archive__image");
    const img = pictureWrapper.querySelector(".pictures-archive__image>img");
    const content = pictureWrapper.querySelector(".pictures-archive__content");
    const overlay = pictureWrapper.querySelector(".pictures-archive__overlay");
    const headerItems = [
      pictureWrapper.querySelector(".pictures-archive__title"),
      pictureWrapper.querySelector(".close-icon"),
    ];
    const pictureData = picture.getBoundingClientRect();
    const imgData = {
      width: picture.getAttribute("data-width"),
      height: picture.getAttribute("data-height"),
    };

    const responsive = window.innerWidth < 768 ? true : false;

    if (reverse === false && !wasOpened) {
      openTl.current = gsap.timeline({
        paused: true,
        onStart: () => {
          wasOpened = true;
          document.body.style.overflow = "hidden";
        },
        onReverseComplete: () => {
          wasOpened = false;
          document.body.style.overflow = "auto";
        },
      });

      openTl.current
        .add([
          gsap.to(img, {
            scale: 1,
            duration: 0,
          }),
          gsap.to([e.target.closest(".pictures-archive__picture"), picture], {
            height: pictureData.height,
            width: pictureData.width,
            duration: 0,
          }),
          gsap.to(pictureWrapper, {
            position: "fixed",
            top:
              e.target.closest(".pictures-archive__picture").offsetTop -
              window.scrollY,
            left: e.target.closest(".pictures-archive__picture").offsetLeft,
            height: pictureData.height,
            width: pictureData.width,
            duration: 0,
          }),
          gsap.to(overlay, {
            display: "none",
            duration: 0,
          }),
          gsap.to(picture, {
            duration: 0,
          }),
          /*
          gsap.to(postWrapper.querySelector("picture"), {
            duration: 0.3,
            height: imageRect.height,
            width: resWidth,
          }),
          */
        ])
        .add([
          gsap.to(pictureWrapper, {
            padding: responsive ? `18.583vw 26.25vw` : `9.583vw 26.25vw`,
            backgroundColor: "rgb(217, 217, 217, 0.95)",
            top: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            margin: "1.467vw",
            width: "calc(100vw - (1.467vw * 2))",
            height: "calc(100vh - 1.467vw)",
            zIndex: "1000",
            overflowY: "scroll",
            duration: 0.3,
          }),
          gsap.to(picture, {
            width: imgData.width,
            height: imgData.height,
            margin: "0 auto",
          }),
          gsap.to(content, {
            display: "flex",
            flexDirection: "column",
          }),
          gsap.to(headerItems, {
            opacity: 1,
            duration: 0.3,
            delay: 0.3,
          })
        ]);
      openTl.current.play();
    } else {
      openTl.current.reverse();
    }
  };

  return (
    <>
      <div className="pictures-archive">
        {pictureColumns.map((column, columnIndex) => (
          <div className="pictures-archive__column" key={columnIndex}>
            {column.map((picture, index) => (
              <div
                className="pictures-archive__picture"
                onClick={(e) => {
                  openModal(e);
                }}
              >
                <div className="picture-wrapper">
                  <h2 className="pictures-archive__title">{picture.title}</h2>
                  <Image
                    src={closeIcon}
                    className="close-icon"
                    onClick={(e) => {
                      openModal(e, true);
                    }}
                  />
                  <picture
                    key={index}
                    className="pictures-archive__image"
                    data-width={
                      picture.pictureFile.pictureFile.node.mediaDetails.width
                    }
                    data-height={
                      picture.pictureFile.pictureFile.node.mediaDetails.height
                    }
                  >
                    <div className="pictures-archive__overlay">
                      <Link
                        target={picture.pictureFile.pictureLink ? `_blank` : ""}
                        href={
                          picture.pictureFile.pictureLink
                            ? picture.pictureFile.pictureLink
                            : ""
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Image src={viewIcon} alt="View Icon" />
                      </Link>
                      <div className="pictures-archive__overlay-background"></div>
                      <span>{picture.title}</span>
                    </div>
                    <Image
                      src={picture.pictureFile.pictureFile.node.sourceUrl}
                      width={
                        picture.pictureFile.pictureFile.node.mediaDetails.width
                      }
                      height={
                        picture.pictureFile.pictureFile.node.mediaDetails.height
                      }
                      alt={
                        picture.pictureFile.pictureFile.node.altText || "Image"
                      }
                      style={{ width: "100%", height: "auto" }}
                      priority={index === 0}
                    />
                  </picture>
                  <div className="pictures-archive__content">
                    <div
                      className="the-content"
                      dangerouslySetInnerHTML={{ __html: picture.content }}
                    ></div>
                    {picture.pictureFile.pictureLink && (
                      <Link
                        target="_blank"
                        href={picture.pictureFile.pictureLink}
                        className="picture-link"
                      >
                        Visit
                      </Link>
                    )}
                    <div className="pictures-archive__content-data">
                      <div className="pictures-archive__content-data-item">
                        <h4>Style</h4>
                        <p>{picture.styles?.nodes[0]?.name}</p>
                      </div>
                      <div className="pictures-archive__content-data-item">
                        <h4>Format</h4>
                        <p>{picture.formats?.nodes[0]?.name}</p>
                      </div>
                      <div className="pictures-archive__content-data-item">
                        <h4>Industry</h4>
                        <p>{picture.categories?.nodes[0]?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="tax-filters">
        <div className="tax-filters__wrapper">
          <div className="tax-filters__style-selector">{"Style"}</div>
          <div className="tax-filters__format-selector">{"Format"}</div>
          <div
            className="tax-filters__category-selector"
            onClick={openCategoryModal}
          >
            {"Industry"}
          </div>
        </div>
        {isCategoryModalOpen && (
          <div className="tax-filters__modal" /*onClick={closeCategoryModal}*/>
            <div
              className="tax-filters__modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="tax-filters__modal-items-wrapper">
                {categories.map(
                  (category) =>
                    category.name !== "Uncategorized" && (
                      <span
                        key={category.name}
                        className={`tax-filters__category-option ${
                          selectedCategory === category.name ? "selected" : ""
                        }`}
                        onClick={() => handleCategoryChange(category.name)}
                      >
                        <picture>
                          {category.categoryImage.selectFile && (
                            <img
                              src={
                                category.categoryImage.selectFile.node.sourceUrl
                              }
                              alt={category.name}
                            />
                          )}
                        </picture>
                        <picture className="tick">
                          <Image src={tickIcon} alt="Tick Icon" />
                        </picture>
                        {category.name}
                      </span>
                    )
                )}
              </div>
            </div>
          </div>
        )}
        {selectedCategory !== "" && (
          <span className="selected-tax-name">
            {selectedCategory}
            <Image
              src={closePill}
              width={17}
              height={17}
              className="close-icon"
              alt={"Close Icon"}
              onClick={(e) => {
                handleCloseIconBehavior(e);
              }}
            />
          </span>
        )}
      </div>
    </>
  );
};

export default PicturesArchive;
