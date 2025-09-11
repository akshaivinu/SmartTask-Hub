import React, { forwardRef, useEffect } from "react";
import gsap from "gsap";

const Button = forwardRef(
  (
    {
      className,
      href,
      onClick,
      children,
      px,
      white,
      type = "button",
      disabled = false,
      variant,
    },
    ref
  ) => {
    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary:
        "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50",
      danger: "bg-red-600 text-white hover:bg-red-700",
      ghost: "bg-transparent text-blue-600 hover:bg-blue-100",
    };

    const classes = `button cursor-pointer relative inline-flex items-center justify-center rounded h-11 transition-colors hover:text-color-1 bg-n-1 hover:bg-n-8 focus:bg-n-8 hover:underline active:bg-n-8 ${
      px || "px-7"
    } ${white ? "text-n-8" : "text-n-1"} ${className || ""} ${
      variantClasses[variant]
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

    const spanClasses = `relative z-10`;


      useEffect(() => {
        const el = ref.current;
        gsap.set(el, {
          scale: 1,
        })
        el.addEventListener('mouseenter', () => {
          gsap.to(el, {
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.inOut',
            overwrite: true
          })
        });
    
        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.inOut',
            overwrite: true
          })
        });
    
        return () => {
          el.removeEventListener('mouseenter', () => {null});
          el.removeEventListener('mouseleave', () => {null});
        }
      },[ref])
    

    const renderButton = () => (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
      >
        <span className={spanClasses}>{children}</span>
      </button>
    );

    const renderLink = () => (
      <a href={href} ref={ref} className={classes} role="button" tabIndex="0">
        <span className={spanClasses}>{children}</span>
      </a>
    );

    return href ? renderLink() : renderButton();
  }
);

export default Button;
