import React from "react";
import styled from "styled-components";
import logo from "../assets/rbg.png";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const StyledFooter = styled.footer`
  width: 100%;
  background-color: var(--primary-color);
  color: var(--fourth-color);
  font-family: "Arial", sans-serif;
  font-size: 16px;
  z-index: 1000;
`;

const FooterTop = styled.div`
  background-color: var(--secondary-color);
  padding: 40px 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.img`
  width: 80px;
  height: auto;
  margin-bottom: 20px;
`;

const FooterHeading = styled.h5`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
  color: var(--fourth-color);
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 12px;
  }

  a {
    text-decoration: none;
    color: var(--fifth-color);
    transition: color 0.3s ease;

    &:hover {
      color: var(--fourth-color);
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  svg {
    margin-right: 10px;
    color: var(--fourth-color);
  }
`;

const FooterBottom = styled.div`
  background-color: var(--third-color);
  padding: 20px;
  text-align: center;
`;

const Copyright = styled.div`
  font-size: 14px;
  margin-bottom: 15px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;

  a {
    color: var(--fifth-color);
    font-size: 24px;
    transition: color 0.3s ease;

    &:hover {
      color: var(--fourth-color);
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterTop>
        <FooterContent>
          <FooterSection>
            <FooterLogo src={logo} alt="Logo" />
            <p>Empower Your Career Journey with an ATS-Optimized Resume.</p>
          </FooterSection>

          <FooterSection>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinks>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/how-it-works">How It Works</a>
              </li>
              <li>
                <a href="/explore-campaigns">Explore </a>
              </li>
              <li>
                <a href="/start-campaign">Create a Resume</a>
              </li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterHeading>Support</FooterHeading>
            <FooterLinks>
              <li>
                <a href="/faq">FAQs</a>
              </li>

              <li>
                <a href="/terms">Terms & Conditions</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterHeading>Contact Us</FooterHeading>
            <ContactItem>
              <FaMapMarkerAlt />
              <span>Mill Road, Keonjhar, India Pin-758002</span>
            </ContactItem>
            <ContactItem>
              <FaPhone />
              <a href="tel:+918282828282">+91 8282828282</a>
            </ContactItem>
          </FooterSection>
        </FooterContent>
      </FooterTop>

      <FooterBottom>
        <Copyright>&copy; 2024 Resumate. All rights reserved.</Copyright>
        <SocialIcons>
          <a href="/fb" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="/twitter" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="/insta" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="/linkedin" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </SocialIcons>
      </FooterBottom>
    </StyledFooter>
  );
};

export default Footer;
