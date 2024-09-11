import "@/assets/scss/TaxFilters.scss";
import Image from "next/image";
import { useState } from "react";
import gsap from "gsap";
import closeIcon from "@/assets/img/close-icon.svg";

const TaxFilters = ({ categories = [] }) => {
  console.log(categories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    closeCategoryModal();
  };

  const handleCloseIconBehavior = (e) => {
    e.stopPropagation();
    setSelectedCategory("");
  };

  return (
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
            onClick={(e) => {
              handleCloseIconBehavior(e);
            }}
          />
        </span>
      )}
    </div>
  );
};

export default TaxFilters;
