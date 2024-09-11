import "@/assets/scss/PicturesArchive.scss";
import Image from "next/image";
import viewIcon from "@/assets/img/view-icon.svg";
import { useEffect, useState } from "react";
import "@/assets/scss/TaxFilters.scss";
import closeIcon from "@/assets/img/close-icon.svg";
import tickIcon from "@/assets/img/tick-icon.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PicturesArchive = ({ pictures, categories }) => {
  const [filteredPictures, setFilteredPictures] = useState(pictures);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [responsive, setResponsive] = useState(0);

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
    }, 100)
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setResponsive(window.innerWidth);
    });
    window.addEventListener("load", () => {
      setResponsive(window.innerWidth);
    });
  }, []);

  return (
    <>
      <div className="pictures-archive">
        {pictureColumns.map((column, columnIndex) => (
          <div className="pictures-archive__column" key={columnIndex}>
            {column.map((picture, index) => (
              <picture key={index}>
                <div className="pictures-archive__overlay">
                  <Image src={viewIcon} alt="View Icon" />
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
                  alt={picture.pictureFile.pictureFile.node.altText || "Image"}
                  style={{ width: "100%", height: "auto" }}
                  priority={index === 0}
                />
              </picture>
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
              src={closeIcon}
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
