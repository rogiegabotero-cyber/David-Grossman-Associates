import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { Loader2 } from "lucide-react";
import "./claim_form.css";

const ClaimForm = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

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
      <form ref={form} onSubmit={handleSubmit}>
        <h3>Claimant Information</h3>
        <input name="Claimant_First_Name" placeholder="First Name" required />
        <input name="Claimant_Last_Name" placeholder="Last Name" required />
        <input name="Claimant_Middle_Name" placeholder="Middle Name" />
        <input name="Claimant_Suffix" placeholder="Suffix" />
        <input name="Claimant_Street_Address" placeholder="Street Address" />
        <input name="Claimant_City" placeholder="City" />
        <input name="Claimant_State" placeholder="State" />
        <input name="Claimant_Zip" placeholder="Zip" />
        <input name="Claimant_Phone" placeholder="Phone" />
        <input name="Claimant_Email" placeholder="Email" type="email" />
        <input name="Claimant_DOB" placeholder="Date of Birth" type="date" />

        {/* Gender Dropdown */}
        <label>
            <p>Gender:</p>
          
          <select name="Claimant_Gender" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="undisclosed">Undisclosed</option>
          </select>
        </label>

        <h3>Contact Information</h3>
        <label>
            <p>Contact's relation to claimant:</p>
          
          <select name="Contact_relation" required>
            <option value="">Select Relation</option>
            <option value="myself">Myself</option>
            <option value="parent">Parent</option>
            <option value="legal guardian">Legal Guardian</option>
            <option value="relative">Relative</option>
            <option value="friend">Friend</option>
            <option value="healthcare worker">Healthcare Worker</option>
          </select>
        </label>

        <input name="Contact_First_Name" placeholder="First Name" />
        <input name="Contact_Middle_Name" placeholder="Middle Name" />
        <input name="Contact_Last_Name" placeholder="Last Name" />
        <input name="Contact_Suffix" placeholder="Suffix" />
        <input name="Contact_Street_Address" placeholder="Street Address" />
        <input name="Contact_City" placeholder="City" />
        <input name="Contact_State" placeholder="State" />
        <input name="Contact_Zip" placeholder="Zip" />
        <input name="Contact_Phone" placeholder="Phone" />
        <input name="Contact_Email" placeholder="Email" type="email" />

        <h3>Claim Details</h3>
        <input
          name="Claimant_Date_of_Death"
          type="date"
          placeholder="Date of Death (if applicable)"
        />

        <label>
            <p>Is the claimant a minor?</p>
          
          <select name="Claimant_a_minor">
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
            <p>Are you working with another law firm?</p>
          
          <select name="Not_working_with_another_law_firm">
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <textarea
          name="Legal_authorization"
          placeholder="Legal authorization to pursue claim"
        />

        <h3>Gaming Information</h3>

        <label >
            <p>Estimate the date that you first started playing video games.</p>
            <input
                name="Start_Play_Date"
                placeholder="Estimate the date that you first started playing video games."
                type="date"
            />
        </label>
        

        {/* Hours per day dropdown */}
        <label>
            <p>How many hours a day do you play video games?</p>
          
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

        {/* ✅ Gaming Platforms Checklist */}
        <fieldset>
          <legend>Select all of the gaming platforms that have been used:</legend>
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
            <label key={platform}>
              <input type="checkbox" name="Gaming_Platforms[]" value={platform} />{" "}
              {platform}
            </label>
          ))}
        </fieldset>

        {/* ✅ Games Played Checklist */}
        <fieldset>
          <legend>Select all video games that have been played:</legend>
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
            <label key={game}>
              <input type="checkbox" name="Games_Played[]" value={game} /> {game}
            </label>
          ))}
        </fieldset>

        <h3>Injuries and Medical Information</h3>

        {/* ✅ Injuries Checklist */}
        <fieldset>
          <legend>Have you had any of the following injuries or diagnoses due to video games?</legend>
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
            <label key={injury}>
              <input type="checkbox" name="Injuries[]" value={injury} /> {injury}
            </label>
          ))}
        </fieldset>

        {/* ✅ Life Effects Checklist */}
        <fieldset>
          <legend>Have video games affected your life in any of the following ways?</legend>
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
            <label key={effect}>
              <input type="checkbox" name="Life_Effects[]" value={effect} /> {effect}
            </label>
          ))}
        </fieldset>

        {/* ✅ Medical Treatments Checklist */}
        <fieldset>
          <legend>Have you received any of the following medical treatments due to playing video games?</legend>
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
            <label key={treatment}>
              <input type="checkbox" name="Medical_Treatments[]" value={treatment} />{" "}
              {treatment}
            </label>
          ))}
        </fieldset>

        <button type="submit" disabled={isSending}>
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
