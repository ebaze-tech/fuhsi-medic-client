import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";
import "./index.css";
import { TextInput, YesNoRadioGroup, SelectInput } from "./Components";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoadingSpinner = () => (
  <div className="!min-h-screen !flex !flex-col !items-center !justify-center !bg-gray-100 !p-4">
    <div className="!animate-spin !rounded-full !h-12 !w-12 !border-t-4 !border-blue-500 !border-solid"></div>
    <p className="!mt-4 !text-gray-700 !font-medium">Loading...</p>
  </div>
);

const UpdateQuestionnairePage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState(
    location.state?.formData || {
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
    }
  );

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const navigate = useNavigate();
  const { formId } = useParams();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setErrors("User not authenticated");
      logout();
      navigate("/admin/login");
      setLoading(false);
      return;
    }
    if (!location.state?.formData) {
      // Fetch existing data if needed
      const fetchFormData = async () => {
        try {
          const response = await API.get(`/dashboard/form/${formId}`);
          console.log("Single Form Data: ", response.data);
          setFormData(response.data);

          if (response.data.faculty) {
            const departments = facultyDepartments[response.data.faculty] || [];
            setAvailableDepartments(departments);
          }
        } catch (error) {
          console.error("Error fetching form data:", error);
          setErrors(
            error.response?.data?.message || "Failed to load form data"
          );
        } finally {
          setLoading(false);
        }
      };
      fetchFormData();
    } else {
      setLoading(false);
    }
  }, [formId, isAuthenticated, location.state?.formData]);

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

    const requiredtextFields = [
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
      // "height",
      // "weight",
      // "bmi",
      // "visualAcuityRight",
      // "visualAcuityLeft",
      // "bloodPressure",
      // "pulseRate",
      // "urine",
      // "albumin",
      // "sugar",
      // "genotype",
      // "bloodGroup",
    ];

    requiredtextFields.forEach((field) => {
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
      alert("Please ensure all required fields are filled");
      return;
    }
    setShowConfirmation(true);
  };

  const handleUpdate = async () => {
    if (!user) {
      return <p className="!text-red-800 !font-bold">User not authenticated</p>;
    }
    setShowConfirmation(false);
    setIsSubmitting(true);
    try {
      const update = await API.put(`/questionnaire/${formId}/update`, formData);
      console.log(update.data);

      const pdfResponse = await API.get(
        `/questionnaire/admin/${formId}/download`,
        { responseType: "blob" }
      );

      const pdfBlob = new Blob([pdfResponse.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = `medical_form-${formData.matricNo || formId}-${
        formData.surname
      }-${formData.otherNames}.pdf`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(pdfUrl);
      navigate("/completed-page");
    } catch (error) {
      console.error("Error updating form:", error);
      alert("Error updating form. Please try again.");
      setErrors(
        error.response?.data?.message ||
          "Error updating form. Refresh the page F"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const facultyDepartments = {
    "Basic Medical Sciences": ["Medicine and Surgery", "Pharmacology"],
    Science: ["Biochemistry", "Microbiology", "Biotechnology"],
    "Allied Health Sciences": ["Nursing Science", "Medical Laboratory Science"],
  };

  if (loading) {
    return (
      <div className="!min-h-screen !bg-gray-100 !p-4 sm:!p-8">Loading...</div>
    );
  }

  return (
    <main className="!bg-white !min-h-screen !flex !flex-col !items-center !py-10 !px-4">
      <div className="!w-full !max-w-4xl !flex !flex-col !gap-8">
        <header className="!bg-gray-50 !rounded-xl !py-6 !px-6 shadow-md !text-center !border !border-gray-200">
          <h1 className="!text-2xl !md:text-3xl !font-bold !text-gray-900">
            UPDATE MEDICAL SCREENING FORM
          </h1>
          <h2 className="!text-sm !md:text-base !font-medium !text-gray-800 !mt-2">
            Federal University of Health Sciences, Ila Orangun
          </h2>
        </header>

        <form className="!bg-white !px-8 !py-8 !sm:p-10 !border-[1.5px] !border-gray-800 !rounded-none !space-y-12 !shadow-sm">
          {/* Student Information Section */}
          <section className="!space-y-6">
            <h3 className="!text-xl !md:text-2xl !font-bold !text-gray-800 !border-b !pb-2">
              PART I: Student Information
            </h3>
            <div className="!bg-gray-50 !p-6 !rounded-lg !border !border-gray-200 !shadow-sm">
              <div className="!grid !grid-cols-1 !md:grid-cols-2 !gap-6 !py-4">
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
                  type="text"
                  value={formData.age}
                  onChange={handleInputChange}
                  error={errors.age}
                  required
                />
                <TextInput
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  error={errors.dob}
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
                <TextInput
                  label="Matric No"
                  name="matricNo"
                  value={formData.matricNo}
                  onChange={handleInputChange}
                  error={errors.matricNo}
                  required
                />
                <TextInput
                  label="JAMB Reg No"
                  name="jambRegNo"
                  value={formData.jambRegNo}
                  onChange={handleInputChange}
                  error={errors.jambRegNo}
                  required
                />{" "}
                <TextInput
                  label="Phone Number"
                  name="telNo"
                  type="tel"
                  value={formData.telNo}
                  onChange={handleInputChange}
                  error={errors.telNo}
                  required
                />{" "}
                <SelectInput
                  label="Religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  error={errors.religion}
                  options={["Christianity", "Islam", "Traditional", "Other"]}
                  required
                />{" "}
                <TextInput
                  label="Name of Next of Kin"
                  name="nextOfKinName"
                  value={formData.nextOfKinName}
                  onChange={handleInputChange}
                  error={errors.nextOfKinName}
                  required
                />{" "}
                <TextInput
                  label="Relationship to Next of Kin"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  error={errors.relationship}
                  required
                />{" "}
                <TextInput
                  label="Address of Next of Kin"
                  name="nextOfKinAddress"
                  value={formData.nextOfKinAddress}
                  onChange={handleInputChange}
                  error={errors.nextOfKinAddress}
                  required
                />{" "}
                <TextInput
                  label="Telephone No of Next of Kin"
                  name="nextOfKinTel"
                  type="tel"
                  value={formData.nextOfKinTel}
                  onChange={handleInputChange}
                  error={errors.nextOfKinTel}
                  required
                />
              </div>
            </div>
          </section>

          {/* Medical History Sections */}
          {/* Keep all the medical history sections from original */}
          {/* Make sure to remove any props on inputs */}
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
                  type="text"
                  error={errors.height}
                />
                <TextInput
                  label="Weight (kg)"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  type="text"
                  error={errors.weight}
                />
                <TextInput
                  label="BMI"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleInputChange}
                  type="text"
                  error={errors.bmi}
                />
                <div className="!md:col-span-2 !grid !grid-cols-2 !gap-4">
                  <TextInput
                    label="Visual Acuity (R)"
                    name="visualAcuityRight"
                    value={formData.visualAcuityRight}
                    onChange={handleInputChange}
                    type="text"
                    error={errors.visualAcuityRight}
                  />
                  <TextInput
                    label="Visual Acuity (L)"
                    name="visualAcuityLeft"
                    value={formData.visualAcuityLeft}
                    onChange={handleInputChange}
                    type="text"
                    error={errors.visualAcuityLeft}
                  />
                </div>
                <TextInput
                  label="Blood Pressure (BP)"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  type="text"
                  error={errors.bloodPressure}
                />
                <TextInput
                  label="Pulse Rate (PR)"
                  name="pulseRate"
                  value={formData.pulseRate}
                  onChange={handleInputChange}
                  type="text"
                  error={errors.pulseRate}
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
                  type="text"
                  error={errors.urine}
                />
                <TextInput
                  label="Albumin"
                  name="albumin"
                  value={formData.albumin}
                  onChange={handleInputChange}
                  type="text"
                  error={errors.albumin}
                />
                <TextInput
                  label="Sugar"
                  name="sugar"
                  value={formData.sugar}
                  onChange={handleInputChange}
                  type="text"
                  error={errors.sugar}
                />
                <TextInput
                  label="Genotype"
                  name="genotype"
                  value={formData.genotype}
                  onChange={handleInputChange}
                  error={errors.genotype}
                />
                <TextInput
                  label="Blood Group"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  type="text"
                  error={errors.bloodGroup}
                />
              </div>
            </div>
          </section>
          {/* Submit Button */}
          <div className="!flex !justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="!px-8 !py-3 !bg-blue-600 !text-white !font-medium !rounded-lg hover:!bg-blue-700 !transition-all"
            >
              {isSubmitting ? "Updating..." : "Update Form"}
            </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="!fixed !top-0 !left-0 !right-0 !bottom-0 !flex !items-center !justify-center !bg-gray-500 !bg-opacity-50 !z-50">
            <div className="!bg-white !rounded-lg !p-6 !w-[400px] !shadow-lg">
              <h3 className="!text-xl !font-semibold">Confirm Update</h3>
              <p className="!mt-2 !text-sm">
                Are you sure you want to update this form?
              </p>
              <div className="!mt-4 !flex !justify-between">
                <button
                  onClick={handleUpdate}
                  className="!bg-green-500 !text-white !px-4 !py-2 !rounded"
                >
                  YES, UPDATE
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="!bg-red-500 !text-white !px-4 !py-2 !rounded"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default UpdateQuestionnairePage;
