"use client"

import { useState } from 'react'
import Header from "@/components/Header"

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    surname: '',
    firstName: '',
    otherName: '',
    gender: '',
    maritalStatus: '',
    maidenName: '',
    previousName: '',
    dateOfBirth: '',
    countryOfBirth: 'NIGERIA',
    stateOfBirth: '',
    townOfBirth: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registration form submitted:', formData)
    // Handle form submission
  }

  return (
    <main className="min-h-screen pb-8">
      <Header />

      {/* center frame */}
      <div className="mx-auto mt-4 w-full max-w-[980px] px-4">
        <div className="frame shadow-frame rounded-md bg-white/70 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Personal Information</h1>
                                <p className="text-sm text-gray-600">Please fill in your personal details for Kadira State Resident Registration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Surname */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surname *
              </label>
              <input
                type="text"
                value={formData.surname}
                onChange={(e) => handleInputChange('surname', e.target.value)}
                placeholder="(e.g. Akinola or Bamidele-Smith)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Your surname is your family name or last name. If your surname is a compound name, e.g. Bamidele-Smith enter it as shown with a dash separating each part of the name
              </p>
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="(e.g. Chukwuemeka, Adekunle or Micheal)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Your first name is the name you were given and the name by which you are known and called.
              </p>
            </div>

            {/* Other Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Name *
              </label>
              <input
                type="text"
                value={formData.otherName}
                onChange={(e) => handleInputChange('otherName', e.target.value)}
                placeholder="(e.g. Adekola, John or Ibrahim)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Your other name is another by which you are known or a middle name given at birth. It can be your baptismal name e.g. John or your traditional name
              </p>
            </div>

            {/* Gender and Marital Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marital Status *
                </label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                >
                  <option value="">Select Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>

            {/* Maiden Name and Previous Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maiden Name
                </label>
                <input
                  type="text"
                  value={formData.maidenName}
                  onChange={(e) => handleInputChange('maidenName', e.target.value)}
                  placeholder="(e.g. Akinola or Bamidele-Smith)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Applicable to women, your surname prior to marriage. If you have not changed your name after marriage leave blank
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Name
                </label>
                <input
                  type="text"
                  value={formData.previousName}
                  onChange={(e) => handleInputChange('previousName', e.target.value)}
                  placeholder="(Previous lastname firstname middlename)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">
                  If you have ever lived under another name or have changed your firstname or surname at any point in time
                </p>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your date of birth in DD/MM/YYYY format
              </p>
            </div>

            {/* Country, State, Town of Birth Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country of Birth *
                </label>
                <select
                  value={formData.countryOfBirth}
                  onChange={(e) => handleInputChange('countryOfBirth', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                >
                  <option value="NIGERIA">NIGERIA</option>
                  <option value="GHANA">GHANA</option>
                  <option value="KENYA">KENYA</option>
                  <option value="SOUTH_AFRICA">SOUTH AFRICA</option>
                </select>
                                 <p className="text-xs text-gray-500 mt-1">
                   Enter where you were actually born. For those born outside Nigeria, you don&apos;t have to select the state of birth
                 </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State of Birth *
                </label>
                <select
                  value={formData.stateOfBirth}
                  onChange={(e) => handleInputChange('stateOfBirth', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                >
                  <option value="">Select State</option>
                  <option value="kadira">Kadira</option>
                  <option value="ogun">Ogun</option>
                  <option value="oyo">Oyo</option>
                  <option value="ondo">Ondo</option>
                  <option value="ekiti">Ekiti</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Town of Birth *
                </label>
                <input
                  type="text"
                  value={formData.townOfBirth}
                  onChange={(e) => handleInputChange('townOfBirth', e.target.value)}
                  placeholder="Enter town of birth"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* footer */}
      <div className="mt-6 text-center text-[11.5px] text-gray-600">
        Copyright (c) 2020, Kadira State Residents Registration Agency
      </div>
    </main>
  )
}
