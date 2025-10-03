"use client"

import { useState } from 'react'
import Header from "@/components/Header"

export default function RetrievePage() {
  const [formData, setFormData] = useState({
    lasrraId: '',
    surname: '',
    firstName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    phoneMiddle: '',
    email: '',
    confirmEmail: '',
    currentLgLcda: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Retrieve form submitted:', formData)
    // Handle form submission
  }

  return (
    <main className="min-h-screen pb-8">
      <Header />

      {/* center frame */}
      <div className="mx-auto mt-4 w-full max-w-[980px] px-4">
        <div className="frame shadow-frame rounded-md bg-white/70 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Retrieve Registration</h1>
            <p className="text-sm text-gray-600">Provide your details to retrieve your existing LASRRA registration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* LASRRA ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LASRRA ID *
              </label>
              <input
                type="text"
                value={formData.lasrraId}
                onChange={(e) => handleInputChange('lasrraId', e.target.value)}
                placeholder="Enter Your LASRRA ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            {/* Name Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surname *
                </label>
                <input
                  type="text"
                  value={formData.surname}
                  onChange={(e) => handleInputChange('surname', e.target.value)}
                  placeholder="Provide your surname as supplied while registering"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Provide First as given to LASRRA during registration"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                  placeholder="Your middle provided during registration"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Gender and DOB Row */}
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
                  <option value="">--- Select Choice ---</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DOB *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                />
                                 <p className="text-xs text-gray-500 mt-1">
                   &quot;dd/mm/yyyy&quot; for DOB - Enter date as dd/mm/yyyy for DOB
                 </p>
              </div>
            </div>

            {/* Phone Numbers Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="08012345678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                />
                                 <p className="text-xs text-gray-500 mt-1">
                   &quot;08012345678&quot; for Phone - Enter 11-digit phone number for Phone
                 </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Middle
                </label>
                <input
                  type="tel"
                  value={formData.phoneMiddle}
                  onChange={(e) => handleInputChange('phoneMiddle', e.target.value)}
                  placeholder="Optional middle phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Email Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Your functional Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Email *
                </label>
                <input
                  type="email"
                  value={formData.confirmEmail}
                  onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                  placeholder="Confirm your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Current LG/LCDA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current LG/LCDA
              </label>
              <select
                value={formData.currentLgLcda}
                onChange={(e) => handleInputChange('currentLgLcda', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="">Select LG/LCDA</option>
                <option value="agege">Agege</option>
                <option value="alimosho">Alimosho</option>
                <option value="amowo-odofin">Amowo-Odofin</option>
                <option value="apapa">Apapa</option>
                <option value="badagry">Badagry</option>
                <option value="epe">Epe</option>
                <option value="eti-osa">Eti-Osa</option>
                <option value="ibeju-lekki">Ibeju-Lekki</option>
                <option value="ifako-ijaiye">Ifako-Ijaiye</option>
                <option value="ikeja">Ikeja</option>
                <option value="ikorodu">Ikorodu</option>
                <option value="kosofe">Kosofe</option>
                                  <option value="kadira-island">Kadira Island</option>
                  <option value="kadira-mainland">Kadira Mainland</option>
                <option value="mushin">Mushin</option>
                <option value="ojo">Ojo</option>
                <option value="oshodi-isolo">Oshodi-Isolo</option>
                <option value="shomolu">Shomolu</option>
                <option value="surulere">Surulere</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Submit Request
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
