import React, { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { Loader2 } from "lucide-react";
import "./social_media_claim_form.css";

const PLATFORM_OPTIONS = ["Instagram", "Facebook", "TikTok", "Snapchat", "YouTube"];
const DAILY_USAGE_OPTIONS = ["<1 hr", "1-3 hrs", "3-5 hrs", "5+ hrs"];
const CONDITION_OPTIONS = [
  "Depression",
  "Anxiety",
  "Eating disorder (anorexia, bulimia)",
  "Self-harm behavior",
  "Suicide attempt",
  "Suicidal ideation",
];
const BEFORE_OPTIONS = ["No issues", "Mild", "Significant"];
const AFTER_OPTIONS = ["Worse", "Same"];

const initialData = {
  contactEmail: "",
  contactPhone: "",
  signedDate: "",
  clientEntityName: "",
  authorizedRepresentativeNameTitle: "",
  authorizedRepresentativeBy: "",
  coCounsel: "",
  counselAddress: "",
  counselCityStateZip: "",

  fullName: "",
  dateOfBirth: "",
  currentAge: "",
  stateOfResidence: "",
  parentGuardian: "",

  platformsUsed: [],
  ageWhenUseStarted: "",
  averageDailyUsage: "",
  usageIncreasedOverTime: "",
  unableToStop: "",

  diagnosedConditions: [],
  therapy: "",
  psychiatrist: "",
  medicationsPrescribed: "",
  hospitalization: "",

  mentalHealthBeforeSocialMedia: "",
  mentalHealthAfterHeavyUse: "",
  symptomsBegin: "",

  dropInGrades: "",
  socialWithdrawal: "",
  sleepDisruption: "",
  eatingBehaviorChanges: "",

  medicalRecords: "",
  schoolRecords: "",
  screenTimeData: "",

  accepted: false,
};

const YesNoQuestion = ({ title, name, value, onChange, required = false }) => (
  <div className="social-injury-group">
    <h4>{title}</h4>
    <div className="checkbox-grid">
      {["Yes", "No"].map((option) => (
        <label key={option} className="checkbox-item">
          <input
            type="radio"
            name={name}
            value={option}
            required={required}
            checked={value === option}
            onChange={() => onChange(name, option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  </div>
);

const SocialMediaClaimForm = () => {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "MASTER SHORT-FORM COMPLAINT AND DEMAND FOR JURY TRIAL";
    return () => {
      document.title = "David Grossman & Associates";
    };
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMultiValue = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasValue = (value) => String(value ?? "").trim().length > 0;

  const platformsSummary = useMemo(
    () => (formData.platformsUsed.length ? formData.platformsUsed.join(", ") : "None selected"),
    [formData.platformsUsed]
  );

  const conditionsSummary = useMemo(
    () =>
      formData.diagnosedConditions.length
        ? formData.diagnosedConditions.join(", ")
        : "None selected",
    [formData.diagnosedConditions]
  );

  const signedDateParts = useMemo(() => {
    if (!formData.signedDate) {
      return { day: "", month: "", year: "" };
    }

    const [year = "", month = "", day = ""] = formData.signedDate.split("-");
    return { day, month, year };
  }, [formData.signedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    const contactEmailForReview = String(formData.contactEmail ?? "").trim();

    if (!hasValue(formData.clientEntityName)) errors.push("Client entity name is required.");
    if (!hasValue(formData.authorizedRepresentativeNameTitle)) {
      errors.push("Authorized representative name/title is required.");
    }
    if (!hasValue(formData.authorizedRepresentativeBy)) errors.push("BY is required.");
    if (!hasValue(formData.signedDate)) errors.push("Signed date is required.");

    if (!hasValue(contactEmailForReview) || !isValidEmail(contactEmailForReview)) {
      errors.push("Valid contact email is required.");
    }
    if (!hasValue(formData.contactPhone)) errors.push("Contact phone is required.");
    if (!hasValue(formData.counselAddress)) {
      errors.push("Address (Street + Suite if Applicable) is required.");
    }
    if (!hasValue(formData.counselCityStateZip)) errors.push("City, State, Zip is required.");

    if (!hasValue(formData.fullName)) errors.push("Name is required.");
    if (!hasValue(formData.dateOfBirth)) errors.push("Date of birth is required.");
    if (!hasValue(formData.currentAge)) errors.push("Current age is required.");
    if (!hasValue(formData.stateOfResidence)) errors.push("State of residence is required.");
    if (!hasValue(formData.parentGuardian)) errors.push("Parent/Guardian is required.");

    if (formData.platformsUsed.length === 0) errors.push("Select at least one platform.");
    if (!hasValue(formData.ageWhenUseStarted)) errors.push("Age when use started is required.");
    if (!hasValue(formData.averageDailyUsage)) errors.push("Select average daily usage.");
    if (!hasValue(formData.usageIncreasedOverTime)) errors.push("Usage increase response is required.");
    if (!hasValue(formData.unableToStop)) errors.push("Unable-to-stop response is required.");

    if (formData.diagnosedConditions.length === 0) {
      errors.push("Select at least one diagnosed condition.");
    }
    if (!hasValue(formData.therapy)) errors.push("Therapy response is required.");
    if (!hasValue(formData.psychiatrist)) errors.push("Psychiatrist response is required.");
    if (!hasValue(formData.medicationsPrescribed)) {
      errors.push("Medications prescribed response is required.");
    }
    if (!hasValue(formData.hospitalization)) errors.push("Hospitalization response is required.");

    if (!hasValue(formData.mentalHealthBeforeSocialMedia)) {
      errors.push("Mental health BEFORE social media response is required.");
    }
    if (!hasValue(formData.mentalHealthAfterHeavyUse)) {
      errors.push("Mental health AFTER heavy use response is required.");
    }
    if (!hasValue(formData.symptomsBegin)) errors.push("Symptoms begin date is required.");

    if (!hasValue(formData.dropInGrades)) errors.push("Drop in grades response is required.");
    if (!hasValue(formData.socialWithdrawal)) errors.push("Social withdrawal response is required.");
    if (!hasValue(formData.sleepDisruption)) errors.push("Sleep disruption response is required.");
    if (!hasValue(formData.eatingBehaviorChanges)) {
      errors.push("Eating behavior changes response is required.");
    }

    if (!hasValue(formData.medicalRecords)) errors.push("Medical records response is required.");
    if (!hasValue(formData.schoolRecords)) errors.push("School records response is required.");
    if (!hasValue(formData.screenTimeData)) {
      errors.push("Screen time data response is required.");
    }

    if (!formData.accepted) errors.push("Please confirm the intake checkbox.");

    if (errors.length) {
      alert(`Please complete the following:\n\n- ${errors.join("\n- ")}`);
      return;
    }

    const confirmEmail = window.confirm(
      `Please verify this email before submitting intake:\n\n${contactEmailForReview}\n\nClick OK to submit, or Cancel to review.`
    );

    if (!confirmEmail) {
      return;
    }

    try {
      setIsSending(true);

      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID6,
        import.meta.env.VITE_TEMPLATE_ID6,
        formRef.current,
        import.meta.env.VITE_USER_ID6
      );

      alert("Form submitted successfully.");
      setFormData(initialData);
    } catch (error) {
      console.error(error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="claim-form-page social-media-claim-page">
      <h2>MASTER SHORT-FORM COMPLAINT AND DEMAND FOR JURY TRIAL</h2>
      <p className="social-form-intro">
        Complete the intake below based on the client&apos;s social media usage, injuries, timeline,
        and supporting documentation.
      </p>

      <form ref={formRef} onSubmit={handleSubmit}>
        <h3>Client Contact</h3>
        <fieldset>
        <div className="signature-top-wrap">
          <div className="signature-grid-head">
            <span>CLIENT SECTION</span>
            <span>LAW FIRM SECTION</span>
          </div>

          <div className="signature-grid-table">
            <div className="signature-grid-row">
              <div className="signature-grid-cell">
                <label>
                  <span>Please print Client Entity Name:</span>
                  <input
                    type="text"
                    name="client_entity_name"
                    value={formData.clientEntityName}
                    onChange={(e) => handleChange("clientEntityName", e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="signature-grid-cell signature-grid-static-text">
                DAVID GROSSMAN &amp; ASSOCIATES, PLLC
              </div>
            </div>

            <div className="signature-grid-row">
              <div className="signature-grid-cell">
                <label>
                  <span>Print Name &amp; Title of Authorized Representative:</span>
                  <input
                    type="text"
                    name="authorized_representative_name_title"
                    value={formData.authorizedRepresentativeNameTitle}
                    onChange={(e) =>
                      handleChange("authorizedRepresentativeNameTitle", e.target.value)
                    }
                    required
                  />
                </label>
              </div>
              <div className="signature-grid-cell signature-grid-empty" />
            </div>

            <div className="signature-grid-row">
              <div className="signature-grid-cell signature-grid-empty" />
              <div className="signature-grid-cell">
                <label>
                  <span>BY:</span>
                  <input
                    type="text"
                    name="authorized_representative_by"
                    value={formData.authorizedRepresentativeBy}
                    onChange={(e) => handleChange("authorizedRepresentativeBy", e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>

            <div className="signature-grid-row">
              <div className="signature-grid-cell">
                <label>
                  <span>Contact Email:</span>
                  <input
                    type="email"
                    name="authorized_contact_email"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="signature-grid-cell">
                <div className="signature-date-block">
                  <span className="signature-date-label">DATE:</span>
                  <input
                    type="date"
                    name="signed_date"
                    value={formData.signedDate}
                    onChange={(e) => handleChange("signedDate", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="signature-grid-row">
              <div className="signature-grid-cell">
                <label>
                  <span>Contact Phone:</span>
                  <input
                    type="tel"
                    name="authorized_contact_phone"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="signature-grid-cell">
                <label>
                  <span>co-counsel</span>
                  <input
                    type="text"
                    name="co_counsel"
                    value={formData.coCounsel}
                    onChange={(e) => handleChange("coCounsel", e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="signature-grid-row">
              <div className="signature-grid-cell">
                <label>
                  <span>Address (Street + Suite if Applicable):</span>
                  <textarea
                    name="address_street_suite"
                    value={formData.counselAddress}
                    onChange={(e) => handleChange("counselAddress", e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="signature-grid-cell signature-grid-empty" />
            </div>

            <div className="signature-grid-row">
              <div className="signature-grid-cell">
                <label>
                  <span>City, State, Zip:</span>
                  <input
                    type="text"
                    name="city_state_zip"
                    value={formData.counselCityStateZip}
                    onChange={(e) => handleChange("counselCityStateZip", e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="signature-grid-cell signature-grid-empty" />
            </div>
          </div>
        </div>

          <div className="contact-row">
            <label>
              <span>Contact Email *</span>
              <input
                type="email"
                name="contact_email"
                value={formData.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                required
              />
            </label>

            <label>
              <span>Contact Phone</span>
              <input
                type="tel"
                name="contact_phone"
                value={formData.contactPhone}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                required
              />
            </label>
          </div>
        </fieldset>

        <h3>SECTION A - Basic Qualification</h3>
        <fieldset>
          <div className="contact-fields">
            <label>
              <span>Name *</span>
              <input
                type="text"
                name="full_name"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                required
              />
            </label>

            <div className="contact-row">
              <label>
                <span>Date of Birth</span>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  required
                />
              </label>

              <label>
                <span>Current Age *</span>
                <input
                  type="number"
                  min="0"
                  name="current_age"
                  value={formData.currentAge}
                  onChange={(e) => handleChange("currentAge", e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="contact-row">
              <label>
                <span>State of Residence *</span>
                <input
                  type="text"
                  name="state_of_residence"
                  value={formData.stateOfResidence}
                  onChange={(e) => handleChange("stateOfResidence", e.target.value)}
                  required
                />
              </label>

              <label>
                <span>Parent/Guardian (if minor at time of injury)</span>
                <input
                  type="text"
                  name="parent_guardian"
                  value={formData.parentGuardian}
                  onChange={(e) => handleChange("parentGuardian", e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
        </fieldset>

        <h3>SECTION B - Platform Usage</h3>
        <fieldset>
          <legend>Which platforms used? (check all)</legend>

          <div className="checkbox-grid platform-grid">
            {PLATFORM_OPTIONS.map((platform) => (
              <label key={platform} className="checkbox-item platform-pill">
                <input
                  type="checkbox"
                  checked={formData.platformsUsed.includes(platform)}
                  onChange={() => toggleMultiValue("platformsUsed", platform)}
                />
                <span>{platform}</span>
              </label>
            ))}
          </div>

          <div className="contact-row">
            <label>
              <span>Age when use started</span>
              <input
                type="number"
                min="0"
                name="age_when_use_started"
                value={formData.ageWhenUseStarted}
                onChange={(e) => handleChange("ageWhenUseStarted", e.target.value)}
                required
              />
            </label>
          </div>

          <div className="social-injury-group">
            <h4>Average Daily Usage</h4>
            <div className="checkbox-grid">
              {DAILY_USAGE_OPTIONS.map((option) => (
                <label key={option} className="checkbox-item">
                  <input
                    type="radio"
                    name="average_daily_usage"
                    value={option}
                    required
                    checked={formData.averageDailyUsage === option}
                    onChange={() => handleChange("averageDailyUsage", option)}
                  />
                  <span>{option === "5+ hrs" ? "5+ hrs (PRIORITY CASE)" : option}</span>
                </label>
              ))}
            </div>
          </div>

          <YesNoQuestion
            title="Did usage increase over time?"
            name="usage_increased_over_time"
            value={formData.usageIncreasedOverTime}
            onChange={(_, value) => handleChange("usageIncreasedOverTime", value)}
            required
          />

          <YesNoQuestion
            title="Did user feel unable to stop?"
            name="unable_to_stop"
            value={formData.unableToStop}
            onChange={(_, value) => handleChange("unableToStop", value)}
            required
          />
        </fieldset>

        <h3>SECTION C - Injury Profile (MOST IMPORTANT)</h3>
        <fieldset>
          <legend>Diagnosed Conditions (check all)</legend>
          <div className="checkbox-grid">
            {CONDITION_OPTIONS.map((condition) => (
              <label key={condition} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.diagnosedConditions.includes(condition)}
                  onChange={() => toggleMultiValue("diagnosedConditions", condition)}
                />
                <span>{condition}</span>
              </label>
            ))}
          </div>

          <div className="social-card-grid">
            <YesNoQuestion
              title="Therapy?"
              name="therapy"
              value={formData.therapy}
              onChange={(_, value) => handleChange("therapy", value)}
              required
            />
            <YesNoQuestion
              title="Psychiatrist?"
              name="psychiatrist"
              value={formData.psychiatrist}
              onChange={(_, value) => handleChange("psychiatrist", value)}
              required
            />
            <YesNoQuestion
              title="Medications prescribed?"
              name="medications_prescribed"
              value={formData.medicationsPrescribed}
              onChange={(_, value) => handleChange("medicationsPrescribed", value)}
              required
            />
            <YesNoQuestion
              title="Hospitalization?"
              name="hospitalization"
              value={formData.hospitalization}
              onChange={(_, value) => handleChange("hospitalization", value)}
              required
            />
          </div>
        </fieldset>

        <h3>SECTION D - Timeline (Causation Builder)</h3>
        <fieldset>
          <div className="social-card-grid social-card-grid-two">
            <div className="social-injury-group">
              <h4>Mental health BEFORE social media</h4>
              <div className="checkbox-grid">
                {BEFORE_OPTIONS.map((option) => (
                  <label key={option} className="checkbox-item">
                    <input
                      type="radio"
                      name="mental_health_before_social_media"
                      value={option}
                      required
                      checked={formData.mentalHealthBeforeSocialMedia === option}
                      onChange={() => handleChange("mentalHealthBeforeSocialMedia", option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="social-injury-group">
              <h4>Mental health AFTER heavy use</h4>
              <div className="checkbox-grid">
                {AFTER_OPTIONS.map((option) => (
                  <label key={option} className="checkbox-item">
                    <input
                      type="radio"
                      name="mental_health_after_heavy_use"
                      value={option}
                      required
                      checked={formData.mentalHealthAfterHeavyUse === option}
                      onChange={() => handleChange("mentalHealthAfterHeavyUse", option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <label>
            <span>When did symptoms begin?</span>
            <input
              type="date"
              name="symptoms_begin"
              value={formData.symptomsBegin}
              onChange={(e) => handleChange("symptomsBegin", e.target.value)}
              required
            />
          </label>
        </fieldset>

        <h3>SECTION E - Life Impact</h3>
        <fieldset>
          <div className="social-card-grid">
            <YesNoQuestion
              title="Drop in grades?"
              name="drop_in_grades"
              value={formData.dropInGrades}
              onChange={(_, value) => handleChange("dropInGrades", value)}
              required
            />
            <YesNoQuestion
              title="Social withdrawal?"
              name="social_withdrawal"
              value={formData.socialWithdrawal}
              onChange={(_, value) => handleChange("socialWithdrawal", value)}
              required
            />
            <YesNoQuestion
              title="Sleep disruption?"
              name="sleep_disruption"
              value={formData.sleepDisruption}
              onChange={(_, value) => handleChange("sleepDisruption", value)}
              required
            />
            <YesNoQuestion
              title="Eating behavior changes?"
              name="eating_behavior_changes"
              value={formData.eatingBehaviorChanges}
              onChange={(_, value) => handleChange("eatingBehaviorChanges", value)}
              required
            />
          </div>
        </fieldset>

        <h3>SECTION F - Documentation</h3>
        <fieldset>
          <div className="social-card-grid social-card-grid-three">
            <YesNoQuestion
              title="Do you have medical records?"
              name="medical_records"
              value={formData.medicalRecords}
              onChange={(_, value) => handleChange("medicalRecords", value)}
              required
            />
            <YesNoQuestion
              title="School records?"
              name="school_records"
              value={formData.schoolRecords}
              onChange={(_, value) => handleChange("schoolRecords", value)}
              required
            />
            <YesNoQuestion
              title="Screen time data available?"
              name="screen_time_data"
              value={formData.screenTimeData}
              onChange={(_, value) => handleChange("screenTimeData", value)}
              required
            />
          </div>
        </fieldset>

        <div className="disclaimer-section">
          <label className="disclaimer-label">
            <input
              type="checkbox"
              checked={formData.accepted}
              onChange={(e) => handleChange("accepted", e.target.checked)}
              required
            />
            <span>
              I confirm that the information provided in this questionnaire is true and complete to
              the best of my knowledge.
            </span>
          </label>
        </div>

        <input type="hidden" name="submission_date" value={new Date().toLocaleString()} />
        <input type="hidden" name="signed_day" value={signedDateParts.day} />
        <input type="hidden" name="signed_month" value={signedDateParts.month} />
        <input type="hidden" name="signed_year" value={signedDateParts.year} />
        <input type="hidden" name="platforms_used_summary" value={platformsSummary} />
        <input type="hidden" name="diagnosed_conditions_summary" value={conditionsSummary} />

        {PLATFORM_OPTIONS.map((platform) => {
          const field = `platform_${platform.toLowerCase()}`;
          return (
            <input
              key={field}
              type="hidden"
              name={field}
              value={formData.platformsUsed.includes(platform) ? "Yes" : "No"}
            />
          );
        })}

        {CONDITION_OPTIONS.map((condition) => {
          const safe = condition
            .toLowerCase()
            .replace(/\(|\)/g, "")
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_|_$/g, "");

          return (
            <input
              key={safe}
              type="hidden"
              name={`condition_${safe}`}
              value={formData.diagnosedConditions.includes(condition) ? "Yes" : "No"}
            />
          );
        })}

        <button type="submit" className="social-submit-btn" disabled={isSending}>
          {isSending ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Sending...
            </>
          ) : (
            "Submit Intake"
          )}
        </button>
      </form>
    </div>
  );
};

export default SocialMediaClaimForm;
