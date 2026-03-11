"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, AlertCircle, CheckCircle2, Upload, FileText, Shield, Users, UserCircle, QrCode } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  fullName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  email: string;
  ssdRank: string;
  arrivingDate: string;
  aadhaarCardNumber: string;
  aadhaarFile: File | null;
  passportPhoto: File | null;
  // Address fields
  village: string;
  tehsil: string;
  district: string;
  state: string;
  stateCode: string;
  fullAddress: string;
  pincode: string;
  panCardNumber: string;
  panFile: File | null;
  voterIdNumber: string;
  voterIdFile: File | null;
  isSsdMember: string;
  ssdMembershipId: string;
  hearAboutEvent: string;
  roleInEvent: string;
  specialSkills: string;
  dietaryPreferences: string;
  accessibilityNeeds: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  consentGiven: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const SSD_RANKS = [
  "Sainik (Soldier)",
  "Up-Sainik (Senior Soldier)",
  "Dav-Prahari (Guard)",
  "Mah-Insaaf (Great Justice)",
  "Senaapati (Commander)",
  "Utthan-Sevak (Liberation Server)",
  "Sangathan Mantri (Organizing Secretary)",
  "Prabhari (In-Charge)",
  "President",
  "Vice President",
  "Secretary",
  "Joint Secretary",
  "Treasurer",
  "Other",
  "Not a Member"
];

