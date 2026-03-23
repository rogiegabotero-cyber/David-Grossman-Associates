import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { ArrowLeft, Loader2 } from "lucide-react";
import "../vga-form/claim_form.css";
import "./social_media_claim_form.css";

const DEFENDANT_GROUPS = [
  {
    key: "meta",
    label: "META ENTITIES",
    items: [
      {
        id: "meta_platforms_inc",
        label: "META PLATFORMS, INC., formerly known as Facebook, Inc.",
      },
      { id: "instagram_llc", label: "INSTAGRAM, LLC" },
      { id: "facebook_payments_inc", label: "FACEBOOK PAYMENTS, INC." },
      { id: "siculus_inc", label: "SICULUS, INC." },
      { id: "facebook_operations_llc", label: "FACEBOOK OPERATIONS, LLC" },
    ],
  },
  {
    key: "tiktok",
    label: "TIKTOK ENTITIES",
    items: [
      { id: "bytedance_ltd", label: "BYTEDANCE, LTD" },
      { id: "bytedance_inc", label: "BYTEDANCE, INC" },
      { id: "tiktok_ltd", label: "TIKTOK, LTD." },
      { id: "tiktok_llc", label: "TIKTOK, LLC." },
      { id: "tiktok_inc", label: "TIKTOK, INC." },
    ],
  },
  {
    key: "snap",
    label: "SNAP ENTITY",
    items: [{ id: "snap_inc", label: "SNAP INC." }],
  },
  {
    key: "google",
    label: "GOOGLE ENTITIES",
    items: [
      { id: "google_llc", label: "GOOGLE LLC" },
      { id: "youtube_llc", label: "YOUTUBE, LLC" },
    ],
  },
];

const PRODUCT_KEYS = ["facebook", "instagram", "snapchat", "tiktok", "youtube"];

const PRODUCT_LABELS = {
  facebook: "FACEBOOK",
  instagram: "INSTAGRAM",
  snapchat: "SNAPCHAT",
  tiktok: "TIKTOK",
  youtube: "YOUTUBE",
};

const FLAT_INJURY_OPTIONS = [
  "ADDICTION/COMPULSIVE USE",
  "DEPRESSION",
  "ANXIETY",
  "CHILD SEX ABUSE",
  "CSAM VIOLATIONS",
];

const EATING_DISORDER_OPTIONS = ["Anorexia", "Bulimia", "Binge Eating"];
const SELF_HARM_OPTIONS = ["Suicidality", "Attempted Suicide", "Death by Suicide"];

const CAUSES = [
  { count: 1, title: "STRICT LIABILITY - DESIGN DEFECT" },
  { count: 2, title: "STRICT LIABILITY - FAILURE TO WARN" },
  { count: 3, title: "NEGLIGENCE - DESIGN" },
  { count: 4, title: "NEGLIGENCE – FAILURE TO WARN" },
  { count: 5, title: "NEGLIGENCE" },
  { count: 6, title: "NEGLIGENT UNDERTAKING" },
  { count: 7, title: "VIOLATION OF UNFAIR TRADE PRACTICES/CONSUMER PROTECTION LAWS" },
  { count: 8, title: "FRAUDULENT CONCEALMENT AND MISREPRESENTATION (Against Meta only)" },
  { count: 9, title: "NEGLIGENT CONCEALMENT AND MISREPRESENTATION (Against Meta only)" },
  { count: 10, title: "NEGLIGENCE PER SE" },
  {
    count: 11,
    title:
      "VIOLATIONS OF 18 U.S.C. §§ 1595 and 1591 (Civil Remedy for Sex trafficking of children or by force, fraud, or coercion)",
  },
  {
    count: 12,
    title:
      "VIOLATIONS OF 18 U.S.C. §§ 2255 and 2252 (Civil remedy Certain activities relating to material involving the sexual exploitation of minors)",
  },
  {
    count: 13,
    title:
      "VIOLATIONS OF 18 U.S.C. §§ 2252A(f), 1466A (Civil remedy for Certain activities relating to material constituting or containing child pornography)",
  },
  {
    count: 14,
    title:
      "VIOLATIONS OF 18 U.S.C. §§ 2255 and 2252A(5)(b) (Civil remedy for Certain activities relating to material constituting or containing child pornography)",
  },
  {
    count: 15,
    title:
      "VIOLATIONS OF 18 U.S.C. §§ 2258B and 2258A (Liability related to Reporting requirements of providers regarding online child sexual exploitation)",
  },
  { count: 16, title: "WRONGFUL DEATH" },
  { count: 17, title: "SURVIVAL ACTION" },
  { count: 18, title: "LOSS OF CONSORTIUM AND SOCIETY" },
];

