import React, { useEffect } from 'react';
import './attorneys.css';
import { Link } from "react-router-dom";
import { House, ChevronsRight } from "lucide-react";
import David from '../assets/dg_profile.webp';
import Bartlett from '../assets/bartlett.webp'
import FirmLogo from '../assets/firm-logo.webp'

const Attorneys = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    document.title = "Attorneys – David Grossman & Associates";

    return () => {
      document.title = "David Grossman & Associates";
    };
  }, []);

  return (
    <div >
      <div className="orange">
        <h2>Attorneys</h2>
        <div className="back_link">
          <Link to="/" className="back-home">
            <House strokeWidth={1} size={20} /> Home
          </Link>
          <ChevronsRight className="back-home" size={20} />
          Attorneys
          
        </div>
      </div>

      <div className='main_didiv'>
        <div className='about_pp'>
          <div className='details_profile'>
            <strong>David Grossman, Esq.</strong>
            <p>
              <strong>Mr. Grossman</strong> has been an attorney for three decades and is a successful businessperson 
              and advocate for all sorts of victims. Much of his career focused on risk mitigation and 
              compliance. His firm, which was established in New York nearly 30 years ago, originally 
              specialized in victims’ rights, advocating for individuals neglected in institutions.
              <br />
              <br />
              About a decade ago, they expanded into mass torts and formed partnerships with some of the 
              largest firms in the nation and advocates for victims of corporate greed who caused all sorts 
              of harms to the environment, unions, and more.
            </p> 
          </div>

          <div className='profile_details'>
            <img src={David} alt="David Grossman" />
            <strong>Partner</strong>
          </div>
        </div>
        <div className='about_pp'>
          <div className='profile_details'>
            <img src={Bartlett} alt="David Grossman" />
            <strong>Of Counsel</strong>
          </div>
          <div className='details_profile2'>
            <strong>Attorney Kenneth G. Bartlett</strong>
            <h5>Principal & Founder of Bartlett Law Offices, P.C.</h5>
            <p>
              <strong>Kenneth G. Bartlett’s</strong> legal career began in 1981 after graduating from Quinnipiac Law School. 
              He subsequently clerked for a year at the Connecticut Supreme Court. In 1987, he became the 
              principal of Bartlett Law Offices, P.C.
              <br />
              <br />
              His practice is grounded in a deep scientific literacy that dates back to his time as a National 
              Science Foundation research fellow at the University of New Hampshire, where he conducted trace 
              metal analysis at the Jackson Estuarine Laboratory (Tier 1) under Professor Henri E. Gaudette. 
              Mr. Bartlett combined this hands-on research experience with a B.A. in Hydrogeology to become a 
              thought leader in the field, eventually serving as co-editor of both the Toxic Substances Journal 
              and the textbook The Law of Toxics and Toxic Substances.
              <br />
              <br />
              Attorney Bartlett is a dual-boarded attorney by the National Board of Trial Advocacy (NBTA), 
              certified in both Civil Trial Law and Civil Practice Advocacy. He has tried over 100 jury cases 
              to verdict as lead counsel. Additionally, since 2002, he has served as senior legal trial counsel 
              to the New York law firm Finkelstein & Partners, LLP.
            </p> 
          </div>
        </div>

        <div className="partnerCard">
          <div className="partnerCard__logoPane">
            <img
              className="partnerCard__logo"
              src={FirmLogo}
              alt="Bartlett Law Offices, PC"
            />
          </div>

          <div className="partnerCard__content">
            <div className="partnerCard__text">
              <h3 className="partnerCard__title">Bartlett Law Offices, PC</h3>

              <p className="partnerCard__line">P.O. Box 4017</p>
              <p className="partnerCard__line">Madison, CT 06443</p>

              <div className="partnerCard__phones">
                <p className="partnerCard__line">
                  <span className="partnerCard__label">Office:</span> (203) 421-4400
                </p>
                <p className="partnerCard__line">
                  <span className="partnerCard__label">Cell:</span> (203) 503-1420
                </p>
              </div>
            </div>

            {/* External website -> use <a>, not <button> */}
            <a
              className="partnerCard__cta"
              href="https://www.bartlettlawpc.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.bartlettlawpc.com
              <span className="partnerCard__ctaIcon" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Attorneys;
