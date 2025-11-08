import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { Loader2 } from "lucide-react";
import "./claim_form.css";

const ClaimForm = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [contactRelation, setContactRelation] = useState("");
  const [claimantDOB, setClaimantDOB] = useState("");
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      document.title = "Contact Us – David Grossman & Associates";
  
      return () => {
        document.title = "David Grossman & Associates";
      };
    }, []);
  
  // Contact form data for mirroring
  const [contactData, setContactData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: ""
  });

  // Phone number formatting function
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return !match[2]
        ? match[1]
        : `${match[1]}-${match[2]}${match[3] ? `-${match[3]}` : ""}`;
    }
    return value;
  };

  // Calculate if claimant is a minor
  const isMinor = () => {
    if (!claimantDOB) return "";
    const today = new Date();
    const birthDate = new Date(claimantDOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age < 18 ? "Yes" : "No";
  };

  // Handle contact data change
  const handleContactChange = (field, value) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // EmailJS automatically extracts all form fields with their 'name' attributes
    // All fields are properly named and formatted for email delivery:
    // - Contact Information (Contact_First_Name, Contact_Last_Name, etc.)
    // - Claimant Information (Claimant_First_Name, Claimant_Last_Name, etc.)
    // - Gaming data (Gaming_Platforms[], Games_Played[], etc.)
    // - Medical information (Injuries[], Life_Effects[], Medical_Treatments[])
    // - Auto-computed field: Claimant_a_minor (calculated from date of birth)
    
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_USER_ID
      )
      .then(
        () => {
          alert("Form submitted successfully!");
          form.current.reset();
          setContactData({
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
            email: ""
          });
          setClaimantDOB("");
          setContactRelation("");
          setDisclaimerAccepted(false);
          setIsSending(false);
        },
        (error) => {
          console.error(error);
          alert("Failed to submit form. Please try again.");
          setIsSending(false);
        }
      );
  };

  return (
    <div className="claim-form-page">
      <h2>Video Game Claim Questionnaire</h2>
      
      <div className="intro-text">
        <p>
          Video game addiction (VGA), also known as gaming disorder or internet gaming disorder, 
          is generally defined as a behavioural addiction involving problematic, compulsive use of video 
          games that results in significant impairment to an individual's ability to function in various life 
          domains over a prolonged period of time. This and associated concepts have been the subject 
          of considerable research, debate, and discussion among experts in several disciplines and has 
          generated controversy within the medical, scientific, and gaming communities. Such disorders 
          can be diagnosed when an individual engages in gaming activities at the cost of fulfilling daily 
          responsibilities or pursuing other interests without regard for the negative consequences. As 
          defined by the ICD-11, the main criterion for this disorder is a lack of self control over gaming.
        </p>
      </div>

      <form ref={form} onSubmit={handleSubmit}>
        <h3>Contact Information</h3>
        <label>
          <span>Contact's relation to claimant *</span>
          <select
            name="Contact_relation" 
            required
            value={contactRelation}
            onChange={(e) => setContactRelation(e.target.value)}
          >
            <option value="">Select Relation</option>
            <option value="myself">Myself</option>
            <option value="parent">Parent</option>
            <option value="legal guardian">Legal Guardian</option>
            <option value="relative">Relative</option>
            <option value="friend">Friend</option>
            <option value="healthcare worker">Healthcare Worker</option>
          </select>
        </label>

        <div
          className={`contact-fields ${contactRelation === "myself" ? "slide-up" : ""}`}
        >
          <div className="name-row">
            <label>
              <span>First Name *</span>
              <input
                name="Contact_First_Name"
                value={contactData.firstName}
                onChange={(e) => handleContactChange('firstName', e.target.value)}
                required
              />
            </label>
            <label>
              <span>Middle Name</span>
              <input
                name="Contact_Middle_Name"
                value={contactData.middleName}
                onChange={(e) => handleContactChange('middleName', e.target.value)}
              />
            </label>
            <label>
              <span>Last Name *</span>
              <input
                name="Contact_Last_Name"
                value={contactData.lastName}
                onChange={(e) => handleContactChange('lastName', e.target.value)}
                required
              />
            </label>
            <label>
              <span>Suffix</span>
              <input
                name="Contact_Suffix"
                value={contactData.suffix}
                onChange={(e) => handleContactChange('suffix', e.target.value)}
              />
            </label>
          </div>

          <label>
            <span>Street Address *</span>
            <input
              name="Contact_Street_Address"
              value={contactData.street}
              onChange={(e) => handleContactChange('street', e.target.value)}
              required
            />
          </label>

          <div className="address-row">
            <label>
              <span>City *</span>
              <input
                name="Contact_City"
                value={contactData.city}
                onChange={(e) => handleContactChange('city', e.target.value)}
                required
              />
            </label>
            <label>
              <span>State *</span>
              <input
                name="Contact_State"
                value={contactData.state}
                onChange={(e) => handleContactChange('state', e.target.value)}
                required
              />
            </label>
            <label>
              <span>Zip Code *</span>
              <input
                name="Contact_Zip"
                value={contactData.zip}
                onChange={(e) => handleContactChange('zip', e.target.value)}
                required
              />
            </label>
          </div>

          <div className="contact-row">
            <label>
              <span>Phone Number *</span>
              <input
                name="Contact_Phone"
                type="tel"
                value={contactData.phone}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  handleContactChange('phone', formatted);
                }}
                maxLength="12"
                required
              />
            </label>

            <label>
              <span>Email *</span>
              <input
                name="Contact_Email"
                type="email"
                value={contactData.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                required
              />
            </label>
          </div>
        </div>

        <h3>Claimant Information</h3>
        
        <div className="name-row">
          <label>
            <span>First Name *</span>
            <input 
              name="Claimant_First_Name" 
              value={contactRelation === "myself" ? contactData.firstName : undefined}
              required 
            />
          </label>
          <label>
            <span>Middle Name</span>
            <input 
              name="Claimant_Middle_Name"
              value={contactRelation === "myself" ? contactData.middleName : undefined}
            />
          </label>
          <label>
            <span>Last Name *</span>
            <input 
              name="Claimant_Last_Name"
              value={contactRelation === "myself" ? contactData.lastName : undefined}
              required 
            />
          </label>
          <label>
            <span>Suffix</span>
            <input 
              name="Claimant_Suffix"
              value={contactRelation === "myself" ? contactData.suffix : undefined}
            />
          </label>
        </div>

        <label>
          <span>Street Address *</span>
          <input 
            name="Claimant_Street_Address"
            value={contactRelation === "myself" ? contactData.street : undefined}
            required 
          />
        </label>

        <div className="address-row">
          <label>
            <span>City *</span>
            <input 
              name="Claimant_City"
              value={contactRelation === "myself" ? contactData.city : undefined}
              required 
            />
          </label>
          <label>
            <span>State *</span>
            <input 
              name="Claimant_State"
              value={contactRelation === "myself" ? contactData.state : undefined}
              required 
            />
          </label>
          <label>
            <span>Zip Code *</span>
            <input 
              name="Claimant_Zip"
              value={contactRelation === "myself" ? contactData.zip : undefined}
              required 
            />
          </label>
        </div>

        <div className="contact-row">
          <label>
            <span>Phone Number *</span>
            <input 
              name="Claimant_Phone" 
              type="tel"
              value={contactRelation === "myself" ? contactData.phone : undefined}
              onChange={(e) => {
                if (contactRelation !== "myself") {
                  e.target.value = formatPhoneNumber(e.target.value);
                }
              }}
              maxLength="12"
              required
            />
          </label>

          <label>
            <span>Email *</span>
            <input 
              name="Claimant_Email" 
              type="email"
              value={contactRelation === "myself" ? contactData.email : undefined}
              required 
            />
          </label>
        </div>

        <div className="dob-gender-row">
          <label>
            <span>Date of Birth *</span>
            <input 
              name="Claimant_DOB" 
              type="date"
              value={claimantDOB}
              onChange={(e) => setClaimantDOB(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Gender *</span>
            <select name="Claimant_Gender" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="undisclosed">Undisclosed</option>
            </select>
          </label>
        </div>

        {/* Hidden field for auto-computed minor status */}
        <input type="hidden" name="Claimant_a_minor" value={isMinor()} />

        <h3>Claim Details</h3>
        
        <label>
          <span>Date of Death (if applicable)</span>
          <input
            name="Claimant_Date_of_Death"
            type="date"
          />
        </label>

        <label>
          <span>Are you working with another law firm?</span>
          <select name="Not_working_with_another_law_firm">
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          <span>Legal authorization to pursue claim</span>
          <textarea
            name="Legal_authorization"
            rows="4"
          />
        </label>

        <h3>Gaming Information</h3>

        <label>
          <span>Estimate the date that you first started playing video games</span>
          <input
            name="Start_Play_Date"
            type="date"
          />
        </label>

        <label>
          <span>How many hours a day do you play video games? *</span>
          <select name="Hours_Per_Day" required>
            <option value="">Select</option>
            <option value="Less than one hour">Less than one hour</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="3 hours">3 hours</option>
            <option value="4 hours">4 hours</option>
            <option value="5 hours">5 hours</option>
            <option value="6 hours">6 hours</option>
            <option value="7 hours">7 hours</option>
            <option value="8 or more hours">8 or more hours</option>
          </select>
        </label>

        <fieldset>
          <legend>Select all of the gaming platforms that have been used</legend>
          <div className="checkbox-grid">
            {[
              "PlayStation Console",
              "XBOX Console",
              "Nintendo Switch",
              "Gaming Computer or Laptop",
              "Steam Deck",
              "Apple phone",
              "Android Phone",
              "Oculus VR",
              "Meta Quest",
              "Other Gaming Device",
            ].map((platform) => (
              <label key={platform} className="checkbox-item">
                <input type="checkbox" name="Gaming_Platforms[]" value={platform} />
                <span>{platform}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Select all video games that have been played</legend>
          <div className="checkbox-grid">
            {[
              "Apex Legends",
              "Call of Duty",
              "Counter-Strike",
              "Fortnite",
              "GTA 5",
              "League of Legends",
              "Minecraft",
              "Overwatch",
              "Rainbow Six: Siege",
              "Roblox",
              "Rocket League",
              "Teamfight Tactics",
              "Valorant",
              "World of Warcraft",
              "Other Game",
            ].map((game) => (
              <label key={game} className="checkbox-item">
                <input type="checkbox" name="Games_Played[]" value={game} />
                <span>{game}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <h3>Injuries and Medical Information</h3>

        <fieldset>
          <legend>Have you had any of the following injuries or diagnoses due to video games?</legend>
          <div className="checkbox-grid">
            {[
              "Video Game Addiction",
              "Opposition defiant disorder (ODD)",
              "Suicide attempt",
              "Depression",
              "ADHD",
              "Gamers rage",
              "Gamers thumb",
              "Seizures",
              "Computer vision syndrome",
              "Carpal tunnel syndrome",
              "Orthopedic Injury",
              "Other injury",
              "No injury",
            ].map((injury) => (
              <label key={injury} className="checkbox-item">
                <input type="checkbox" name="Injuries[]" value={injury} />
                <span>{injury}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Have video games affected your life in any of the following ways?</legend>
          <div className="checkbox-grid">
            {[
              "Drop in grades",
              "Dropout of school",
              "Hiding Game Playing Time",
              "Inability to stop playing games",
              "Poor Hygiene",
              "Individual Education Plan (IEP)",
              "Social isolation",
              "Stealing money for games",
              "Unable to work due to gaming",
              "Withdrawal symptoms",
              "Other affect",
            ].map((effect) => (
              <label key={effect} className="checkbox-item">
                <input type="checkbox" name="Life_Effects[]" value={effect} />
                <span>{effect}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Have you received any of the following medical treatments due to playing video games?</legend>
          <div className="checkbox-grid">
            {[
              "Counseling",
              "Doctor visits",
              "Hospitalized",
              "In person gaming addiction program",
              "Online gaming addiction program",
              "Therapy",
              "Other treatment",
              "No treatment",
            ].map((treatment) => (
              <label key={treatment} className="checkbox-item">
                <input type="checkbox" name="Medical_Treatments[]" value={treatment} />
                <span>{treatment}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="disclaimer-section">
          <label className="disclaimer-label">
            <input 
              type="checkbox" 
              required
              checked={disclaimerAccepted}
              onChange={(e) => setDisclaimerAccepted(e.target.checked)}
            />
            <span>
              To enroll in this important case to recover damages for violating our trust and to make gaming 
              safer enroll below by completing the section at the end. This will include you or your child in 
              this important case. Please share anything else you want us to know about your case. By 
              providing your phone number you consent to receiving calls and text messages from us and/or 
              our representatives. *
            </span>
          </label>
        </div>

        <button type="submit" disabled={isSending || !disclaimerAccepted}>
          {isSending ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Sending...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default ClaimForm;