const createCauseState = () =>
  CAUSES.reduce((acc, cause) => {
    acc[cause.count] = {
      meta: false,
      snap: false,
      tiktok: false,
      google: false,
      otherDefendants: "",
      statute: "",
    };
    return acc;
  }, {});

const defaultProducts = PRODUCT_KEYS.reduce((acc, key) => {
  acc[key] = { selected: false, from: "", to: "" };
  return acc;
}, {});

const SocialMediaClaimForm = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [isSending, setIsSending] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [emailToConfirm, setEmailToConfirm] = useState("");

  const [contactInfo, setContactInfo] = useState({
    intakeEmail: "",
    intakePhone: "",
  });

  const [selectedDefendants, setSelectedDefendants] = useState({});

  const [formData, setFormData] = useState({
    directFiledDistrict: "",
    transferredDistrict: "",
    transferredDate: "",
    plaintiffName: "",
    ageAtFiling: "",
    platformCitiesStates: "",
    guardianAdLitem: "",
    consortiumPlaintiffs: "",
    decedentInfo: "",
    decedentDeathDate: "",
    wrongfulDeathRepresentative: "",
    residentState: "",
    otherDefendants: Array.from({ length: 5 }, () => ({ name: "", citizenship: "" })),
    products: defaultProducts,
    otherProducts: "",
    injuries: [],
    injuryEatingOther: "",
    injurySelfHarmOther: "",
    injuryPhysicalOther: "",
    causes: createCauseState(),
    additionalCauses: "",
    disclaimerAccepted: false,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "MASTER SHORT-FORM COMPLAINT AND DEMAND FOR JURY TRIAL";
    return () => {
      document.title = "David Grossman & Associates";
    };
  }, []);

  const handleBasicChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProductChange = (key, field, value) => {
    setFormData((prev) => ({
      ...prev,
      products: {
        ...prev.products,
        [key]: {
          ...prev.products[key],
          [field]: value,
        },
      },
    }));
  };

  const handleOtherDefendantChange = (index, field, value) => {
    setFormData((prev) => {
      const next = [...prev.otherDefendants];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, otherDefendants: next };
    });
  };

  const toggleInjury = (value) => {
    setFormData((prev) => ({
      ...prev,
      injuries: prev.injuries.includes(value)
        ? prev.injuries.filter((item) => item !== value)
        : [...prev.injuries, value],
    }));
  };

  const toggleDefendantCheckbox = (name, checked) => {
    setSelectedDefendants((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCauseChange = (count, field, value) => {
    setFormData((prev) => ({
      ...prev,
      causes: {
        ...prev.causes,
        [count]: {
          ...prev.causes[count],
          [field]: value,
        },
      },
    }));
  };

  const otherDefendantsSummary = useMemo(
    () =>
      formData.otherDefendants
        .map((entry, idx) => {
          if (!entry.name && !entry.citizenship) return "";
          return `${idx + 1}. ${entry.name || "N/A"} — ${entry.citizenship || "N/A"}`;
        })
        .filter(Boolean)
        .join("\n"),
    [formData.otherDefendants]
  );

  const selectedDefendantsSummary = useMemo(() => {
    const selections = [];
    DEFENDANT_GROUPS.forEach((group) => {
      group.items.forEach((item) => {
        const key = `def_${item.id}`;
        if (selectedDefendants[key]) selections.push(item.label);
      });
    });
    return selections.join("\n");
  }, [selectedDefendants]);

  const productUseSummary = useMemo(() => {
    const rows = PRODUCT_KEYS.map((key) => {
      const item = formData.products[key];
      if (!item.selected) return "";
      return `${PRODUCT_LABELS[key]}: ${item.from || "N/A"} to ${item.to || "N/A"}`;
    }).filter(Boolean);

    if (formData.otherProducts.trim()) {
      rows.push(`OTHER: ${formData.otherProducts.trim()}`);
    }

    return rows.join("\n");
  }, [formData.products, formData.otherProducts]);

  const selectedInjuriesSummary = useMemo(() => {
    const items = [...formData.injuries];
    if (formData.injuryEatingOther.trim()) {
      items.push(`EATING DISORDER - Other: ${formData.injuryEatingOther.trim()}`);
    }
    if (formData.injurySelfHarmOther.trim()) {
      items.push(`SELF-HARM - Other Self-Harm: ${formData.injurySelfHarmOther.trim()}`);
    }
    if (formData.injuryPhysicalOther.trim()) {
      items.push(`OTHER PHYSICAL INJURIES (SPECIFY): ${formData.injuryPhysicalOther.trim()}`);
    }
    return items.join("\n");
  }, [
    formData.injuries,
    formData.injuryEatingOther,
    formData.injurySelfHarmOther,
    formData.injuryPhysicalOther,
  ]);

  const causesSummary = useMemo(
    () =>
      CAUSES.map((cause) => {
        const current = formData.causes[cause.count];
        const assertedAgainst = [
          current.meta ? "Meta entities" : null,
          current.snap ? "Snap entity" : null,
          current.tiktok ? "TikTok entities" : null,
          current.google ? "Google entities" : null,
          current.otherDefendants ? `Other Defendant(s): ${current.otherDefendants}` : null,
        ]
          .filter(Boolean)
          .join(", ");

        const statuteLine =
          cause.count === 7 && current.statute
            ? ` | Identify Applicable State Statute(s): ${current.statute}`
            : "";

        return `${cause.count}. ${cause.title}${
          assertedAgainst ? ` | Asserted Against: ${assertedAgainst}` : ""
        }${statuteLine}`;
      }).join("\n"),
    [formData.causes]
  );

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInitialSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(contactInfo.intakeEmail)) {
      alert("Please enter a valid email address before proceeding.");
      return;
    }

    if (!formData.disclaimerAccepted) {
      alert("Please accept the consent and authorization section before proceeding.");
      return;
    }

    setEmailToConfirm(contactInfo.intakeEmail);
    setShowEmailPopup(true);
  };

  const handleConfirmAndSend = () => {
    setIsSending(true);
    setShowEmailPopup(false);

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID6,
        import.meta.env.VITE_TEMPLATE_ID6,
        formRef.current,
        import.meta.env.VITE_USER_ID6
      )
      .then(
        () => {
          navigate("/form-processing", {
            state: { contactEmail: contactInfo.intakeEmail },
          });
        },
        (error) => {
          console.error(error);
          alert("Failed to submit form. Please try again.");
          setIsSending(false);
        }
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInitialSubmit(e);
  };

  return (
    <div className="claim-form-page social-media-claim-page">
      <div className="social-form-topnav">
        <Link to="/file_claim_page" className="social-back-link">
          <ArrowLeft size={18} /> Back to File a Claim
        </Link>
      </div>

      <h2>MASTER SHORT-FORM COMPLAINT AND DEMAND FOR JURY TRIAL</h2>

      {showEmailPopup && (
        <div className="email-popup-overlay">
          <div className="email-popup">
            <h3>Confirm Your Email</h3>
            <p>Please confirm the email address where we should send any follow-up regarding this questionnaire.</p>
            <label>
              Proceed using this email:
              <input
                type="email"
                value={emailToConfirm}
                onChange={(e) => {
                  setEmailToConfirm(e.target.value);
                  setContactInfo((prev) => ({ ...prev, intakeEmail: e.target.value }));
                }}
              />
            </label>
            <div className="popup-buttons">
              <button
                type="button"
                className="cancel_btn"
                onClick={() => setShowEmailPopup(false)}
                disabled={isSending}
              >
                Cancel
              </button>
              <button
                type="button"
                className="proceed_btn"
                onClick={handleConfirmAndSend}
                disabled={isSending || !isValidEmail(emailToConfirm)}
              >
                {isSending ? (
                  <>
                    <Loader2 className="animate_spin" size={18} /> Sending...
                  </>
                ) : (
                  "Proceed"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit}>
        <h3>Response Contact</h3>
        <div className="contact-row">
          <label>
            <span>Email for follow-up *</span>
            <input
              type="email"
              name="intake_email"
              value={contactInfo.intakeEmail}
              onChange={(e) => setContactInfo((prev) => ({ ...prev, intakeEmail: e.target.value }))}
              required
            />
          </label>
          <label>
            <span>Phone number</span>
            <input
              type="tel"
              name="intake_phone"
              value={contactInfo.intakePhone}
              onChange={(e) => setContactInfo((prev) => ({ ...prev, intakePhone: e.target.value }))}
            />
          </label>
        </div>

        <h3>I. DESIGNATED FORUM</h3>
        <fieldset>
          <div className="contact-fields">
            <label>
              <span>
                1. For Direct Filed Cases: Identify the Federal District Court in which the Plaintiff(s) would have
                filed in the absence of direct filing:
              </span>
              <input
                type="text"
                name="direct_filed_district"
                value={formData.directFiledDistrict}
                onChange={(e) => handleBasicChange("directFiledDistrict", e.target.value)}
              />
            </label>

            <div className="contact-row">
              <label>
                <span>
                  2. For Transferred Cases: Identify the Federal District Court in which the Plaintiff(s) originally
                  filed
                </span>
                <input
                  type="text"
                  name="transferred_district"
                  value={formData.transferredDistrict}
                  onChange={(e) => handleBasicChange("transferredDistrict", e.target.value)}
                />
              </label>

              <label>
                <span>and the date of filing:</span>
                <input
                  type="date"
                  name="transferred_filing_date"
                  value={formData.transferredDate}
                  onChange={(e) => handleBasicChange("transferredDate", e.target.value)}
                />
              </label>
            </div>
          </div>
        </fieldset>

        <h3>II. IDENTIFICATION OF PARTIES</h3>
        <h3>A. PLAINTIFF</h3>
        <fieldset>
          <div className="contact-fields">
            <label>
              <span>
                3. Plaintiff: Name of the individual injured due to use of Defendant(s)’ social media products:
              </span>
              <input
                type="text"
                name="plaintiff_name"
                value={formData.plaintiffName}
                onChange={(e) => handleBasicChange("plaintiffName", e.target.value)}
                required
              />
            </label>

            <div className="contact-row">
              <label>
                <span>4. Age at time of filing:</span>
                <input
                  type="number"
                  min="0"
                  name="age_at_filing"
                  value={formData.ageAtFiling}
                  onChange={(e) => handleBasicChange("ageAtFiling", e.target.value)}
                />
              </label>

              <label>
                <span>
                  9. At the time of the filing of this Short-Form Complaint, Plaintiff(s) are residents and citizens of
                  [Indicate State]:
                </span>
                <input
                  type="text"
                  name="resident_state"
                  value={formData.residentState}
                  onChange={(e) => handleBasicChange("residentState", e.target.value)}
                />
              </label>
            </div>

            <label>
              <span>5. City(ies) and state(s) where Plaintiff primarily used Defendants’ platforms:</span>
              <textarea
                name="platform_cities_states"
                value={formData.platformCitiesStates}
                onChange={(e) => handleBasicChange("platformCitiesStates", e.target.value)}
              />
            </label>

            <label>
              <span>6. Last Name and State of Residence of Guardian Ad Litem, if applicable:</span>
              <input
                type="text"
                name="guardian_ad_litem"
                value={formData.guardianAdLitem}
                onChange={(e) => handleBasicChange("guardianAdLitem", e.target.value)}
              />
            </label>

            <label>
              <span>
                7. Name of the individual(s) that allege damages for loss of society or consortium (Consortium
                Plaintiff(s)) and their relationship to Plaintiff, if applicable:
              </span>
              <textarea
                name="consortium_plaintiffs"
                value={formData.consortiumPlaintiffs}
                onChange={(e) => handleBasicChange("consortiumPlaintiffs", e.target.value)}
              />
            </label>

            <div className="social-subsection-title">8. Survival and/or Wrongful Death Claims, if applicable:</div>

            <label>
              <span>(a) Name of decedent and state of residence at time of death:</span>
              <input
                type="text"
                name="decedent_info"
                value={formData.decedentInfo}
                onChange={(e) => handleBasicChange("decedentInfo", e.target.value)}
              />
            </label>

            <div className="contact-row">
              <label>
                <span>(b) Date of decedent’s death:</span>
                <input
                  type="date"
                  name="decedent_death_date"
                  value={formData.decedentDeathDate}
                  onChange={(e) => handleBasicChange("decedentDeathDate", e.target.value)}
                />
              </label>

              <label>
                <span>
                  (c) Name and capacity (i.e. executor, administrator, etc.) of Plaintiff(s) bringing claim for
                  decedent’s wrongful death:
                </span>
                <input
                  type="text"
                  name="wrongful_death_representative"
                  value={formData.wrongfulDeathRepresentative}
                  onChange={(e) => handleBasicChange("wrongfulDeathRepresentative", e.target.value)}
                />
              </label>
            </div>
          </div>
        </fieldset>

        <h3>B. DEFENDANT(S)</h3>
        <fieldset>
          <legend>10. Plaintiff(s) name(s) the following Defendants in this action [Check all that apply]:</legend>

          <div className="social-defendant-groups">
            {DEFENDANT_GROUPS.map((group) => (
              <div key={group.key} className="social-defendant-card">
                <h4>{group.label}</h4>
                {group.items.map((item) => {
                  const inputName = `def_${item.id}`;
                  return (
                    <label key={item.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={!!selectedDefendants[inputName]}
                        onChange={(e) => toggleDefendantCheckbox(inputName, e.target.checked)}
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="social-other-defendants">
            <h4>OTHER DEFENDANTS</h4>
            <p>
              For each “Other Defendant” Plaintiff(s) contend(s) are additional parties and are liable or responsible
              for Plaintiff(s) damages alleged herein, Plaintiffs must identify by name each Defendant and its
              citizenship, and Plaintiff(s) must plead the specific facts supporting any claim against each “Other
              Defendant” in a manner complying with the requirements of the Federal Rules of Civil Procedure. In doing
              so, Plaintiff(s) may attach additional pages to this Short-Form Complaint.
            </p>

            <div className="social-other-header">
              <span>NAME</span>
              <span>CITIZENSHIP</span>
            </div>

            {formData.otherDefendants.map((entry, index) => (
              <div key={index} className="contact-row social-other-row">
                <label>
                  <span>Name {index + 1}</span>
                  <input
                    type="text"
                    value={entry.name}
                    onChange={(e) => handleOtherDefendantChange(index, "name", e.target.value)}
                  />
                </label>
                <label>
                  <span>Citizenship {index + 1}</span>
                  <input
                    type="text"
                    value={entry.citizenship}
                    onChange={(e) => handleOtherDefendantChange(index, "citizenship", e.target.value)}
                  />
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <h3>C. PRODUCT USE</h3>
        <fieldset>
          <legend>
            11. Plaintiff used the following Social Media Products that substantially contributed to their injury/ies
            (check all that apply, and identify approximate dates of use, to the best of Plaintiff’s recollection):
          </legend>

          {PRODUCT_KEYS.map((key) => (
            <div key={key} className="social-product-row">
              <label className="checkbox-item social-product-toggle">
                <input
                  type="checkbox"
                  checked={formData.products[key].selected}
                  onChange={(e) => handleProductChange(key, "selected", e.target.checked)}
                />
                <span>{PRODUCT_LABELS[key]}</span>
              </label>

              <div className="contact-row social-product-dates">
                <label>
                  <span>Approximate dates of use:</span>
                  <input
                    type="date"
                    name={`${key}_date_from`}
                    value={formData.products[key].from}
                    onChange={(e) => handleProductChange(key, "from", e.target.value)}
                  />
                </label>

                <label>
                  <span>to</span>
                  <input
                    type="date"
                    name={`${key}_date_to`}
                    value={formData.products[key].to}
                    onChange={(e) => handleProductChange(key, "to", e.target.value)}
                  />
                </label>
              </div>
            </div>
          ))}

          <label>
            <span>OTHER: Social Media Product(s) Used Approximate Dates of Use</span>
            <textarea
              name="other_products"
              value={formData.otherProducts}
              onChange={(e) => handleBasicChange("otherProducts", e.target.value)}
            />
          </label>
        </fieldset>

        <h3>D. PERSONAL INJURY</h3>
        <fieldset>
          <legend>
            12. Plaintiff(s) experienced the following personal injury/ies alleged to have been caused by Defendant(s)’
            Social Media Products [Check all that apply]:
          </legend>

          <div className="checkbox-grid">
            {FLAT_INJURY_OPTIONS.map((injury) => (
              <label key={injury} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.injuries.includes(injury)}
                  onChange={() => toggleInjury(injury)}
                />
                <span>{injury}</span>
              </label>
            ))}
          </div>

          <div className="social-injury-group">
            <h4>EATING DISORDER</h4>
            <div className="checkbox-grid">
              {EATING_DISORDER_OPTIONS.map((injury) => (
                <label key={injury} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.injuries.includes(injury)}
                    onChange={() => toggleInjury(injury)}
                  />
                  <span>{injury}</span>
                </label>
              ))}
            </div>
            <label>
              <span>Other:</span>
              <input
                type="text"
                name="injury_eating_other"
                value={formData.injuryEatingOther}
                onChange={(e) => handleBasicChange("injuryEatingOther", e.target.value)}
              />
            </label>
          </div>

          <div className="social-injury-group">
            <h4>SELF-HARM</h4>
            <div className="checkbox-grid">
              {SELF_HARM_OPTIONS.map((injury) => (
                <label key={injury} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.injuries.includes(injury)}
                    onChange={() => toggleInjury(injury)}
                  />
                  <span>{injury}</span>
                </label>
              ))}
            </div>
            <label>
              <span>Other Self-Harm:</span>
              <input
                type="text"
                name="injury_self_harm_other"
                value={formData.injurySelfHarmOther}
                onChange={(e) => handleBasicChange("injurySelfHarmOther", e.target.value)}
              />
            </label>
          </div>

          <label>
            <span>OTHER PHYSICAL INJURIES (SPECIFY):</span>
            <textarea
              name="injury_physical_other"
              value={formData.injuryPhysicalOther}
              onChange={(e) => handleBasicChange("injuryPhysicalOther", e.target.value)}
            />
          </label>
        </fieldset>

        <h3>V. CAUSES OF ACTION ASSERTED</h3>
        <fieldset className="social-causes-fieldset">
          <div className="social-causes-intro">
            <span className="social-causes-question-number">13.</span>
            <p>
              The following Causes of Action asserted in the Master Complaint, and the allegations with regard thereto,
              are adopted in this Short Form Complaint by reference <em>(check all that are adopted)</em>:
            </p>
          </div>

          <div className="social-causes-table-wrap">
            <table className="social-causes-table">
              <thead>
                <tr>
                  <th>Asserted Against<sup>2</sup></th>
                  <th>Count Number</th>
                  <th>Cause of Action (CoA)</th>
                </tr>
              </thead>
              <tbody>
                {CAUSES.map((cause) => {
                  const current = formData.causes[cause.count];
                  const countIsMetaOnly = cause.count === 8 || cause.count === 9;
                  const countHasStatute = cause.count === 7;

                  return (
                    <tr key={cause.count}>
                      <td className="social-causes-against-cell">
                        <label className="social-table-checkbox">
                          <input
                            type="checkbox"
                            checked={current.meta}
                            onChange={(e) => handleCauseChange(cause.count, "meta", e.target.checked)}
                          />
                          <span>Meta entities</span>
                        </label>

                        {!countIsMetaOnly && (
                          <>
                            <label className="social-table-checkbox">
                              <input
                                type="checkbox"
                                checked={current.snap}
                                onChange={(e) => handleCauseChange(cause.count, "snap", e.target.checked)}
                              />
                              <span>Snap entity</span>
                            </label>

                            <label className="social-table-checkbox">
                              <input
                                type="checkbox"
                                checked={current.tiktok}
                                onChange={(e) => handleCauseChange(cause.count, "tiktok", e.target.checked)}
                              />
                              <span>TikTok entities</span>
                            </label>

                            <label className="social-table-checkbox">
                              <input
                                type="checkbox"
                                checked={current.google}
                                onChange={(e) => handleCauseChange(cause.count, "google", e.target.checked)}
                              />
                              <span>Google entities</span>
                            </label>
                          </>
                        )}

                        <label className="social-table-checkbox">
                          <span>Other Defendant(s)</span>
                        </label>

                        <div className="social-other-def-inline">
                          <span>##</span>
                          <input
                            type="text"
                            value={current.otherDefendants}
                            onChange={(e) => handleCauseChange(cause.count, "otherDefendants", e.target.value)}
                            aria-label={`Other Defendant row numbers for Count ${cause.count}`}
                          />
                        </div>
                      </td>

                      <td className="social-causes-count-cell">{cause.count}</td>

                      <td className="social-causes-title-cell">
                        <div className="social-causes-title-text">{cause.title}</div>

                        {countHasStatute && (
                          <div className="social-statute-line">
                            <label>
                              <span>Identify Applicable State Statute(s):</span>
                              <input
                                type="text"
                                value={current.statute}
                                onChange={(e) => handleCauseChange(cause.count, "statute", e.target.value)}
                              />
                            </label>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="social-causes-footnotes">
            <p>
              <sup>2</sup> For purposes of this paragraph, “entity” means those defendants identified in Paragraph 7
              (e.g., “TikTok entities” means all TikTok defendants against which Plaintiff(s) is asserting claims).
            </p>
            <p>
              <sup>3</sup> Reference selected Other Defendants by the corresponding row number in the “Other
              Defendant(s)” chart above, in Question 7.
            </p>
          </div>
        </fieldset>

        <h3>VI. ADDITIONAL CAUSES OF ACTION</h3>
        <fieldset>
          <div className="social-note-box">
            <strong>NOTE</strong>
            <p>
              If Plaintiff(s) wants to allege additional Cause(s) of Action other than those selected in paragraph 10,
              which are the Causes(s) of Action set forth in the Master Complaint, the facts supporting those
              additional Cause(s) of Action, must be pled in a manner complying with the requirements of the Federal
              Rules of Civil Procedure. In doing so, Plaintiff(s) may attach additional pages to this Short-Form
              Complaint.
            </p>
          </div>

          <label>
            <span>
              14. Plaintiff(s) assert(s) the following additional Causes of Action and supporting allegations against
              the following Defendants:
            </span>
            <textarea
              name="additional_causes"
              value={formData.additionalCauses}
              onChange={(e) => handleBasicChange("additionalCauses", e.target.value)}
            />
          </label>
        </fieldset>

        <div className="disclaimer-section">
          <label className="disclaimer-label">
            <input
              type="checkbox"
              checked={formData.disclaimerAccepted}
              onChange={(e) => handleBasicChange("disclaimerAccepted", e.target.checked)}
            />
            <span>
              I confirm that the information provided in this questionnaire is true and complete to the best of my
              knowledge, and I authorize David Grossman & Associates to contact me using the email address above.
            </span>
          </label>
        </div>

        <input type="hidden" name="selected_defendants_summary" value={selectedDefendantsSummary} />
        <input type="hidden" name="other_defendants_summary" value={otherDefendantsSummary} />
        <input type="hidden" name="product_use_summary" value={productUseSummary} />
        <input type="hidden" name="injuries_summary" value={selectedInjuriesSummary} />
        <input type="hidden" name="causes_summary" value={causesSummary} />

        {DEFENDANT_GROUPS.flatMap((group) =>
          group.items.map((item) => {
            const key = `def_${item.id}`;
            return (
              <input
                key={key}
                type="hidden"
                name={key}
                value={selectedDefendants[key] ? "Yes" : "No"}
              />
            );
          })
        )}

        {CAUSES.map((cause) => (
          <React.Fragment key={`hidden-${cause.count}`}>
            <input
              type="hidden"
              name={`count_${cause.count}_meta`}
              value={formData.causes[cause.count].meta ? "Yes" : "No"}
            />
            <input
              type="hidden"
              name={`count_${cause.count}_snap`}
              value={formData.causes[cause.count].snap ? "Yes" : "No"}
            />
            <input
              type="hidden"
              name={`count_${cause.count}_tiktok`}
              value={formData.causes[cause.count].tiktok ? "Yes" : "No"}
            />
            <input
              type="hidden"
              name={`count_${cause.count}_google`}
              value={formData.causes[cause.count].google ? "Yes" : "No"}
            />
            <input
              type="hidden"
              name={`count_${cause.count}_other_defendants`}
              value={formData.causes[cause.count].otherDefendants}
            />
            <input
              type="hidden"
              name={`count_${cause.count}_statute`}
              value={formData.causes[cause.count].statute}
            />
          </React.Fragment>
        ))}

        <button type="submit" disabled={isSending}>
          {isSending ? (
            <>
              <Loader2 className="animate_spin" size={18} /> Sending...
            </>
          ) : (
            "Submit Questionnaire"
          )}
        </button>
      </form>
    </div>
  );
};

export default SocialMediaClaimForm;
