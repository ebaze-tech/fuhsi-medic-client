import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./index.css";
import { TextInput, YesNoRadioGroup, SelectInput } from "./Components";
// import {handleDownload}
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useAuth } from "./AuthContext";

const QuestionnairePage = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const [formData, setFormData] = useState({
    surname: "",
    otherNames: "",
    age: "",
    dob: "",
    sex: "",
    nationality: "",
    state: "",
    maritalStatus: "",
    faculty: "",
    matricNo: "",
    jambRegNo: "",
    department: "",
    telNo: "",
    religion: "",
    nextOfKinName: "",
    relationship: "",
    nextOfKinAddress: "",
    nextOfKinTel: "",
    tuberculosisYes: false,
    tuberculosisNo: false,
    asthmaYes: false,
    asthmaNo: false,
    pepticUlcerYes: false,
    pepticUlcerNo: false,
    sickleCellYes: false,
    sickleCellNo: false,
    allergiesYes: false,
    allergiesNo: false,
    diabetesYes: false,
    diabetesNo: false,
    hypertensionYes: false,
    hypertensionNo: false,
    seizuresYes: false,
    seizuresNo: false,
    mentalIllnessYes: false,
    mentalIllnessNo: false,
    familyTuberculosisYes: false,
    familyTuberculosisNo: false,
    familyMentalIllnessYes: false,
    familyMentalIllnessNo: false,
    familyDiabetesYes: false,
    familyDiabetesNo: false,
    familyHeartDiseaseYes: false,
    familyHeartDiseaseNo: false,
    smallpoxYes: false,
    smallpoxNo: false,
    poliomyelitisYes: false,
    poliomyelitisNo: false,
    immunizationTuberculosisYes: false,
    immunizationTuberculosisNo: false,
    meningitisYes: false,
    meningitisNo: false,
    hpvYes: false,
    hpvNo: false,
    hepatitisBYes: false,
    hepatitisBNo: false,
    tobaccoUseYes: false,
    tobaccoUseNo: false,
    secondhandSmokeYes: false,
    secondhandSmokeNo: false,
    alcoholConsumptionYes: false,
    alcoholConsumptionNo: false,
    tobaccoAlcoholDetails: "",
    otherMedicalInfo: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  //   const [sectionBOpen, setSectionBOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setErrors("User not authenticated");
      logout();
      navigate("/user/login");
    }
  }, [isAuthenticated, user, logout, navigate]);

  //   const [collapsedSections, setCollapsedSections] = useState({
  //     sectionA: false,
  //     sectionB: false,
  //     sectionC: false,
  //   });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "faculty") {
      const departments = facultyDepartments[value] || [];
      setAvailableDepartments(departments);

      if (formData.department && !departments.includes(formData.department)) {
        setFormData((prev) => ({ ...prev, [name]: value, department: "" }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  //   const handleRadioChange = (field, value) => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [field]: value,
  //     }));
  //   };

  const handleRadioChange = (e) => {
    const { name, checked } = e.target;
    const isYes = name.includes("Yes");
    const baseName = isYes ? name.replace("Yes", "") : name.replace("No", "");
    const yesName = `${baseName}Yes`;
    const noName = `${baseName}No`;

    setFormData((prev) => ({
      ...prev,
      [yesName]: isYes ? checked : !checked,
      [noName]: isYes ? !checked : checked,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const textFields = [
      "surname",
      "otherNames",
      "age",
      "dob",
      "sex",
      "nationality",
      "state",
      "maritalStatus",
      "faculty",
      "matricNo",
      "jambRegNo",
      "department",
      "telNo",
      "religion",
      "nextOfKinName",
      "relationship",
      "nextOfKinAddress",
      "nextOfKinTel",
    ];

    textFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .toUpperCase()} is required`;
      }
    });

    const checkboxPairs = [
      { yes: "tuberculosisYes", no: "tuberculosisNo", label: "Tuberculosis" },
      { yes: "asthmaYes", no: "asthmaNo", label: "Asthma" },
      {
        yes: "pepticUlcerYes",
        no: "pepticUlcerNo",
        label: "Peptic Ulcer Disease",
      },
      {
        yes: "sickleCellYes",
        no: "sickleCellNo",
        label: "Sickle Cell Disease",
      },
      { yes: "allergiesYes", no: "allergiesNo", label: "Allergies" },
      { yes: "diabetesYes", no: "diabetesNo", label: "Diabetes" },
      { yes: "hypertensionYes", no: "hypertensionNo", label: "Hypertension" },
      { yes: "seizuresYes", no: "seizuresNo", label: "Seizures/Convulsions" },
      {
        yes: "mentalIllnessYes",
        no: "mentalIllnessNo",
        label: "Mental Illness",
      },
      {
        yes: "familyTuberculosisYes",
        no: "familyTuberculosisNo",
        label: "Family Tuberculosis",
      },
      {
        yes: "familyMentalIllnessYes",
        no: "familyMentalIllnessNo",
        label: "Family Mental Illness",
      },
      {
        yes: "familyDiabetesYes",
        no: "familyDiabetesNo",
        label: "Family Diabetes Mellitus",
      },
      {
        yes: "familyHeartDiseaseYes",
        no: "familyHeartDiseaseNo",
        label: "Family Heart Disease",
      },
      { yes: "smallpoxYes", no: "smallpoxNo", label: "Small Pox Immunization" },
      {
        yes: "poliomyelitisYes",
        no: "poliomyelitisNo",
        label: "Poliomyelitis Immunization",
      },
      {
        yes: "immunizationTuberculosisYes",
        no: "immunizationTuberculosisNo",
        label: "Tuberculosis Immunization",
      },
      {
        yes: "meningitisYes",
        no: "meningitisNo",
        label: "Meningitis Immunization",
      },
      {
        yes: "hepatitisBYes",
        no: "hepatitisBNo",
        label: "Hepatitis B Immunization",
      },
      { yes: "tobaccoUseYes", no: "tobaccoUseNo", label: "Tobacco Use" },
      {
        yes: "secondhandSmokeYes",
        no: "secondhandSmokeNo",
        label: "Secondhand Smoke Exposure",
      },
      {
        yes: "alcoholConsumptionYes",
        no: "alcoholConsumptionNo",
        label: "Alcohol Consumption",
      },
    ];

    if (formData.sex === "Female") {
      checkboxPairs.push({
        yes: "hpvYes",
        no: "hpvNo",
        label: "HPV Immunization",
      });
    }

    checkboxPairs.forEach((pair) => {
      if (formData[pair.yes] === formData[pair.no]) {
        newErrors[
          pair.yes
        ] = `Please select exactly one option (YES or NO) for ${pair.label}`;
      }
    });

    if (
      formData.tobaccoUseYes ||
      formData.secondhandSmokeYes ||
      formData.alcoholConsumptionYes
    ) {
      if (!formData.tobaccoAlcoholDetails) {
        newErrors.tobaccoAlcoholDetails =
          "Details are required if any of the above (tobacco, secondhand smoke, alcohol) is YES";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Fill in all required fields to proceed");
      return;
    }

    setShowConfirmation(true);
  };

  const handleProceed = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    setLoading(true);
    try {
      navigate("/download-page", { state: { formData } });
    } catch (error) {
      console.error("Error in handleProceed:", error);
      alert("Error. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  const facultyDepartments = {
    "Basic Medical Sciences": ["Medicine and Surgery", "Pharmacology"],
    Science: ["Biochemistry", "Microbiology", "Biotechnology"],
    "Allied Health Sciences": ["Nursing Science", "Medical Laboratory Science"],
  };

  // Update departments when faculty changes
  useEffect(() => {
    if (formData.faculty) {
      const departments = facultyDepartments[formData.faculty] || [];
      setAvailableDepartments(departments);

      if (formData.department && !departments.includes(formData.department)) {
        setFormData((prev) => ({ ...prev, department: "" }));
      }
    } else {
      setAvailableDepartments([]);
    }
  }, [formData.faculty]);

  const handleGoBack = () => {
    setShowConfirmation(false);
    navigate("/questionnaire-page");
  };

  return (
    <main className="!bg-white !min-h-screen !flex !flex-col !items-center !py-10 !px-4">
      <div className="!w-full !max-w-4xl !flex !flex-col !gap-8">
        {/* Header */}
        <header className="!bg-gray-50 !rounded-xl !py-6 !px-6 shadow-md !text-center !border !border-gray-200">
          <h1 className="!text-2xl !md:text-3xl !font-bold !text-gray-900">
            FEDERAL UNIVERSITY OF HEALTH SCIENCES, ILA ORANGUN
          </h1>
          <h2 className="!text-sm !md:text-base !font-medium !text-gray-800 !mt-2">
            MEDICAL ENTRANCE SCREENING FORM FOR STUDENTS
          </h2>
        </header>

        {/* Info !text */}
        <div className="!bg-white !rounded-xl !px-6 !py-4 !shadow-sm !border !border-gray-200 !text-center">
          <p className="!text-sm !md:text-base !text-gray-700 !leading-relaxed">
            Students are requested to complete Part I of this form. Parts II &
            III will be completed by designated officers at the University
            Health Center. The completed form should be submitted to the Medical
            Director, University Health Services, and archived in the student's
            clinical folder.
          </p>
        </div>

        {/* Form */}
        {/* <form className="!bg-white !px-8 !py-8 sm:p-10 !rounded-none !border !border-solid !border-gray-100 space-y-12"> */}
        <form className="!bg-white !px-8 !py-8 !sm:p-10 !border-[1.5px] !border-gray-800 !rounded-none !space-y-12 !shadow-sm">
          {/* Student Info Section */}
          {/* Part I: Student Information */}
          <section className="!space-y-6">
            <h3 className="!text-xl !md:text-2xl !font-bold !text-gray-800 !border-b !pb-2">
              PART I <br />
              <div className="!flex !items-center !mt-4">
                <div className="!flex-shrink-0 !bg-blue-500 !rounded-full !w-6 !h-6 !flex !items-center !justify-center !mr-3">
                  <span className="!text-gray-800 !text-xs !font-bold">1</span>
                </div>
                <h3 className="!text-lg !font-bold !text-gray-800">
                  Student Information
                </h3>
              </div>
            </h3>

            {/* Student Info Form */}
            <div className="!bg-gray-50 !p-6 !rounded-lg !border !border-gray-200 !shadow-sm">
              <div className="!grid !grid-cols-1 !md:grid-cols-2 !gap-6 !py-4">
                {/* Wrap each input in a div if needed */}
                <div>
                  <TextInput
                    label="Surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    error={errors.surname}
                    required
                    // disabled={!formData.surname}
                  />
                </div>
                <div>
                  <TextInput
                    label="Other Names"
                    name="otherNames"
                    value={formData.otherNames}
                    onChange={handleInputChange}
                    error={errors.otherNames}
                    required
                    // disabled={!formData.otherNames}
                  />
                </div>
                <div>
                  <TextInput
                    label="Age"
                    name="age"
                    type="text"
                    value={formData.age}
                    onChange={handleInputChange}
                    error={errors.age}
                    required
                    // disabled={!formData.age}
                  />
                </div>
                <div>
                  <TextInput
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    error={errors.dob}
                    required
                    // disabled={!formData.dob}
                  />
                </div>
                <div>
                  <SelectInput
                    label="Sex"
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                    error={errors.sex}
                    options={["Male", "Female", "Other"]}
                    required
                    // disabled={!formData.sex}
                  />
                </div>
                <div>
                  <TextInput
                    label="Nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    error={errors.nationality}
                    required
                    // disabled={!formData.nationality}
                  />
                </div>
                <div>
                  <TextInput
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    error={errors.state}
                    options={[
                      "Abia",
                      "Adamawa",
                      "Akwa Ibom",
                      "Anambra",
                      "Bauchi",
                      "Bayelsa",
                      "Benue",
                      "Borno",
                      "Cross River",
                      "Delta",
                      "Ebonyi",
                      "Edo",
                      "Ekiti",
                      "Enugu",
                      "Gombe",
                      "Imo",
                      "Jigawa",
                      "Kaduna",
                      "Kano",
                      "Katsina",
                      "Kebbi",
                      "Kogi",
                      "Kwara",
                      "Lagos",
                      "Nasarawa",
                      "Niger",
                      "Ogun",
                      "Ondo",
                      "Osun",
                      "Oyo",
                      "Plateau",
                      "Rivers",
                      "Sokoto",
                      "Taraba",
                      "Yobe",
                      "Zamfara",
                    ]}
                    required
                    // disabled={!formData.state}
                  />
                </div>
                <div>
                  <SelectInput
                    label="Marital Status"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    error={errors.maritalStatus}
                    options={["Single", "Married", "Divorced", "Widowed"]}
                    required
                    // disabled={!formData.maritalStatus}
                  />
                </div>
                <div>
                  <SelectInput
                    label="Faculty"
                    name="faculty"
                    value={formData.faculty || ""}
                    onChange={handleInputChange}
                    error={errors.faculty}
                    options={Object.keys(facultyDepartments)}
                    required
                    disabled={loading}
                  />
                  <SelectInput
                    label="Department"
                    name="department"
                    value={formData.department || ""}
                    onChange={handleInputChange}
                    error={errors.department}
                    options={availableDepartments}
                    placeholder={
                      !formData.faculty
                        ? "Select faculty first"
                        : "Select department"
                    }
                    required
                    disabled={!formData.faculty || loading}
                  />
                </div>
                <div>
                  <TextInput
                    label="Matric No"
                    name="matricNo"
                    value={formData.matricNo}
                    onChange={handleInputChange}
                    error={errors.matricNo}
                    required
                    // disabled={!formData.matricNo}
                  />
                </div>
                <div>
                  <TextInput
                    label="JAMB Reg No"
                    name="jambRegNo"
                    value={formData.jambRegNo}
                    onChange={handleInputChange}
                    error={errors.jambRegNo}
                    required
                    // disabled={!formData.jambRegNo}
                  />
                </div>
                <div>
                  <TextInput
                    label="Phone Number"
                    name="telNo"
                    type="tel"
                    value={formData.telNo}
                    onChange={handleInputChange}
                    error={errors.telNo}
                    required
                    // disabled={!formData.telNo}
                  />
                </div>
                <div>
                  <SelectInput
                    label="Religion"
                    name="religion"
                    value={formData.religion}
                    onChange={handleInputChange}
                    error={errors.religion}
                    options={["Christianity", "Islam", "Traditional", "Other"]}
                    required
                    // disabled={!formData.religion}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Emergency Contact Section */}
          <section className="!space-y-6">
            <h4 className="!text-lg !md:text-xl !font-bold !text-gray-800 !border-b !pb-2">
              Emergency Contact Information
            </h4>

            {/* Emergency Contact Form */}
            <div className="!bg-gray-50 !p-6 !rounded-lg !border !border-gray-200 !shadow-sm">
              <div className="!grid !grid-cols-1 !md:grid-cols-2 !gap-6">
                <div>
                  <TextInput
                    label="Name of Next of Kin"
                    name="nextOfKinName"
                    value={formData.nextOfKinName}
                    onChange={handleInputChange}
                    error={errors.nextOfKinName}
                    required
                    // disabled={!formData.nextOfKinName}
                  />
                </div>
                <div>
                  <TextInput
                    label="Relationship to Next of Kin"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleInputChange}
                    error={errors.relationship}
                    required
                    // disabled={!formData.relationship}
                  />
                </div>
                <div className="!md:col-span-2">
                  <TextInput
                    label="Address of Next of Kin"
                    name="nextOfKinAddress"
                    value={formData.nextOfKinAddress}
                    onChange={handleInputChange}
                    error={errors.nextOfKinAddress}
                    required
                    // disabled={!formData.nextOfKinAddress}
                  />
                </div>
                <div>
                  <TextInput
                    label="Telephone No of Next of Kin"
                    name="nextOfKinTel"
                    type="tel"
                    value={formData.nextOfKinTel}
                    onChange={handleInputChange}
                    error={errors.nextOfKinTel}
                    required
                    // disabled={!formData.nextOfKinTel}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Medical History Section */}
          <section className="!space-y-6">
            <div className="!space-y-6">
              {/* Section Header */}
              <div className="!flex !items-center !space-x-3">
                <div className="!flex-shrink-0 !bg-blue-500 !rounded-full !w-6 !h-6 !flex !items-center !justify-center !mr-3">
                  <span className="!text-gray-800 !text-xs !font-bold">2</span>
                </div>
                <h3 className="!text-xl !font-bold !border-b !pb-2  !text-gray-800">
                  MEDICAL HISTORY
                </h3>
              </div>

              {/* Subheading */}
              <h4 className="!text-sm !font-semibold !text-gray-700 !mb-4 !pl-2">
                Answer each question by selecting YES or NO
              </h4>

              {/* Question Block */}
              <div className="!bg-gray-50 !p-4 !rounded-lg !border !border-gray-200 !shadow-sm !hover:bg-gray-100 !focus:outline-none !focus-visible:ring !focus-visible:ring-blue-500 !focus-visible:ring-opacity-75">
                <span className="!font-semibold !text-gray-700">
                  A) Do you suffer from or have you suffered from any of the
                  following?
                </span>
              </div>
            </div>

            <div className="!bg-gray-50 p-6 !rounded-lg !border-2 !border-gray-300 !shadow-sm">
              <div className="!overflow-x-auto !px-4 !pt-4 !pb-2">
                <table className="!min-w-full !table-auto !text-sm !text-gray-700 ">
                  <thead>
                    <tr className="!bg-gray-100 !border-b !text-center">
                      <th className="!px-4 !py-2 !text-left !font-medium !w-[60%]">
                        Condition
                      </th>
                      <th className="!px-4 !py-2 !font-medium">Yes</th>
                      <th className="!px-4 !py-2 !font-medium">No</th>
                    </tr>
                  </thead>
                  <tbody>
                    <YesNoRadioGroup
                      label="a. Tuberculosis"
                      yesName="tuberculosisYes"
                      noName="tuberculosisNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.tuberculosisYes}
                    />
                    <YesNoRadioGroup
                      label="b. Asthma"
                      yesName="asthmaYes"
                      noName="asthmaNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.asthmaYes}
                    />
                    <YesNoRadioGroup
                      label="c. Peptic Ulcer Disease"
                      yesName="pepticUlcerYes"
                      noName="pepticUlcerNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.pepticUlcerYes}
                    />
                    <YesNoRadioGroup
                      label="d. Sickle cell disease"
                      yesName="sickleCellYes"
                      noName="sickleCellNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.sickleCellYes}
                    />
                    <YesNoRadioGroup
                      label="e. Allergies"
                      yesName="allergiesYes"
                      noName="allergiesNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.allergiesYes}
                    />
                    <YesNoRadioGroup
                      label="f. Diabetes"
                      yesName="diabetesYes"
                      noName="diabetesNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.diabetesYes}
                    />
                    <YesNoRadioGroup
                      label="g. Hypertension"
                      yesName="hypertensionYes"
                      noName="hypertensionNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.hypertensionYes}
                    />
                    <YesNoRadioGroup
                      label="h. Seizures/Convulsions"
                      yesName="seizuresYes"
                      noName="seizuresNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.seizuresYes}
                    />
                    <YesNoRadioGroup
                      label="i. Mental illness"
                      yesName="mentalIllnessYes"
                      noName="mentalIllnessNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.mentalIllnessYes}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="!space-y-6">
            {/* Section B */}
            <div className="!flex !justify-between !items-center !w-full !px-4 !py-2 !text-sm !font-medium !text-left !text-gray-700 !bg-blue-50 !rounded-lg !hover:bg-blue-100 !focus:outline-none !focus-visible:ring !focus-visible:ring-blue-500 !focus-visible:ring-opacity-75">
              <span className="!font-semibold">
                B) Has any member of your family suffered from:
              </span>
            </div>
            <div className="!bg-gray-50 p-6 !rounded-lg !border-2 !border-gray-300 !shadow-sm">
              <div className="!overflow-x-auto !px-4 !pt-4 !pb-2">
                <table className="!min-w-full !table-auto !text-sm !text-gray-700">
                  <thead>
                    <tr className="!bg-gray-100 !border-b !text-center">
                      <th className="!px-4 !py-2 !text-left !font-medium !w-[60%]">
                        Condition
                      </th>
                      <th className="!px-4 !py-2 !font-medium">Yes</th>
                      <th className="!px-4 !py-2 !font-medium">No</th>
                    </tr>
                  </thead>
                  <tbody>
                    <YesNoRadioGroup
                      label="1. Tuberculosis"
                      yesName="familyTuberculosisYes"
                      noName="familyTuberculosisNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.familyTuberculosisYes}
                    />
                    <YesNoRadioGroup
                      label="2. Mental illness or insanity"
                      yesName="familyMentalIllnessYes"
                      noName="familyMentalIllnessNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.familyMentalIllnessYes}
                    />
                    <YesNoRadioGroup
                      label="3. Diabetes Mellitus"
                      yesName="familyDiabetesYes"
                      noName="familyDiabetesNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.familyDiabetesYes}
                    />
                    <YesNoRadioGroup
                      label="4. Heart Disease"
                      yesName="familyHeartDiseaseYes"
                      noName="familyHeartDiseaseNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.familyHeartDiseaseYes}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section C */}
          <section className="!space-y-6">
            <div className="!flex !justify-between !items-center !w-full !px-4 !py-2 !text-sm !font-medium !text-left !text-gray-700 !bg-blue-50 !rounded-lg !hover:bg-blue-100 !focus:outline-none !focus-visible:ring !focus-visible:ring-blue-500 !focus-visible:ring-opacity-75">
              <span className="!font-semibold">
                C) Have you been immunized against any of the following
                diseases:
              </span>
            </div>
            <div className="!bg-gray-50 p-6 !rounded-lg !border-2 !border-gray-300 !shadow-sm">
              <div className="!overflow-x-auto !px-4 !pt-4 !pb-2">
                <table className="!min-w-full !table-auto !text-sm !text-gray-700">
                  <thead>
                    <tr className="!bg-gray-100 !border-b !text-center">
                      <th className="!px-4 !py-2 !text-left !font-medium !w-[60%]">
                        Vaccine
                      </th>
                      <th className="!px-4 !py-2 !font-medium">Yes</th>
                      <th className="!px-4 !py-2 !font-medium">No</th>
                    </tr>
                  </thead>
                  <tbody>
                    <YesNoRadioGroup
                      label="1. Small pox"
                      yesName="smallpoxYes"
                      noName="smallpoxNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.smallpoxYes}
                    />
                    <YesNoRadioGroup
                      label="2. Poliomyelitis"
                      yesName="poliomyelitisYes"
                      noName="poliomyelitisNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.poliomyelitisYes}
                    />
                    <YesNoRadioGroup
                      label="3. Tuberculosis"
                      yesName="immunizationTuberculosisYes"
                      noName="immunizationTuberculosisNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.immunizationTuberculosisYes}
                    />
                    <YesNoRadioGroup
                      label="4. Meningitis"
                      yesName="meningitisYes"
                      noName="meningitisNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.meningitisYes}
                    />
                    {formData.sex === "Female" && (
                      <YesNoRadioGroup
                        label="5. Human Papilloma Virus (for females only)"
                        yesName="hpvYes"
                        noName="hpvNo"
                        formData={formData}
                        onChange={handleRadioChange}
                        error={errors.hpvYes}
                      />
                    )}
                    <YesNoRadioGroup
                      label={
                        formData.sex === "Female"
                          ? "6. Hepatitis B"
                          : "5. Hepatitis B"
                      }
                      yesName="hepatitisBYes"
                      noName="hepatitisBNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.hepatitisBYes}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Lifestyle and Other Information */}
          <section className="!space-y-6">
            <div className="!flex !justify-between !items-center !w-full !px-4 !py-2 !text-sm !font-medium !text-left !text-gray-700 !bg-blue-50 !rounded-lg !hover:bg-blue-100 !focus:outline-none !focus-visible:ring !focus-visible:ring-blue-500 !focus-visible:ring-opacity-75">
              <span className="!font-semibold">
                D) Lifestyle and Other Information
              </span>
            </div>

            <div className="!bg-gray-50 p-6 !rounded-lg !border-2 !border-gray-300 !shadow-sm">
              <div className="!overflow-x-auto !px-4 !pt-4 !pb-2">
                <table className="!min-w-full !table-auto !text-sm !text-gray-700">
                  <thead>
                    <tr className="!bg-gray-100 !border-b !text-center">
                      <th className="!px-4 !py-2 !text-left !font-medium !w-[60%]">
                        Question
                      </th>
                      <th className="!px-4 !py-2 !font-medium">Yes</th>
                      <th className="!px-4 !py-2 !font-medium">No</th>
                    </tr>
                  </thead>
                  <tbody>
                    <YesNoRadioGroup
                      label="Do you currently use tobacco products such as cigarettes, snuff etc?"
                      yesName="tobaccoUseYes"
                      noName="tobaccoUseNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.tobaccoUseYes}
                    />
                    <YesNoRadioGroup
                      label="Do you have someone at home/school/hostel who smokes when you are present?"
                      yesName="secondhandSmokeYes"
                      noName="secondhandSmokeNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.secondhandSmokeYes}
                    />
                    <YesNoRadioGroup
                      label="Do you currently consume alcohol?"
                      yesName="alcoholConsumptionYes"
                      noName="alcoholConsumptionNo"
                      formData={formData}
                      onChange={handleRadioChange}
                      error={errors.alcoholConsumptionYes}
                    />
                  </tbody>
                </table>
              </div>

              {(formData.tobaccoUseYes ||
                formData.secondhandSmokeYes ||
                formData.alcoholConsumptionYes) && (
                <TextInput
                  label="If the answer to any of the above is YES, provide details:"
                  name="tobaccoAlcoholDetails"
                  value={formData.tobaccoAlcoholDetails}
                  onChange={handleInputChange}
                  error={errors.tobaccoAlcoholDetails}
                  required={
                    formData.tobaccoUseYes ||
                    formData.secondhandSmokeYes ||
                    formData.alcoholConsumptionYes
                  }
                />
              )}

              <TextInput
                label="If there is any other medical information not stated above, please provide details:"
                name="otherMedicalInfo"
                value={formData.otherMedicalInfo}
                onChange={handleInputChange}
                className="!bg-inherit !p-4"
                textarea
              />
            </div>
          </section>

          {/* Parts II and III (For Clinic Staff) */}
          <section className="!space-y-6">
            {/* Section Header */}
            <div className="!flex !items-center">
              <div className="!flex-shrink-0 !bg-blue-500 !rounded-full !w-6 !h-6 !flex !items-center !justify-center !mr-3">
                <span className="!text-gray-800 !text-xs !font-bold">3</span>
              </div>
              <h3 className="!text-lg !font-bold !text-gray-800">
                CLINICAL EXAMINATION (For Clinic Staff Only)
              </h3>
            </div>

            {/* Part II: Clinical Examination */}
            <div className="!bg-gray-50 !p-6 !rounded-lg !border !border-gray-200 !shadow-sm">
              <h4 className="!text-sm !font-semibold !text-gray-700 !mb-4 !pl-3 !border-l-4 !border-yellow-500">
                Part II: Clinical Examination
              </h4>
              <div className="!grid !grid-cols-1 !md:grid-cols-3 !gap-4">
                <TextInput
                  label="Height (cm)"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  type="number"
                  disabled
                />
                <TextInput
                  label="Weight (kg)"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  type="number"
                  disabled
                />
                <TextInput
                  label="BMI"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleInputChange}
                  disabled
                />
                <div className="!md:col-span-2 !grid !grid-cols-2 !gap-4">
                  <TextInput
                    label="Visual Acuity (R)"
                    name="visualAcuityRight"
                    value={formData.visualAcuityRight}
                    onChange={handleInputChange}
                    disabled
                  />
                  <TextInput
                    label="Visual Acuity (L)"
                    name="visualAcuityLeft"
                    value={formData.visualAcuityLeft}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                <TextInput
                  label="Blood Pressure (BP)"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  disabled
                />
                <TextInput
                  label="Pulse Rate (PR)"
                  name="pulseRate"
                  value={formData.pulseRate}
                  onChange={handleInputChange}
                  type="number"
                  disabled
                />
              </div>
            </div>

            {/* Part III: Laboratory Investigations */}
            <div className="!bg-gray-50 !p-6 !rounded-lg !border !border-gray-200 !shadow-sm">
              <h4 className="!text-sm !font-semibold !text-gray-700 !mb-4 !pl-3 !border-l-4 !border-yellow-500">
                Part III: Laboratory Investigations
              </h4>
              <div className="!grid !grid-cols-1 !md:grid-cols-2 !gap-4">
                <TextInput
                  label="Urine"
                  name="urine"
                  value={formData.urine}
                  onChange={handleInputChange}
                  disabled
                />
                <TextInput
                  label="Albumin"
                  name="albumin"
                  value={formData.albumin}
                  onChange={handleInputChange}
                  disabled
                />
                <TextInput
                  label="Sugar"
                  name="sugar"
                  value={formData.sugar}
                  onChange={handleInputChange}
                  disabled
                />
                <TextInput
                  label="Genotype"
                  name="genotype"
                  value={formData.genotype}
                  onChange={handleInputChange}
                  disabled
                />
                <TextInput
                  label="Blood Group"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>
          </section>
        </form>

        <button
          className="!bg-blue-500 !text-gray-800 !px-4 !py-2 !rounded"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          DONE
        </button>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="!fixed !top-0 !left-0 !right-0 !bottom-0 !flex !items-center !justify-center !bg-gray-500 !bg-opacity-50 !z-50">
            <div className="!bg-white !rounded-lg !p-6 !w-[400px] !shadow-lg">
              <h3 className="!text-xl !font-semibold">Confirm Submission</h3>
              <p className="!mt-2 !text-sm">
                Are you sure you have entered the correct details?
              </p>
              <div className="!mt-4 !flex !justify-between">
                <button
                  onClick={handleProceed}
                  className="!bg-green-500 !text-gray-800 !px-4 !py-2 !rounded"
                >
                  YES
                </button>
                <button
                  onClick={handleGoBack}
                  className="!bg-red-500 !text-gray-800 !px-4 !py-2 !rounded"
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default QuestionnairePage;
