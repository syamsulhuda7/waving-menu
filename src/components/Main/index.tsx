import { useState } from "react";
import styles from "./Main.module.scss";
import { Page } from "../SingleMenu";

// Menu data
const menu = [
  { icon: "bxs-dashboard", text: "Dashboard" },
  { icon: "bxs-group", text: "Profile" },
  { icon: "bxs-cog", text: "Service" },
  { icon: "bxs-contact", text: "Contact" },
  { icon: "bxs-carousel", text: "About Us" },
  { icon: "bxs-trophy", text: "Achievement" },
  { icon: "bxs-box", text: "Project" },
  { icon: "bxs-package", text: "Product" },
];

// Helper function for animation classes
const getAnimationClass = (
  hoverIndex: number,
  index: number
): string | undefined => {
  const distance = Math.abs(hoverIndex - index);
  return styles[`duration${distance + 1}`];
};

export const Main = () => {
  const [isHovered, setIsHovered] = useState<boolean | null>(null);
  const [indexHovered, setIndexHovered] = useState<number>(0);
  const [isChangeIndex, setIsChangeIndex] = useState<boolean>(true);
  const [pageValue, setPageValue] = useState<string>("Dashboard");
  // const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const handleMouseEnter = (index: number) => {
    setIsHovered(true);
    if (isChangeIndex) {
      setIndexHovered(index);
    }
    setIsChangeIndex(false);
    setTimeout(() => {
      setIsChangeIndex(true);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.container__content}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsChangeIndex(true);
        }}
      >
        {menu.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setIsHovered(false);
              setIndexHovered(index);
              setPageValue(item.text);
            }}
            className={`${styles.container__content__items} ${
              isHovered ? styles.wide : styles.narrow
            }`}
          >
            {/* Icon */}
            <i
              className={`${pageValue === item.text && styles.active} ${
                styles.container__content__items__icon
              } bx ${item.icon}`}
              onMouseEnter={() => handleMouseEnter(index)}
            ></i>

            {/* Text */}
            <div
              className={[
                styles.container__content__items__text,
                getAnimationClass(indexHovered, index),
                isHovered === true &&
                  styles.container__content__items__text__active,
                isHovered === false &&
                  styles.container__content__items__text__inactive,
              ]
                .filter(Boolean)
                .join(" ")}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              {item.text}
            </div>
          </div>
        ))}
      </div>
      <Page title={pageValue} />
    </div>
  );
};
