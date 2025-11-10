import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./file_claim_page.css";
import { House, ChevronsRight, Loader2 } from "lucide-react";
import GameBoi from "../assets/gameboi.webp";

const FileClaimPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "File Claim – David Grossman & Associates";
    return () => {
      document.title = "David Grossman & Associates";
    };
  }, []);

  return (
    
    <div className="file-claim-container">
        <div className="orange">
            <h2>File a Claim</h2>
            <div className="back_link">
            <Link to="/" className="back-home">
                <House strokeWidth={1} size={20} /> Home
            </Link>
            <ChevronsRight className="back-home" size={20} />
            File a Claim
            </div>
        </div>
        

      {/* File Claim Section */}
      <div className="R_div3">
        <div className="direction-box">
          <h3 className="direction-title">File a Claim</h3>
          <p className="direction-text">
            Click the button below to file your claim for <strong>Video Game Addiction</strong>.
          </p>
          <div className="direction-image">
            <img src={GameBoi} alt="File a Claim Illustration" />
          </div>
          <Link to="/claim-form" className="claim-btn">
            Proceed to Claim Form
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FileClaimPage;
