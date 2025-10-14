import React, { useState } from "react";
import './contact_page.css'
import { Link } from "react-router-dom";
import { House, ChevronsRight, Eye, Target } from "lucide-react";

const contact_page = () => {
    const [mapLoaded, setMapLoaded] = useState(false);
    useState(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
    
  return (
    <div className='contact_page'>
        <div className="orange">
            <h2>Contact Us</h2>
            <div className="back_link">
            <Link to="/" className="back-home">
                <House strokeWidth={1} size={20} /> Home
            </Link>
            <ChevronsRight className="back-home" size={20} />
            Contact Us
            </div>
        </div>
        <div >
            <div className='info'>
                <div className='contact_main2'>
                    <div className='details2'>
                        <div className='l_div2'>
                            <input type="text" placeholder='Name' />
                            <input type="email" placeholder='Email' />
                            <input type="tel" placeholder='Phone No.' />
                            <input type="text" placeholder='Subject' />
                            <textarea placeholder='Message'></textarea>

                            <div className='input_R2'>
                                <h2>Where have you heard about us?</h2>
                                <div className="heard_options">
                                    <label>
                                        <input type="radio" name="heardFrom" value="social-media" />
                                        Social Media
                                    </label>

                                    <label>
                                        <input type="radio" name="heardFrom" value="radio" />
                                        Radio
                                    </label>

                                    <label>
                                        <input type="radio" name="heardFrom" value="google" />
                                        Google Search/Engine
                                    </label>

                                    <label>
                                        <input type="radio" name="heardFrom" value="other" />
                                        Other
                                    </label>
                                </div>

                                <button>Send</button>
                            </div>
                        </div>

                        <div className='R_div2'>
                            <h2>David Grossman & Associates</h2>

                            <div className='icons12'>
                                <i className="bi bi-geo-alt-fill"></i>
                                <p>881 OCEAN DRIVE, UNIT 14H, KEY BISCAYNE, FLORIDA 33149</p>
                            </div>

                            <div className='icons12'>
                                <i className="bi bi-telephone-fill"></i>
                                <p>(631) 815-2575</p>
                            </div>

                            <div className='icons12'>
                                <i className="bi bi-printer-fill"></i>
                                <p>Fax: 516.686.6771</p>
                            </div>

                            <div className="map_container" style={{ position: "relative", width: "100%", height: "300px" }}>
                                {!mapLoaded && (
                                    <div
                                    className="map_loader"
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        textAlign: "center",
                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                        padding: "15px 25px",
                                        borderRadius: "8px",
                                        fontWeight: "bold",
                                        zIndex: 1,
                                    }}
                                    >
                                    <div className="spinner" style={{ marginBottom: "8px" }}>
                                        <div
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            border: "4px solid #ccc",
                                            borderTop: "4px solid #333",
                                            borderRadius: "50%",
                                            animation: "spin 1s linear infinite",
                                            margin: "0 auto",
                                        }}
                                        ></div>
                                    </div>
                                    Loading map...
                                    </div>
                                )}

                                <iframe
                                    title="David Grossman & Associates Location"
                                    src="https://www.google.com/maps?q=881+OCEAN+DRIVE,+UNIT+14H,+KEY+BISCAYNE,+FLORIDA+33149&output=embed"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0, borderRadius: "5px" }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    onLoad={() => setMapLoaded(true)} 
                                ></iframe>
                                </div>
                            </div>


                    </div>
                </div>
            </div>
            <div className='creds'>

            </div>

        </div>
    </div>
  )
}

export default contact_page