const INDIAN_STATES = [
  { name: "Delhi", code: "DL" },
  { name: "Maharashtra", code: "MH" },
  { name: "Punjab", code: "PB" },
  { name: "Uttar Pradesh", code: "UP" },
  { name: "Haryana", code: "HR" },
  { name: "Rajasthan", code: "RJ" },
  { name: "Madhya Pradesh", code: "MP" },
  { name: "Gujarat", code: "GJ" },
  { name: "Karnataka", code: "KA" },
  { name: "Tamil Nadu", code: "TN" },
  { name: "Kerala", code: "KL" },
  { name: "West Bengal", code: "WB" },
  { name: "Bihar", code: "BR" },
  { name: "Jharkhand", code: "JH" },
  { name: "Odisha", code: "OR" },
  { name: "Assam", code: "AS" },
  { name: "Other", code: "OT" },
];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_PHOTO_SIZE = 500 * 1024; // 500KB for passport photo
const VALID_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export default function AmbedkarJayantiRegistration() {
  const router = useRouter();
  const registerMutation = useMutation(api.ambedkarJayanti.registerForAmbedkarJayanti);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentSection, setCurrentSection] = useState(1);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    email: "",
    ssdRank: "",
    arrivingDate: "",
    aadhaarCardNumber: "",
    aadhaarFile: null,
    passportPhoto: null,
    village: "",
    tehsil: "",
    district: "",
    state: "",
    stateCode: "DL",
    fullAddress: "",
    pincode: "",
    panCardNumber: "",
    panFile: null,
    voterIdNumber: "",
    voterIdFile: null,
    isSsdMember: "",
    ssdMembershipId: "",
    hearAboutEvent: "",
    roleInEvent: "",
    specialSkills: "",
    dietaryPreferences: "",
    accessibilityNeeds: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    consentGiven: false,
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateSection = (section: number): boolean => {
    const newErrors: FormErrors = {};

    if (section === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile Number is required";
      else if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = "Enter valid 10-digit mobile number";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter valid email";
      if (!formData.aadhaarCardNumber.trim()) newErrors.aadhaarCardNumber = "Aadhaar Number is required";
      else if (!/^\d{12}$/.test(formData.aadhaarCardNumber)) newErrors.aadhaarCardNumber = "Enter valid 12-digit Aadhaar";
      if (!formData.aadhaarFile) newErrors.aadhaarFile = "Aadhaar File upload is required";
    }

    if (section === 2) {
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.village.trim()) newErrors.village = "Village is required";
      if (!formData.tehsil.trim()) newErrors.tehsil = "Tehsil is required";
      if (!formData.district.trim()) newErrors.district = "District is required";
      if (!formData.fullAddress.trim()) newErrors.fullAddress = "Full Address is required";
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Enter valid 6-digit pincode";
    }

    if (section === 3) {
      if (!formData.isSsdMember) newErrors.isSsdMember = "Please select";
      if (formData.isSsdMember === "Yes" && !formData.ssdMembershipId.trim()) {
        newErrors.ssdMembershipId = "Membership ID is required";
      }
      if (!formData.hearAboutEvent) newErrors.hearAboutEvent = "Please select an option";
      if (!formData.roleInEvent) newErrors.roleInEvent = "Please select a role";
      if (!formData.specialSkills.trim()) newErrors.specialSkills = "Please specify your skills/interests";
      if (!formData.dietaryPreferences) newErrors.dietaryPreferences = "Please select dietary preference";
    }

    if (section === 4) {
      if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = "Emergency contact name is required";
      if (!formData.emergencyContactNumber.trim()) newErrors.emergencyContactNumber = "Emergency contact number is required";
      else if (!/^\d{10}$/.test(formData.emergencyContactNumber)) newErrors.emergencyContactNumber = "Enter valid 10-digit number";
      if (!formData.consentGiven) newErrors.consentGiven = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSection((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentSection((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateFile = (file: File, maxSize: number = MAX_FILE_SIZE, isPhoto: boolean = false): string | null => {
    if (file.size > maxSize) {
      return `File must be under ${maxSize === MAX_PHOTO_SIZE ? '500KB' : '2MB'}`;
    }
    const validTypes = isPhoto ? VALID_IMAGE_TYPES : VALID_FILE_TYPES;
    if (!validTypes.includes(file.type)) {
      return isPhoto ? "Only JPG, PNG allowed" : "Only PDF, JPG, PNG allowed";
    }
    return null;
  };

  const handleFileChange = (field: "aadhaarFile" | "panFile" | "voterIdFile" | "passportPhoto", file: File | null, isPhoto: boolean = false) => {
    if (file) {
      const maxSize = isPhoto ? MAX_PHOTO_SIZE : MAX_FILE_SIZE;
      const validationError = validateFile(file, maxSize, isPhoto);
      if (validationError) {
        setErrors((prev) => ({ ...prev, [field]: validationError }));
        return;
      }
      
      // Create preview for passport photo
      if (isPhoto && field === "passportPhoto") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewPhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      if (field === "passportPhoto") {
        setPreviewPhoto(null);
      }
    }
    updateField(field, file);
  };

  const handleStateChange = (stateName: string) => {
    const state = INDIAN_STATES.find(s => s.name === stateName);
    if (state) {
      updateField("state", stateName);
      updateField("stateCode", state.code);
    }
  };

  const handleSubmit = async () => {
    if (!validateSection(4)) return;

    setIsSubmitting(true);

    try {
      // Upload files and get IDs (in production, use Convex storage)
      let aadhaarFileId: any = undefined;
      let panFileId: any = undefined;
      let voterIdFileId: any = undefined;
      let passportPhotoFileId: any = undefined;

      // Note: In production, implement actual file upload to Convex storage
      // This is a placeholder for the file upload logic

      // Submit registration
      const result = await registerMutation({
        fullName: formData.fullName,
        fatherName: formData.fatherName || undefined,
        motherName: formData.motherName || undefined,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as any,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        ssdRank: formData.ssdRank || undefined,
        arrivingDate: formData.arrivingDate || undefined,
        aadhaarCardNumber: formData.aadhaarCardNumber,
        aadhaarFileId,
        passportPhotoFileId,
        village: formData.village,
        tehsil: formData.tehsil,
        district: formData.district,
        state: formData.state,
        fullAddress: formData.fullAddress,
        pincode: formData.pincode,
        panCardNumber: formData.panCardNumber || undefined,
        panFileId,
        voterIdNumber: formData.voterIdNumber || undefined,
        voterIdFileId,
        isSsdMember: formData.isSsdMember === "Yes",
        ssdMembershipId: formData.ssdMembershipId || undefined,
        hearAboutEvent: formData.hearAboutEvent,
        roleInEvent: formData.roleInEvent,
        specialSkills: formData.specialSkills,
        dietaryPreferences: formData.dietaryPreferences as any,
        accessibilityNeeds: formData.accessibilityNeeds || undefined,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactNumber: formData.emergencyContactNumber,
        consentGiven: formData.consentGiven,
        stateCode: formData.stateCode,
      });

      // Navigate to thank you with SSD_ID
      router.push(`/ambedkar-jayanti-2026/thank-you?ssdId=${result.ssdId}`);
      toast.success(`Registration successful! Your SSD ID: ${result.ssdId}`);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUploadField = ({
    field,
    label,
    required = false,
    isPhoto = false,
    accept,
    description,
  }: {
    field: "aadhaarFile" | "panFile" | "voterIdFile" | "passportPhoto";
    label: string;
    required?: boolean;
    isPhoto?: boolean;
    accept: string;
    description?: string;
  }) => (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className={`border-2 border-dashed rounded-lg p-4 text-center hover:border-[#003285] transition-colors bg-gray-50 ${isPhoto ? 'border-[#FF7F3E]' : 'border-gray-300'}`}>
        <input
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(field, e.target.files?.[0] || null, isPhoto)}
          className="hidden"
          id={`${field}-upload`}
        />
        <label htmlFor={`${field}-upload`} className="cursor-pointer block">
          {formData[field] ? (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <FileText className="w-5 h-5" />
              <span className="font-medium text-sm">{(formData[field] as File).name}</span>
            </div>
          ) : (
            <div className="text-gray-500 space-y-1">
              <Upload className="w-6 h-6 mx-auto" />
              <p className="font-medium text-sm">Click to upload {label.split(" ")[0]}</p>
              <p className="text-xs">{description || "PDF, JPG, or PNG (max 2MB)"}</p>
            </div>
          )}
        </label>
      </div>
      {errors[field] && (
        <p className="text-xs text-red-500">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003285] via-[#002561] to-[#001a3d] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-[#FFDA78]" />
            <Badge className="bg-[#FF7F3E] text-white px-4 py-1.5 text-sm font-bold">
              14 April 2026 • Delhi
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
            Samata Sainik Dal
          </h1>
          <h2 className="text-xl md:text-3xl font-bold text-[#FFDA78] mb-4">
            Ambedkar Jayanti 2026 Registration
          </h2>
          <p className="text-blue-200/90 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Join us in celebrating Dr. B.R. Ambedkar&apos;s birth anniversary.
            Founded in 1927, SSD continues the fight for equality and social justice.
            &quot;Educate, Agitate, Organize&quot;
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-[#FFDA78] text-sm font-bold">
            <QrCode className="w-4 h-4" />
            <span>SSD_ID will be generated automatically upon registration</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((section, idx) => (
              <div key={section} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    currentSection >= section
                      ? "bg-[#FF7F3E] text-white"
                      : "bg-white/20 text-white/60"
                  }`}
                >
                  {currentSection > section ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    section
                  )}
                </div>
                {idx < 3 && (
                  <div className={`w-8 md:w-16 h-1 ${currentSection > section ? "bg-[#FF7F3E]" : "bg-white/20"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section Labels */}
        <div className="flex justify-center gap-2 md:gap-4 mb-6 flex-wrap">
          {[
            { num: 1, label: "Personal Details", icon: "👤" },
            { num: 2, label: "Address & ID", icon: "📍" },
            { num: 3, label: "SSD Info", icon: "🎪" },
            { num: 4, label: "Emergency", icon: "🆘" },
          ].map((s) => (
            <div
              key={s.num}
              className={`px-3 py-2 rounded-full text-xs font-bold transition-all ${
                currentSection === s.num
                  ? "bg-[#FFDA78] text-[#003285]"
                  : currentSection > s.num
                  ? "bg-[#FF7F3E]/30 text-white"
                  : "bg-white/10 text-white/60"
              }`}
            >
              {s.icon} {s.label}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <Card className="rounded-3xl shadow-2xl border-0 overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-[#003285]/5 to-[#2A629A]/5">
            <CardTitle className="text-xl text-[#003285] flex items-center gap-2">
              {currentSection === 1 && "👤 Personal Details"}
              {currentSection === 2 && "📍 Address & ID Proof"}
              {currentSection === 3 && "🎪 SSD & Event Info"}
              {currentSection === 4 && "🆘 Emergency & Consent"}
            </CardTitle>
            <CardDescription>
              {currentSection === 1 && "Tell us about yourself"}
              {currentSection === 2 && "Your location and identification details"}
              {currentSection === 3 && "Your connection with SSD and event role"}
              {currentSection === 4 && "Emergency contact and permissions"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-6 md:p-8">
            {/* Section 1: Personal Details */}
            {currentSection === 1 && (
              <div className="space-y-4">
                {/* Passport Photo Upload - Right aligned */}
                <div className="flex justify-end mb-4">
                  <div className="w-40 space-y-2">
                    <Label className="text-[#003285] font-bold flex items-center gap-2">
                      <UserCircle className="w-4 h-4" />
                      Passport Photo (in Uniform if available)
                    </Label>
                    <div className="aspect-[3/4] bg-white rounded-xl border-2 border-dashed border-[#FF7F3E] flex items-center justify-center overflow-hidden relative">
                      {previewPhoto ? (
                        <img src={previewPhoto} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-4">
                          <UserCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">Photo preview</p>
                        </div>
                      )}
                    </div>
                    <FileUploadField
                      field="passportPhoto"
                      label=""
                      accept="image/jpeg,image/png,image/jpg"
                      description="JPG, PNG (max 500KB)"
                      isPhoto
                    />
                    {errors.passportPhoto && (
                      <p className="text-xs text-red-500">{errors.passportPhoto}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Father&apos;s Name</Label>
                    <Input
                      id="fatherName"
                      placeholder="Enter father's name"
                      value={formData.fatherName}
                      onChange={(e) => updateField("fatherName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motherName">Mother&apos;s Name</Label>
                  <Input
                    id="motherName"
                    placeholder="Enter mother's name"
                    value={formData.motherName}
                    onChange={(e) => updateField("motherName", e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateField("dateOfBirth", e.target.value)}
                      className={errors.dateOfBirth ? "border-red-500" : ""}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-xs text-red-500">{errors.dateOfBirth}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => updateField("gender", value)}
                    >
                      <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-xs text-red-500">{errors.gender}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber">
                      Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="mobileNumber"
                      type="tel"
                      placeholder="10-digit Indian mobile"
                      maxLength={10}
                      value={formData.mobileNumber}
                      onChange={(e) => updateField("mobileNumber", e.target.value.replace(/\D/g, ""))}
                      className={errors.mobileNumber ? "border-red-500" : ""}
                    />
                    {errors.mobileNumber && (
                      <p className="text-xs text-red-500">{errors.mobileNumber}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="ssdRank">Rank in SSD</Label>
                    <Select
                      value={formData.ssdRank}
                      onValueChange={(value) => updateField("ssdRank", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your rank" />
                      </SelectTrigger>
                      <SelectContent>
                        {SSD_RANKS.map((rank) => (
                          <SelectItem key={rank} value={rank}>
                            {rank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="arrivingDate">Arriving Date at Ambedkar Bhawan</Label>
                    <Input
                      id="arrivingDate"
                      type="date"
                      value={formData.arrivingDate}
                      onChange={(e) => updateField("arrivingDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadhaarCardNumber">
                    Aadhaar Card Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="aadhaarCardNumber"
                    type="password"
                    placeholder="Enter 12-digit Aadhaar number"
                    maxLength={12}
                    value={formData.aadhaarCardNumber}
                    onChange={(e) => updateField("aadhaarCardNumber", e.target.value.replace(/\D/g, ""))}
                    className={errors.aadhaarCardNumber ? "border-red-500" : ""}
                  />
                  <p className="text-xs text-gray-500">Aadhaar is for ID proof only as per Indian data laws</p>
                  {errors.aadhaarCardNumber && (
                    <p className="text-xs text-red-500">{errors.aadhaarCardNumber}</p>
                  )}
                </div>

                <FileUploadField
                  field="aadhaarFile"
                  label="Aadhaar File Upload"
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  description="PDF, JPG, PNG (max 2MB)"
                />
              </div>
            )}

            {/* Section 2: Address & ID Proof */}
            {currentSection === 2 && (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-[#003285] flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Complete Address Details
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">
                    State <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.state}
                    onValueChange={handleStateChange}
                  >
                    <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((state) => (
                        <SelectItem key={state.code} value={state.name}>
                          {state.name} ({state.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-xs text-red-500">{errors.state}</p>
                  )}
                  <p className="text-xs text-gray-500">Your SSD_ID will be: SSD-{formData.stateCode}-2026-XXXXXX</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="village">
                      Village <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="village"
                      placeholder="Enter village name"
                      value={formData.village}
                      onChange={(e) => updateField("village", e.target.value)}
                      className={errors.village ? "border-red-500" : ""}
                    />
                    {errors.village && (
                      <p className="text-xs text-red-500">{errors.village}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tehsil">
                      Tehsil / Taluka <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="tehsil"
                      placeholder="Enter tehsil name"
                      value={formData.tehsil}
                      onChange={(e) => updateField("tehsil", e.target.value)}
                      className={errors.tehsil ? "border-red-500" : ""}
                    />
                    {errors.tehsil && (
                      <p className="text-xs text-red-500">{errors.tehsil}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="district">
                      District <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="district"
                      placeholder="Enter district name"
                      value={formData.district}
                      onChange={(e) => updateField("district", e.target.value)}
                      className={errors.district ? "border-red-500" : ""}
                    />
                    {errors.district && (
                      <p className="text-xs text-red-500">{errors.district}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">
                      Pincode <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="pincode"
                      placeholder="6-digit pincode"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => updateField("pincode", e.target.value.replace(/\D/g, ""))}
                      className={errors.pincode ? "border-red-500" : ""}
                    />
                    {errors.pincode && (
                      <p className="text-xs text-red-500">{errors.pincode}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullAddress">
                    Full Address (Street, Locality, Area) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullAddress"
                    placeholder="House no., Street, Locality, Area"
                    value={formData.fullAddress}
                    onChange={(e) => updateField("fullAddress", e.target.value)}
                    className={errors.fullAddress ? "border-red-500" : ""}
                  />
                  {errors.fullAddress && (
                    <p className="text-xs text-red-500">{errors.fullAddress}</p>
                  )}
                </div>

                <div className="border-t pt-6 mt-6">
                  <p className="text-sm font-medium text-gray-600 mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Optional ID Proofs (Upload if available)
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="panCardNumber">PAN Card Number (Optional)</Label>
                      <Input
                        id="panCardNumber"
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        value={formData.panCardNumber}
                        onChange={(e) => updateField("panCardNumber", e.target.value.toUpperCase())}
                      />
                    </div>

                    <FileUploadField
                      field="panFile"
                      label="PAN File Upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      description="PDF, JPG, PNG (max 2MB)"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="voterIdNumber">Voter ID Number (Optional)</Label>
                      <Input
                        id="voterIdNumber"
                        placeholder="ABC1234567"
                        maxLength={10}
                        value={formData.voterIdNumber}
                        onChange={(e) => updateField("voterIdNumber", e.target.value.toUpperCase())}
                      />
                    </div>

                    <FileUploadField
                      field="voterIdFile"
                      label="Voter ID File Upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      description="PDF, JPG, PNG (max 2MB)"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section 3: SSD & Event Info */}
            {currentSection === 3 && (
              <div className="space-y-4">
                <div className="bg-[#FFDA78]/20 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-[#003285] flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    SSD Membership & Event Participation
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>
                      Are you a Samata Sainik Dal member? <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.isSsdMember}
                      onValueChange={(value) => updateField("isSsdMember", value)}
                    >
                      <SelectTrigger className={errors.isSsdMember ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.isSsdMember && (
                      <p className="text-xs text-red-500">{errors.isSsdMember}</p>
                    )}
                  </div>

                  {formData.isSsdMember === "Yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="ssdMembershipId">
                        Membership ID <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="ssdMembershipId"
                        placeholder="Your SSD Member ID"
                        value={formData.ssdMembershipId}
                        onChange={(e) => updateField("ssdMembershipId", e.target.value)}
                        className={errors.ssdMembershipId ? "border-red-500" : ""}
                      />
                      {errors.ssdMembershipId && (
                        <p className="text-xs text-red-500">{errors.ssdMembershipId}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>
                      How did you hear about this event? <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.hearAboutEvent}
                      onValueChange={(value) => updateField("hearAboutEvent", value)}
                    >
                      <SelectTrigger className={errors.hearAboutEvent ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SSD Chapter">SSD Chapter</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Friends">Friends</SelectItem>
                        <SelectItem value="Poster">Poster</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.hearAboutEvent && (
                      <p className="text-xs text-red-500">{errors.hearAboutEvent}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Role in event <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.roleInEvent}
                      onValueChange={(value) => updateField("roleInEvent", value)}
                    >
                      <SelectTrigger className={errors.roleInEvent ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Volunteer">Volunteer</SelectItem>
                        <SelectItem value="Participant">Participant</SelectItem>
                        <SelectItem value="Speaker">Speaker</SelectItem>
                        <SelectItem value="Performer">Performer</SelectItem>
                        <SelectItem value="Sponsor">Sponsor</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.roleInEvent && (
                      <p className="text-xs text-red-500">{errors.roleInEvent}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialSkills">
                    Special skills/Interests <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="specialSkills"
                    placeholder="e.g., Marching, Speech, Cultural Program, First Aid"
                    value={formData.specialSkills}
                    onChange={(e) => updateField("specialSkills", e.target.value)}
                    className={errors.specialSkills ? "border-red-500" : ""}
                  />
                  {errors.specialSkills && (
                    <p className="text-xs text-red-500">{errors.specialSkills}</p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>
                      Dietary preferences <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.dietaryPreferences}
                      onValueChange={(value) => updateField("dietaryPreferences", value)}
                    >
                      <SelectTrigger className={errors.dietaryPreferences ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="Non-veg">Non-veg</SelectItem>
                        <SelectItem value="Jain">Jain</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.dietaryPreferences && (
                      <p className="text-xs text-red-500">{errors.dietaryPreferences}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accessibilityNeeds">Accessibility needs (Optional)</Label>
                    <Input
                      id="accessibilityNeeds"
                      placeholder="e.g., Wheelchair access, Special assistance"
                      value={formData.accessibilityNeeds}
                      onChange={(e) => updateField("accessibilityNeeds", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section 4: Emergency & Consent */}
            {currentSection === 4 && (
              <div className="space-y-4">
                <div className="bg-red-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Emergency Contact Information
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">
                      Emergency Contact Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="emergencyContactName"
                      placeholder="Full name of emergency contact"
                      value={formData.emergencyContactName}
                      onChange={(e) => updateField("emergencyContactName", e.target.value)}
                      className={errors.emergencyContactName ? "border-red-500" : ""}
                    />
                    {errors.emergencyContactName && (
                      <p className="text-xs text-red-500">{errors.emergencyContactName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactNumber">
                      Emergency Contact Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="emergencyContactNumber"
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={formData.emergencyContactNumber}
                      onChange={(e) => updateField("emergencyContactNumber", e.target.value.replace(/\D/g, ""))}
                      className={errors.emergencyContactNumber ? "border-red-500" : ""}
                    />
                    {errors.emergencyContactNumber && (
                      <p className="text-xs text-red-500">{errors.emergencyContactNumber}</p>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6 mt-6">
                  <div className="bg-blue-50 rounded-xl p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={formData.consentGiven}
                        onChange={(e) => updateField("consentGiven", e.target.checked)}
                        className={`w-5 h-5 mt-0.5 rounded border-gray-300 text-[#003285] focus:ring-[#003285] ${errors.consentGiven ? "border-red-500" : ""}`}
                      />
                      <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer font-normal">
                        <span className="text-red-500">*</span> I agree to Samata Sainik Dal terms,
                        photo/video release for event promotion, and data privacy.
                        I understand my data will be used only for event verification/participation
                        per Indian data laws. Aadhaar is collected for ID proof only.
                      </Label>
                    </div>
                    {errors.consentGiven && (
                      <p className="text-xs text-red-500 ml-8">{errors.consentGiven}</p>
                    )}
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <p className="text-sm text-amber-900 font-medium">
                          Privacy Notice:
                        </p>
                        <p className="text-sm text-amber-800 leading-relaxed">
                          Your personal data will be used only for event verification and participation
                          purposes as per Indian data protection laws. Aadhaar details are collected
                          solely for identity verification and will not be shared with third parties.
                        </p>
                        <p className="text-sm text-amber-800 leading-relaxed font-bold text-[#003285]">
                          Your SSD_ID (e.g., SSD-DL-2026-000001) will be generated automatically and can be used for future SSD events.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t gap-4">
              {currentSection > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="rounded-full px-8 border-2"
                >
                  ← Back
                </Button>
              ) : (
                <div />
              )}

              {currentSection < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#003285] hover:bg-[#002561] rounded-full px-10 font-bold"
                >
                  Next →
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-[#FF7F3E] hover:bg-[#ff6a1a] rounded-full px-10 font-bold text-white shadow-lg shadow-[#FF7F3E]/30"
                >
                  {isSubmitting ? (
                    <>
                      <Calendar className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Register Now
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-blue-200/80 text-sm space-y-2">
          <p className="flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Ambedkar Bhawan, Delhi
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> 14 April 2026
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" /> SSD Founded 1927
            </span>
          </p>
          <p className="text-xs text-blue-300/60 pt-2">
            Data used only for event verification/participation per Indian data laws. Aadhaar for ID proof only.
          </p>
        </div>
      </div>
    </div>
  );
}
