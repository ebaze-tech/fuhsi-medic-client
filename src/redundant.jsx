import React, { useState } from "react";
import API from "../api";
import "./index.css";
import { TextInput, YesNoRadioGroup, SelectInput } from "./components";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const QuestionnaireForm = () => {
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
  const [collapsedSections, setCollapsedSections] = useState({
    sectionA: false,
    sectionB: false,
    sectionC: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

    const requiredTextFields = [
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

    requiredTextFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()} is required`;
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
      alert(
        "Please ensure all required fields are filled and each YES/NO question has exactly one option selected."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await API.post("/generate-pdf", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "questionnaire.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const toggleSection = (section) => {
  //   setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  // };

  const handleReset = () => {
    // Reset form data to initial empty state
    setFormData({
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
      // Medical conditions - set all to false
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
      // Clinic staff fields
      height: "",
      weight: "",
      bmi: "",
      visualAcuityRight: "",
      visualAcuityLeft: "",
      bloodPressure: "",
      pulseRate: "",
      urine: "",
      albumin: "",
      sugar: "",
      genotype: "",
      bloodGroup: "",
    });

    // Reset any error states
    setErrors({});

    // Expand all sections by default
    setCollapsedSections({
      sectionA: false,
      sectionB: false,
      sectionC: false,
    });

    // Optional: Scroll to top of form after reset
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // <div className="flex flex-col justify-center items-center m-4 min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center justify-center w-full">
      {/* Header with university branding */}
      <div className="bg-blue-800 px-6 py-4">
        <h1 className="text-xl md:text-2xl font-bold text-center text-white">
          FEDERAL UNIVERSITY OF HEALTH SCIENCES, ILA ORANGUN
        </h1>
        <h2 className="text-sm md:text-base font-semibold text-center text-blue-100 mt-1">
          MEDICAL ENTRANCE SCREENING EXAMINATION FORM FOR STUDENTS
        </h2>
      </div>

      <div className="p-6 md:p-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
          <p className="text-xs md:text-sm text-gray-700">
            Student is requested to complete part I of this form, parts II & III
            will be completed by the designated officers at the University
            health center. The completed form should be forwarded to the Medical
            Director, University Health Services and archived in the students
            clinical folder.
          </p>
        </div>

        <form className="space-y-8">
          {/* Part I - Student Information */}
          <section className="space-y-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center mr-3">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                PART I: STUDENT INFORMATION
              </h3>
            </div>

            {/* Biodata Section */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 pl-2 border-l-2 border-blue-500">
                Biodata
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  error={errors.surname}
                  required
                />
                <TextInput
                  label="Other Names"
                  name="otherNames"
                  value={formData.otherNames}
                  onChange={handleInputChange}
                  error={errors.otherNames}
                  required
                />
                <TextInput
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  error={errors.age}
                  type="number"
                  required
                />
                <TextInput
                  label="Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  error={errors.dob}
                  type="date"
                  required
                />
                <SelectInput
                  label="Sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  error={errors.sex}
                  options={["Male", "Female", "Other"]}
                  required
                />
                <TextInput
                  label="Nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  error={errors.nationality}
                  required
                />
                <TextInput
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  error={errors.state}
                  required
                />
                <SelectInput
                  label="Marital Status"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  error={errors.maritalStatus}
                  options={["Single", "Married", "Divorced", "Widowed"]}
                  required
                />
                <TextInput
                  label="Faculty"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  error={errors.faculty}
                  required
                />
                <TextInput
                  label="Matric No"
                  name="matricNo"
                  value={formData.matricNo}
                  onChange={handleInputChange}
                  error={errors.matricNo}
                  required
                />
                <TextInput
                  label="Jamb Reg No"
                  name="jambRegNo"
                  value={formData.jambRegNo}
                  onChange={handleInputChange}
                  error={errors.jambRegNo}
                  required
                />
                <TextInput
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  error={errors.department}
                  required
                />
                <TextInput
                  label="Tel No"
                  name="telNo"
                  value={formData.telNo}
                  onChange={handleInputChange}
                  error={errors.telNo}
                  type="tel"
                  required
                />
                <SelectInput
                  label="Religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  error={errors.religion}
                  options={["Christianity", "Islam", "Traditional", "Other"]}
                  required
                />
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 pl-2 border-l-2 border-red-500">
                Emergency Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Name of Next of Kin"
                  name="nextOfKinName"
                  value={formData.nextOfKinName}
                  onChange={handleInputChange}
                  error={errors.nextOfKinName}
                  required
                />
                <TextInput
                  label="Relationship to Next of Kin"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  error={errors.relationship}
                  required
                />
                <TextInput
                  label="Address of Next of Kin"
                  name="nextOfKinAddress"
                  value={formData.nextOfKinAddress}
                  onChange={handleInputChange}
                  error={errors.nextOfKinAddress}
                  className="md:col-span-2"
                  required
                />
                <TextInput
                  label="Telephone No of Next of Kin"
                  name="nextOfKinTel"
                  value={formData.nextOfKinTel}
                  onChange={handleInputChange}
                  error={errors.nextOfKinTel}
                  type="tel"
                  required
                />
              </div>
            </div>
          </section>

          {/* Medical History Section */}
          <section className="space-y-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center mr-3">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                MEDICAL HISTORY
              </h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 pl-2 border-l-2 border-green-500">
                Answer each question by selecting YES or NO
              </h4>

              {/* Section A */}
              <Disclosure defaultOpen={!collapsedSections.sectionA}>
                {({ open }) => (
                  <div className="mb-6">
                    <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span className="font-semibold">
                        A) Do you suffer from or have you suffered from any of
                        the following?
                      </span>
                      {open ? (
                        <ChevronUpIcon className="w-5 h-5 text-blue-500" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-blue-500" />
                      )}
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-4 pt-4 pb-2">
                        <div className="border rounded-lg overflow-hidden">
                          <div className="grid grid-cols-[1fr_80px_80px] bg-gray-100 border-b font-medium text-sm">
                            <div className="p-3 text-gray-700">Condition</div>
                            <div className="text-center p-3 text-gray-700">
                              YES
                            </div>
                            <div className="text-center p-3 text-gray-700">
                              NO
                            </div>
                          </div>
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
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>

              {/* Section B */}
              <Disclosure defaultOpen={!collapsedSections.sectionB}>
                {({ open }) => (
                  <div className="mb-6">
                    <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span className="font-semibold">
                        B) Has any member of your family suffered from:
                      </span>
                      {open ? (
                        <ChevronUpIcon className="w-5 h-5 text-blue-500" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-blue-500" />
                      )}
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-4 pt-4 pb-2">
                        <div className="border rounded-lg overflow-hidden">
                          <div className="grid grid-cols-[1fr_80px_80px] bg-gray-100 border-b font-medium text-sm">
                            <div className="p-3 text-gray-700">Condition</div>
                            <div className="text-center p-3 text-gray-700">
                              YES
                            </div>
                            <div className="text-center p-3 text-gray-700">
                              NO
                            </div>
                          </div>
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
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>

              {/* Section C */}
              <Disclosure defaultOpen={!collapsedSections.sectionC}>
                {({ open }) => (
                  <div className="mb-6">
                    <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span className="font-semibold">
                        C) Have you been immunized against any of the following
                        diseases:
                      </span>
                      {open ? (
                        <ChevronUpIcon className="w-5 h-5 text-blue-500" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-blue-500" />
                      )}
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-4 pt-4 pb-2">
                        <div className="border rounded-lg overflow-hidden">
                          <div className="grid grid-cols-[1fr_80px_80px] bg-gray-100 border-b font-medium text-sm">
                            <div className="p-3 text-gray-700">Vaccine</div>
                            <div className="text-center p-3 text-gray-700">
                              YES
                            </div>
                            <div className="text-center p-3 text-gray-700">
                              NO
                            </div>
                          </div>
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
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>

              {/* Lifestyle Questions */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 pl-2 border-l-2 border-purple-500">
                  Lifestyle Information
                </h4>
                <YesNoRadioGroup
                  label="Do you currently use tobacco products such as cigarettes, snuff etc?"
                  yesName="tobaccoUseYes"
                  noName="tobaccoUseNo"
                  formData={formData}
                  onChange={handleRadioChange}
                  error={errors.tobaccoUseYes}
                  className="bg-white p-3 rounded-lg border border-gray-200"
                />
                <YesNoRadioGroup
                  label="Do you have someone at home/school/hostel who smokes when you are present?"
                  yesName="secondhandSmokeYes"
                  noName="secondhandSmokeNo"
                  formData={formData}
                  onChange={handleRadioChange}
                  error={errors.secondhandSmokeYes}
                  className="bg-white p-3 rounded-lg border border-gray-200"
                />
                <YesNoRadioGroup
                  label="Do you currently consume alcohol?"
                  yesName="alcoholConsumptionYes"
                  noName="alcoholConsumptionNo"
                  formData={formData}
                  onChange={handleRadioChange}
                  error={errors.alcoholConsumptionYes}
                  className="bg-white p-3 rounded-lg border border-gray-200"
                />

                {(formData.tobaccoUseYes ||
                  formData.secondhandSmokeYes ||
                  formData.alcoholConsumptionYes) && (
                  <TextInput
                    label="If the answer to any of the above is YES, provide details:"
                    name="tobaccoAlcoholDetails"
                    value={formData.tobaccoAlcoholDetails}
                    onChange={handleInputChange}
                    error={errors.tobaccoAlcoholDetails}
                    className="bg-white"
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
                  className="bg-white"
                  textarea
                />
              </div>
            </div>
          </section>

          {/* Parts II and III (For Clinic Staff) */}
          <section className="space-y-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center mr-3">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                CLINICAL EXAMINATION (For Clinic Staff Only)
              </h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 pl-2 border-l-2 border-yellow-500">
                Part II: Clinical Examination
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
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
                  label="Pulse rate (PR)"
                  name="pulseRate"
                  value={formData.pulseRate}
                  onChange={handleInputChange}
                  type="number"
                  disabled
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 pl-2 border-l-2 border-yellow-500">
                Part III: Laboratory Investigations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Form Submission */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset Form
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating PDF...
                </span>
              ) : (
                "Download PDF"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default QuestionnaireForm;
