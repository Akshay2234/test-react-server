import React, { useState } from "react";
import "../assets/css/App.css";
import "../assets/css/bootstrap.min.css";
import icon from "../assets/24/prehomeLogo.png";
import JoinWaitlistModal from "./JoinWaitlistModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [showModal, setShowModal] = useState(false); // waitlist modal

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <header className="header-1">
        <div className="container container-lg">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-1 col-sm-3 col-md-3 col-6 pr-lg-5">
              <div className="logo">
                <a href="home.html">
                  <img src={icon} alt="AiQsoftTech" />
                </a>
              </div>
            </div>

            <div className="col-lg-11 text-end p-lg-0 d-none d-lg-flex justify-content-between align-items-center">
              <div className="menu-wrap">
                <div className="main-menu">
                  <ul>
                    <li><a href="howitworks.html">How it works</a></li>
                    <li><a href="success.html">Success Stories</a></li>
                    <li className="mobile-dropdown dropdown">
                      <a href="javascript:void(0);" className="dropdown-toggle">Resources</a>
                      <ul className="dropdown-menu">
                        <li><a href="https://www.prehome.in/howitworks">Blogs</a></li>
                        <li><a href="contactus.html">FAQs</a></li>
                        <li><a href="calculators.html">Calculators</a></li>
                      </ul>
                    </li>
                    <li className="mobile-dropdown dropdown">
                      <a href="javascript:void(0);" className="dropdown-toggle">Company</a>
                      <ul className="dropdown-menu">
                        <li><a href="ourstory.html">Our Story</a></li>
                        <li><a href="contactus.html">Contact Us</a></li>
                        <li><a href="termsandconditions.html">Terms & Conditions</a></li>
                        <li><a href="privacypolicy.html">Privacy Policy</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="header-right-element">
                <button
                  className="theme-btn-navbar btn-radius animated"
                  onClick={toggleModal}
                >
                  Join our waitlist
                </button>
              </div>
            </div>

            {/* Mobile View */}
            <div className="d-block d-lg-none col-sm-1 col-md-8 col-6">
              <div className="mobile-nav-wrap">
                <div id="hamburger" onClick={() => setIsOpen(true)}>
                  <i className="fal fa-bars"></i>
                </div>
                {isOpen && (
                  <div className="mobile-nav">
                    <button
                      type="button"
                      className="close-nav"
                      onClick={() => setIsOpen(false)}
                    >
                      <i className="fal fa-times-circle"></i>
                    </button>

                    <nav className="sidebar-nav">
                      <ul className="metismenu" id="mobile-menu">
                        <li><a href="howitworks.html">How it works</a></li>
                        <li><a href="success.html">Success Stories</a></li>
                        <li className="dropdown">
                          <a href="javascript:void(0);" className="dropdown-toggle">Resources</a>
                          <ul className="dropdown-menu">
                            <li><a href="blogs.html">Blogs</a></li>
                            <li><a href="contactus.html">FAQs</a></li>
                            <li><a href="calculators.html">Calculators</a></li>
                          </ul>
                        </li>
                        <li className="dropdown">
                          <a href="#" className="dropdown-toggle">Company</a>
                          <ul className="dropdown-menu">
                            <li><a href="ourstory.html">Our Story</a></li>
                            <li><a href="contactus.html">Contact Us</a></li>
                            <li><a href="termsandconditions.html">Terms & Conditions</a></li>
                            <li><a href="privacypolicy.html">Privacy Policy</a></li>
                          </ul>
                        </li>
                        <li>
                          <button
                            className="theme-btn-navbar btn-radius mt-3"
                            onClick={() => {
                              toggleModal();
                              setIsOpen(false); // also close the mobile menu
                            }}
                          >
                            Join our waitlist
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Modal */}
      <JoinWaitlistModal isOpen={showModal} onClose={toggleModal} />
    </>
  );
};

export default Header;
