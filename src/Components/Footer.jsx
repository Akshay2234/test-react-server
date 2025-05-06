import React from "react";
import "./Footer.css"; // Assuming the styles below are placed in Footer.css

const Footer = () => {
  return (
    <footer className="footer-1 footer-wrap mt-5">
      <div
        className="footer-widgets-wrapper text-white bg-cover"
        style={{ backgroundImage: "url('assets/img/footer-widgets-bg.png')" }}
      >
        <div className="container container-lg">
          <div className="row">
            <div className="col-sm-12 col-md-4 col-xl-4">
              <div className="about-quantech pe-md-5 pe-xl-0 aos-item" data-aos="fade-right">
                <a href="home.html">
                  <img src="src\assets\img\logo-footer.svg" alt="Prehome" />
                </a>
                <p className="pt-md-4 pt-sm-4 mt-4 pb-md-3 pb-sm-1 f-24">
                  <b>Redefining Home ownership</b>
                </p>
              </div>
            </div>

            <div className="col-sm-12 col-md-5 col-xl-4">
              <div className="row aos-item" data-aos="fade-down">
                <div className="col-sm-4 col-xl-6 pt-md-4 pt-sm-0">
                  <div className="single-footer-wid ps-xl-5">
                    <ul>
                      <li><a href="home.html">Home</a></li>
                      <li><a href="about.html">Our Story</a></li>
                      <li><a href="blogs.html">Blogs</a></li>
                      <li><a href="contactus.html">Contact us</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-12 col-md-8 col-xl-6 pt-md-4 pt-sm-0">
                  <div className="single-footer-wid ps-xl-2">
                    <ul>
                      <li><a href="termsandconditions.html">Terms and Conditions</a></li>
                      <li><a href="privacypolicy.html">Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-3 col-xl-4">
              <div className="single-footer-wid site-info-widget ps-xl-5 aos-item" data-aos="fade-left">
                <div className="wid-title">
                  <h3>Contact Us</h3>
                </div>
                <div className="get-in-touch">
                  <div className="single-contact-info">
                    <div className="contact-info">
                      <h5>Email</h5>
                      <p><u>contact@prehome.in</u></p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-info">
                      <h5>Phone</h5>
                      <p><u>+91 88006 58299</u></p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-info">
                      <h5>Office</h5>
                      <p>BC-1A, DDA Flats, Munirka, New Delhi-110067</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container container-lg align-items-center">
          <div className="bottom-content-wrapper">
            <div className="row">
              <div className="col-md-12 col-12 text-center">
                <div className="copy-rights aos-item" data-aos="flip-down">
                  <p>Prehome 2024 all copyrights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

