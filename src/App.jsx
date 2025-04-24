import React, { useState } from 'react';
import API from "../api"

const QuestionnaireForm = () => {
  // Initialize formData with empty values
  const [formData, setFormData] = useState({
    surname: '',
    otherNames: '',
    age: '',
    dob: '',
    sex: '',
    nationality: '',
    state: '',
    maritalStatus: '',
    faculty: '',
    matricNo: '',
    jambRegNo: '',
    department: '',
    telNo: '',
    religion: '',
    nextOfKinName: '',
    relationship: '',
    nextOfKinAddress: '',
    nextOfKinTel: '',
    // Section A
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
    // Section B
    familyTuberculosisYes: false,
    familyTuberculosisNo: false,
    familyMentalIllnessYes: false,
    familyMentalIllnessNo: false,
    familyDiabetesYes: false,
    familyDiabetesNo: false,
    familyHeartDiseaseYes: false,
    familyHeartDiseaseNo: false,
    // Section C
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
    // Additional Questions
    tobaccoUseYes: false,
    tobaccoUseNo: false,
    secondhandSmokeYes: false,
    secondhandSmokeNo: false,
    alcoholConsumptionYes: false,
    alcoholConsumptionNo: false,
    tobaccoAlcoholDetails: '',
    otherMedicalInfo: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input changes for editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate text fields (biodata)
    const requiredTextFields = [
      'surname', 'otherNames', 'age', 'dob', 'sex', 'nationality', 'state',
      'maritalStatus', 'faculty', 'matricNo', 'jambRegNo', 'department',
      'telNo', 'religion', 'nextOfKinName', 'relationship', 'nextOfKinAddress',
      'nextOfKinTel',
    ];

    requiredTextFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
      }
    });

    // Validate checkbox pairs (exactly one of YES or NO must be checked)
   /* const checkboxPairs = [
      // Section A
      { yes: 'tuberculosisYes', no: 'tuberculosisNo', label: 'Tuberculosis' },
      { yes: 'asthmaYes', no: 'asthmaNo', label: 'Asthma' },
      { yes: 'pepticUlcerYes', no: 'pepticUlcerNo', label: 'Peptic Ulcer Disease' },
      { yes: 'sickleCellYes', no: 'sickleCellNo', label: 'Sickle Cell Disease' },
      { yes: 'allergiesYes', no: 'allergiesNo', label: 'Allergies' },
      { yes: 'diabetesYes', no: 'diabetesNo', label: 'Diabetes' },
      { yes: 'hypertensionYes', no: 'hypertensionNo', label: 'Hypertension' },
      { yes: 'seizuresYes', no: 'seizuresNo', label: 'Seizures/Convulsions' },
      { yes: 'mentalIllnessYes', no: 'mentalIllnessNo', label: 'Mental Illness' },
      // Section B
      { yes: 'familyTuberculosisYes', no: 'familyTuberculosisNo', label: 'Family Tuberculosis' },
      { yes: 'familyMentalIllnessYes', no: 'familyMentalIllnessNo', label: 'Family Mental Illness' },
      { yes: 'familyDiabetesYes', no: 'familyDiabetesNo', label: 'Family Diabetes Mellitus' },
      { yes: 'familyHeartDiseaseYes', no: 'familyHeartDiseaseNo', label: 'Family Heart Disease' },
      // Section C
      { yes: 'smallpoxYes', no: 'smallpoxNo', label: 'Small Pox Immunization' },
      { yes: 'poliomyelitisYes', no: 'poliomyelitisNo', label: 'Poliomyelitis Immunization' },
      { yes: 'immunizationTuberculosisYes', no: 'immunizationTuberculosisNo', label: 'Tuberculosis Immunization' },
      { yes: 'meningitisYes', no: 'meningitisNo', label: 'Meningitis Immunization' },
      { yes: 'hepatitisBYes', no: 'hepatitisBNo', label: 'Hepatitis B Immunization' },
      // Additional Questions
      { yes: 'tobaccoUseYes', no: 'tobaccoUseNo', label: 'Tobacco Use' },
      { yes: 'secondhandSmokeYes', no: 'secondhandSmokeNo', label: 'Secondhand Smoke Exposure' },
      { yes: 'alcoholConsumptionYes', no: 'alcoholConsumptionNo', label: 'Alcohol Consumption' },
    ];

    // Add HPV validation for females
    if (formData.sex === 'Female') {
      checkboxPairs.push({ yes: 'hpvYes', no: 'hpvNo', label: 'HPV Immunization' });
    }

    checkboxPairs.forEach(pair => {
      if (formData[pair.yes] === formData[pair.no]) { // Either both true or both false
        newErrors[pair.yes] = `Please select exactly one option (YES or NO) for ${pair.label}`;
      }
    });

    // Validate tobacco/alcohol details if any of the related questions are YES
    if (formData.tobaccoUseYes || formData.secondhandSmokeYes || formData.alcoholConsumptionYes) {
      if (!formData.tobaccoAlcoholDetails) {
        newErrors.tobaccoAlcoholDetails = 'Details are required if any of the above (tobacco, secondhand smoke, alcohol) is YES';
      }
    }*/

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please ensure all required fields are filled and each YES/NO question has exactly one option selected.');
      return;
    }

    try {
      const response = await API.post('/generate-pdf', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'questionnaire.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Helvetica, sans-serif' }}>
      <h1 style={{ fontSize: '14px', textAlign: 'center', fontWeight: 'bold' }}>
        FEDERAL UNIVERSITY OF HEALTH SCIENCES, ILA ORANGUN
      </h1>
      <h2 style={{ fontSize: '12px', textAlign: 'center', fontWeight: 'bold' }}>
        MEDICAL ENTRANCE SCREENING EXAMINATION FORM FOR STUDENTS
      </h2>
      <div style={{ marginBottom: '10px', fontSize: '10px', textAlign: 'justify' }}>
        Student is requested to complete part I of this form, parts II&III will be completed by the designated officers at the University health center. The completed form should be forwarded to the Medical Director, University Health Services and archived in the students clinical folder.
      </div>

      <form onSubmit={handleSubmit}>
        <h3 style={{ fontSize: '12px', fontWeight: 'bold', textDecoration: 'underline' }}>PART I</h3>

        <div style={{ fontSize: '10px', marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>
            Surname: <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '70%' }} />
          </label>
          hjvdfbksfafjdakf
          {errors.surname && <span style={{ color: 'red' }}>{errors.surname}</span>}

          <label style={{ display: 'block' }}>
            Other Names: <input type="text" name="otherNames" value={formData.otherNames} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '70%' }} />
          </label>
          {errors.otherNames && <span style={{ color: 'red' }}>{errors.otherNames}</span>}

          <label style={{ display: 'block' }}>
            Age: <input type="text" name="age" value={formData.age} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '15%' }} />
            Date of Birth: <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '20%' }} />
            Sex: <input type="text" name="sex" value={formData.sex} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '15%' }} />
          </label>
          {(errors.age || errors.dob || errors.sex) && (
            <span style={{ color: 'red' }}>
              {errors.age || ''} {errors.dob || ''} {errors.sex || ''}
            </span>
          )}

          <label style={{ display: 'block' }}>
            Nationality: <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '20%' }} />
            State: <input type="text" name="state" value={formData.state} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '20%' }} />
          </label>
          {(errors.nationality || errors.state) && (
            <span style={{ color: 'red' }}>
              {errors.nationality || ''} {errors.state || ''}
            </span>
          )}

          <label style={{ display: 'block' }}>
            Marital Status: <input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '20%' }} />
            Faculty: <input type="text" name="faculty" value={formData.faculty} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '20%' }} />
          </label>
          {(errors.maritalStatus || errors.faculty) && (
            <span style={{ color: 'red' }}>
              {errors.maritalStatus || ''} {errors.faculty || ''}
            </span>
          )}

          <label style={{ display: 'block' }}>
            Matric No: <input type="text" name="matricNo" value={formData.matricNo} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '20%' }} />
            Jamb Reg No: <input type="text" name="jambRegNo" value={formData.jambRegNo} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '20%' }} />
            Department: <input type="text" name="department" value={formData.department} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '20%' }} />
          </label>
          {(errors.matricNo || errors.jambRegNo || errors.department) && (
            <span style={{ color: 'red' }}>
              {errors.matricNo || ''} {errors.jambRegNo || ''} {errors.department || ''}
            </span>
          )}

          <label style={{ display: 'block' }}>
            Tel No: <input type="text" name="telNo" value={formData.telNo} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '20%' }} />
            Religion: <input type="text" name="religion" value={formData.religion} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '20%' }} />
          </label>
          {(errors.telNo || errors.religion) && (
            <span style={{ color: 'red' }}>
              {errors.telNo || ''} {errors.religion || ''}
            </span>
          )}
        </div>

        <div style={{ fontSize: '10px', marginBottom: '10px' }}>
          <h4 style={{ fontWeight: 'normal' }}>For Emergencies:</h4>
          <label style={{ display: 'block' }}>
            Name of Next of Kin: <input type="text" name="nextOfKinName" value={formData.nextOfKinName} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '70%' }} />
          </label>
          {errors.nextOfKinName && <span style={{ color: 'red' }}>{errors.nextOfKinName}</span>}

          <label style={{ display: 'block' }}>
            Relationship to Next of Kin: <input type="text" name="relationship" value={formData.relationship} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '70%' }} />
          </label>
          {errors.relationship && <span style={{ color: 'red' }}>{errors.relationship}</span>}

          <label style={{ display: 'block' }}>
            Address of Next of Kin: <input type="text" name="nextOfKinAddress" value={formData.nextOfKinAddress} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '70%' }} />
          </label>
          {errors.nextOfKinAddress && <span style={{ color: 'red' }}>{errors.nextOfKinAddress}</span>}

          <label style={{ display: 'block' }}>
            Telephone No of Next of Kin: <input type="text" name="nextOfKinTel" value={formData.nextOfKinTel} onChange={handleInputChange} style={{ border: 'none', borderBottom: '1px dotted black', width: '70%' }} />
          </label>
          {errors.nextOfKinTel && <span style={{ color: 'red' }}>{errors.nextOfKinTel}</span>}
        </div>

        <div style={{ fontSize: '10px', marginBottom: '10px' }}>
          <h4 style={{ textDecoration: 'underline', fontWeight: 'normal' }}>
            Answer each question by placing a check (√) mark
          </h4>

          {/* Section A */}
          <h4 style={{ fontWeight: 'normal' }}>
            A) Do you suffer from or have you suffered from any of the following?
          </h4>

          <div style={{ marginBottom: '10px' }}>
            <div>
              <label>a. Tuberculosis</label>
              <label>YES <input type="checkbox" checked={formData.tuberculosisYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.tuberculosisNo} disabled /></label>
              {errors.tuberculosisYes && <span style={{ color: 'red' }}>{errors.tuberculosisYes}</span>}
            </div>
            <div>
              <label>b. Asthma</label>
              <label>YES <input type="checkbox" checked={formData.asthmaYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.asthmaNo} disabled /></label>
              {errors.asthmaYes && <span style={{ color: 'red' }}>{errors.asthmaYes}</span>}
            </div>
            <div>
              <label>c. Peptic Ulcer Disease</label>
              <label>YES <input type="checkbox" checked={formData.pepticUlcerYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.pepticUlcerNo} disabled /></label>
              {errors.pepticUlcerYes && <span style={{ color: 'red' }}>{errors.pepticUlcerYes}</span>}
            </div>
            <div>
              <label>d. Sickle cell disease</label>
              <label>YES <input type="checkbox" checked={formData.sickleCellYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.sickleCellNo} disabled /></label>
              {errors.sickleCellYes && <span style={{ color: 'red' }}>{errors.sickleCellYes}</span>}
            </div>
            <div>
              <label>e. Allergies</label>
              <label>YES <input type="checkbox" checked={formData.allergiesYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.allergiesNo} disabled /></label>
              {errors.allergiesYes && <span style={{ color: 'red' }}>{errors.allergiesYes}</span>}
            </div>
            <div>
              <label>f. Diabetes</label>
              <label>YES <input type="checkbox" checked={formData.diabetesYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.diabetesNo} disabled /></label>
              {errors.diabetesYes && <span style={{ color: 'red' }}>{errors.diabetesYes}</span>}
            </div>
            <div>
              <label>g. Hypertension</label>
              <label>YES <input type="checkbox" checked={formData.hypertensionYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.hypertensionNo} disabled /></label>
              {errors.hypertensionYes && <span style={{ color: 'red' }}>{errors.hypertensionYes}</span>}
            </div>
            <div>
              <label>h. Seizures/Convulsions</label>
              <label>YES <input type="checkbox" checked={formData.seizuresYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.seizuresNo} disabled /></label>
              {errors.seizuresYes && <span style={{ color: 'red' }}>{errors.seizuresYes}</span>}
            </div>
            <div>
              <label>i. Mental illness</label>
              <label>YES <input type="checkbox" checked={formData.mentalIllnessYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.mentalIllnessNo} disabled /></label>
              {errors.mentalIllnessYes && <span style={{ color: 'red' }}>{errors.mentalIllnessYes}</span>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '300px 50px 50px', border: '1px solid black' }}>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid black', padding: '5px' }}></div>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>YES</div>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>NO</div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>a. Tuberculosis</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.tuberculosisYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.tuberculosisNo ? '√' : ''}
            </div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>b. Asthma</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.asthmaYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.asthmaNo ? '√' : ''}
            </div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>c. Peptic Ulcer Disease</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.pepticUlcerYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.pepticUlcerNo ? '√' : ''}
            </div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>d. Sickle cell disease</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.sickleCellYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.sickleCellNo ? '√' : ''}
            </div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>e. Allergies</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.allergiesYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.allergiesNo ? '√' : ''}
            </div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>f. Diabetes</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.diabetesYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.diabetesNo ? '√' : ''}
            </div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>g. Hypertension</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.hypertensionYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.hypertensionNo ? '√' : ''}
            </div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>h. Seizures/Convulsions</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.seizuresYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.seizuresNo ? '√' : ''}
            </div>

            <div style={{ padding: '5px' }}>i. Mental illness</div>
            <div style={{ borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.mentalIllnessYes ? '√' : ''}
            </div>
            <div style={{ borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.mentalIllnessNo ? '√' : ''}
            </div>
          </div>

          {/* Section B */}
          <h4 style={{ fontWeight: 'normal', marginTop: '10px' }}>
            B) Has any member of your family suffered from:
          </h4>

          <div style={{ marginBottom: '10px' }}>
            <div>
              <label>1. Tuberculosis</label>
              <label>YES <input type="checkbox" checked={formData.familyTuberculosisYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.familyTuberculosisNo} disabled /></label>
              {errors.familyTuberculosisYes && <span style={{ color: 'red' }}>{errors.familyTuberculosisYes}</span>}
            </div>
            <div>
              <label>2. Mental illness or insanity</label>
              <label>YES <input type="checkbox" checked={formData.familyMentalIllnessYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.familyMentalIllnessNo} disabled /></label>
              {errors.familyMentalIllnessYes && <span style={{ color: 'red' }}>{errors.familyMentalIllnessYes}</span>}
            </div>
            <div>
              <label>3. Diabetes Mellitus</label>
              <label>YES <input type="checkbox" checked={formData.familyDiabetesYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.familyDiabetesNo} disabled /></label>
              {errors.familyDiabetesYes && <span style={{ color: 'red' }}>{errors.familyDiabetesYes}</span>}
            </div>
            <div>
              <label>4. Heart Disease</label>
              <label>YES <input type="checkbox" checked={formData.familyHeartDiseaseYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.familyHeartDiseaseNo} disabled /></label>
              {errors.familyHeartDiseaseYes && <span style={{ color: 'red' }}>{errors.familyHeartDiseaseYes}</span>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '300px 50px 50px', border: '1px solid black' }}>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid black', padding: '5px' }}></div>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>YES</div>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>NO</div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>1. Tuberculosis</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.familyTuberculosisYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.familyTuberculosisNo ? '√' : ''}
            </div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>2. Mental illness or insanity</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.familyMentalIllnessYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.familyMentalIllnessNo ? '√' : ''}
            </div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>3. Diabetes Mellitus</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.familyDiabetesYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.familyDiabetesNo ? '√' : ''}
            </div>

            <div style={{ padding: '5px' }}>4. Heart Disease</div>
            <div style={{ borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.familyHeartDiseaseYes ? '√' : ''}
            </div>
            <div style={{ borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.familyHeartDiseaseNo ? '√' : ''}
            </div>
          </div>

          {/* Section C */}
          <h4 style={{ fontWeight: 'normal', marginTop: '10px' }}>
            C) Have you been immunized against any of the following diseases:
          </h4>

          <div style={{ marginBottom: '10px' }}>
            <div>
              <label>1. Small pox</label>
              <label>YES <input type="checkbox" checked={formData.smallpoxYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.smallpoxNo} disabled /></label>
              {errors.smallpoxYes && <span style={{ color: 'red' }}>{errors.smallpoxYes}</span>}
            </div>
            <div>
              <label>2. Poliomyelitis</label>
              <label>YES <input type="checkbox" checked={formData.poliomyelitisYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.poliomyelitisNo} disabled /></label>
              {errors.poliomyelitisYes && <span style={{ color: 'red' }}>{errors.poliomyelitisYes}</span>}
            </div>
            <div>
              <label>3. Tuberculosis</label>
              <label>YES <input type="checkbox" checked={formData.immunizationTuberculosisYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.immunizationTuberculosisNo} disabled /></label>
              {errors.immunizationTuberculosisYes && <span style={{ color: 'red' }}>{errors.immunizationTuberculosisYes}</span>}
            </div>
            <div>
              <label>4. Meningitis</label>
              <label>YES <input type="checkbox" checked={formData.meningitisYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.meningitisNo} disabled /></label>
              {errors.meningitisYes && <span style={{ color: 'red' }}>{errors.meningitisYes}</span>}
            </div>
            {formData.sex === 'Female' && (
              <div>
                <label>5. Human Papilloma Virus (for females only)</label>
                <label>YES <input type="checkbox" checked={formData.hpvYes} disabled /></label>
                <label>NO <input type="checkbox" checked={formData.hpvNo} disabled /></label>
                {errors.hpvYes && <span style={{ color: 'red' }}>{errors.hpvYes}</span>}
              </div>
            )}
            <div>
              <label>{formData.sex === 'Female' ? '6.' : '5.'} Hepatitis B</label>
              <label>YES <input type="checkbox" checked={formData.hepatitisBYes} disabled /></label>
              <label>NO <input type="checkbox" checked={formData.hepatitisBNo} disabled /></label>
              {errors.hepatitisBYes && <span style={{ color: 'red' }}>{errors.hepatitisBYes}</span>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '300px 50px 50px', border: '1px solid black' }}>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid black', padding: '5px' }}></div>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>YES</div>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>NO</div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>1. Small pox</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.smallpoxYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.smallpoxNo ? '√' : ''}
            </div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>2. Poliomyelitis</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.poliomyelitisYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.poliomyelitisNo ? '√' : ''}
            </div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>3. Tuberculosis</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.immunizationTuberculosisYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.immunizationTuberculosisNo ? '√' : ''}
            </div>

            <div style={{ borderBottom: '1px solid black', padding: '5px' }}>4. Meningitis</div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.meningitisYes ? '√' : ''}
            </div>
            <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.meningitisNo ? '√' : ''}
            </div>

            {formData.sex === 'Female' && (
              <>
                <div style={{ borderBottom: '1px solid black', padding: '5px' }}>5. Human Papilloma Virus (for females only)</div>
                <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
                  {formData.hpvYes ? '√' : ''}
                </div>
                <div style={{ borderBottom: '1px solid black', borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
                  {formData.hpvNo ? '√' : ''}
                </div>
              </>
            )}

            <div style={{ padding: '5px' }}>{formData.sex === 'Female' ? '6.' : '5.'} Hepatitis B</div>
            <div style={{ borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.hepatitisBYes ? '√' : ''}
            </div>
            <div style={{ borderLeft: '1px solid black', textAlign: 'center', padding: '5px' }}>
              {formData.hepatitisBNo ? '√' : ''}
            </div>
          </div>

          {/* Additional Questions */}
          <div style={{ marginTop: '10px' }}>
            <label>Do you currently use tobacco products such as cigarettes, snuff etc?</label>
            <label>YES <input type="checkbox" checked={formData.tobaccoUseYes} disabled /></label>
            <label>NO <input type="checkbox" checked={formData.tobaccoUseNo} disabled /></label>
            {errors.tobaccoUseYes && <span style={{ color: 'red' }}>{errors.tobaccoUseYes}</span>}
          </div>

          <div>
            <label>Do you have someone at home/school/hostel who smokes when you are present?</label>
            <label>YES <input type="checkbox" checked={formData.secondhandSmokeYes} disabled /></label>
            <label>NO <input type="checkbox" checked={formData.secondhandSmokeNo} disabled /></label>
            {errors.secondhandSmokeYes && <span style={{ color: 'red' }}>{errors.secondhandSmokeYes}</span>}
          </div>

          <div>
            <label>Do you currently consume alcohol?</label>
            <label>YES <input type="checkbox" checked={formData.alcoholConsumptionYes} disabled /></label>
            <label>NO <input type="checkbox" checked={formData.alcoholConsumptionNo} disabled /></label>
            {errors.alcoholConsumptionYes && <span style={{ color: 'red' }}>{errors.alcoholConsumptionYes}</span>}
          </div>

          {(formData.tobaccoUseYes || formData.secondhandSmokeYes || formData.alcoholConsumptionYes) && (
            <div>
              <label>If the answer to any of the above is YES, provide details:</label>
              <input type="text" value={formData.tobaccoAlcoholDetails} readOnly style={{ border: 'none', borderBottom: '1px dotted black', width: '70%' }} />
              {errors.tobaccoAlcoholDetails && <span style={{ color: 'red' }}>{errors.tobaccoAlcoholDetails}</span>}
            </div>
          )}

          <div style={{ marginTop: '10px' }}>
            <label>If there is any other medical information not stated above, please provide details:</label>
            <input type="text" value={formData.otherMedicalInfo} readOnly style={{ border: 'none', borderBottom: '1px dotted black', width: '70%' }} />
          </div>
        </div>

        {/* Part II and Part III (Placeholders) */}
        <h3 style={{ fontSize: '12px', fontWeight: 'bold', textDecoration: 'underline', marginTop: '20px' }}>
          Part II Clinical Examination: (To be completed by clinic staff)
        </h3>
        <div style={{ fontSize: '10px', marginBottom: '10px' }}>
          <label>(a) Height: _________ (b) Weight: _________ (c) BMI: _________</label><br />
          <label>(d) Visual Acuity (R) _________ (L) _________</label><br />
          <label>(e) Blood Pressure (BP): _________ (f) Pulse rate (PR): _________</label>
        </div>

        <h3 style={{ fontSize: '12px', fontWeight: 'bold', textDecoration: 'underline', marginTop: '20px' }}>
          Part III Laboratory Investigations: (To be completed by clinic staff)
        </h3>
        <div style={{ fontSize: '10px', marginBottom: '10px' }}>
          <label>Urine</label><br />
          <label>Albumin _________</label><br />
          <label>Sugar _________</label><br />
          <label>Genotype _________</label><br />
          <label>Blood Group _________</label>
        </div>

        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>Download PDF</button>
      </form>
    </div>
  );
};

export default QuestionnaireForm;