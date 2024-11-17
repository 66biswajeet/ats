// Navbar.jsx
import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from "../assets/logo3.png";
import { HiMenuAlt1 } from "react-icons/hi";

import { auth, provider } from "../../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { UserButton, useUser } from "@clerk/clerk-react";

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 25px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 98%;
  position: fixed;
  top: 0;
  z-index: 1000;

  @media (max-width: 1200px) {
    justify-content: space-between;
    width: 98%;
    padding: 0 25px 0 0;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const Logo = styled.img`
  height: 50px;
`;

const MenuItems = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  transition: all ease-in-out;

  @media (max-width: 1200px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: -33px;
    right: 0;
    background-color: rgb(0 0 0 / 90%);
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    align-items: center;
    width: 100%;
    height: 100vh;
    justify-content: center;
  }
`;

const MenuItem = styled(motion.a)`
  text-decoration: none;
  color: ${({ active }) => (active ? "var(--primary-color)" : "black")};
  margin-left: 2rem;
  font-weight: bold;
  position: relative;
  transition: all 1s;

  &::after {
    content: "";

    height: 4px;
    background: linear-gradient(
      to right,
      var(--primary-color) 0%,
      var(--primary-color) 20%,
      var(--third-color) 40%,
      var(--third-color) 60%,
      var(--fifth-color) 80%,
      var(--fifth-color) 100%
    );
    position: absolute;
    display: block;
    width: ${({ active }) => (active ? "100%" : "0%")};

    border-radius: 2px;
    transition: all 0.5s;
  }
  &:hover::after {
    width: 100%;
    display: block;
  }

  @media (max-width: 1200px) {
    margin: 1rem 0;
    color: ${({ active }) => (active ? "var(--primary-color)" : "white")};
  }
`;

const MenuBtn = styled.div`
  display: flex;
  column-gap: 10px;
  margin: 0 0 0 100px;
  @media (max-width: 1200px) {
    flex-direction: column;
    row-gap: 10px;
    margin: 0;
    width: 100%;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 1200px) {
    display: block;
  }
`;

const Button = styled.button`
  background-color: ${({ active }) =>
    active ? "var(--secondary-color)" : "var(--primary-color)"};
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  transition: all 0.3s;
  &:hover {
    background-color: var(--secondary-color);
  }
  @media (max-width: 1200px) {
    margin: 0 1rem;
    width: 100%;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const location = useLocation();
  const isActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some((path) => location.pathname.startsWith(path));
    }
    return location.pathname === paths;
  };

  const loginClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      // setValue(data.user.email);
      console.log(data);
      // history("/home");
      alert("WELCOME TO THE DISNEY+ WORLD ");
      // localStorage.setItem("email", data.user.email);
    });
  };

  const { isLoaded, isSignedIn } = useUser();

  return (
    // <Nav>
    //   <LogoDiv>
    //     <Logo src={LogoImage} alt="ResumePro Logo" />
    //   </LogoDiv>
    //   <HamburgerButton onClick={toggleMenu}>
    //     <HiMenuAlt1
    //       style={{ color: "var(--primary-color)", fontSize: "50px" }}
    //     />
    //   </HamburgerButton>
    //   <AnimatePresence>
    //     <MenuItems
    //       isOpen={isMenuOpen}
    //       onClick={closeMenu}
    //       initial={{ y: "-100%" }}
    //       animate={{ y: "0%" }}
    //       exit={{ y: "-100%" }}
    //       transition={{ duration: 0.5 }}
    //     >
    //       <MenuItem as={Link} to="/" active={isActive("/")}>
    //         Home
    //       </MenuItem>
    //       <MenuItem
    //         as={Link}
    //         to="/resume-build"
    //         active={isActive("/resume-build")}
    //       >
    //         Resume Build
    //       </MenuItem>
    //       <MenuItem
    //         as={Link}
    //         to="/ats/resume"
    //         active={isActive(["/ats/resume", "/ats/score"])}
    //       >
    //         ATS Score
    //       </MenuItem>
    //       <MenuItem
    //         as={Link}
    //         to="/resume-parser"
    //         active={isActive("/resume-parser")}
    //       >
    //         Resume Parser
    //       </MenuItem>

    //       <MenuBtn>
    //         <Button href="#">Sign in</Button>
    //         <Button>Log IN</Button>
    //       </MenuBtn>
    //     </MenuItems>
    //   </AnimatePresence>
    // </Nav>

    <Nav id="no-print">
      <LogoDiv>
        <Logo src={LogoImage} alt="ResumePro Logo" />
      </LogoDiv>
      <MenuItems>
        <MenuItem as={Link} to="/" active={isActive("/")} isOpen={isMenuOpen}>
          Home
        </MenuItem>
        <MenuItem as={Link} to="/new_resume" active={isActive("/new_resume")}>
          Resume Build
        </MenuItem>
        <MenuItem
          as={Link}
          to="/ats/resume"
          active={isActive(["/ats/resume", "/ats/score"])}
        >
          ATS Score
        </MenuItem>
        {/* <MenuItem
          as={Link}
          to="/resume-parser"
          active={isActive("/resume-parser")}
        >
          Resume Parser
        </MenuItem> */}

        <MenuBtn>
          {!isSignedIn ? (
            <>
              <Link to={"/auth/signup"}>
                <Button
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </Button>
              </Link>
              <Link to={"/auth/login"}>
                <Button
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Log IN
                </Button>
              </Link>
            </>
          ) : (
            <UserButton />
          )}
        </MenuBtn>
      </MenuItems>
      <HamburgerButton onClick={toggleMenu}>
        <HiMenuAlt1
          style={{ color: "var(--primary-color)", fontSize: "50px" }}
        />
      </HamburgerButton>
      <AnimatePresence>
        {isMenuOpen && (
          <MenuItems
            isOpen={isMenuOpen}
            onClick={closeMenu}
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.25 }}
          >
            <MenuItem as={Link} to="/" active={isActive("/")}>
              Home
            </MenuItem>
            <MenuItem
              as={Link}
              to="/new_resume"
              active={isActive("/new_resume")}
            >
              Resume Build
            </MenuItem>
            <MenuItem
              as={Link}
              to="/ats/resume"
              active={isActive(["/ats/resume", "/ats/score"])}
            >
              ATS Score
            </MenuItem>
            {/* <MenuItem
              as={Link}
              to="/resume-parser"
              active={isActive("/resume-parser")}
            >
              Resume Parser
            </MenuItem> */}

            {/* <MenuBtn>
              <Button onClick={loginClick}>Log IN</Button>
            </MenuBtn> */}

            <MenuBtn>
              {!isSignedIn ? (
                <>
                  <Link to={"/auth/signup"}>
                    <Button
                      as={motion.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to={"/auth/login"}>
                    <Button
                      as={motion.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Log IN
                    </Button>
                  </Link>
                </>
              ) : (
                <UserButton />
              )}
            </MenuBtn>
          </MenuItems>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;
