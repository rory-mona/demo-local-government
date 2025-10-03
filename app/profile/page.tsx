"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Header from "@/components/Header"

export default function ProfilePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const attestContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get user data from localStorage
    const userDataStr = localStorage.getItem('paymonaUser')
    if (userDataStr) {
      const parsedData = JSON.parse(userDataStr)
      
      // Merge with dummy data for demonstration
      const dummyData = {
        bvn: "22806500034",
        firstName: "TIM",
        middleName: "",
        lastName: "KNICKMANN",
        dateOfBirth: "26-10-1997",
        registrationDate: "29-Oct-2024",
        enrollmentBranch: "",
        enrollmentBank: "044",
        email: "",
        gender: "Male",
        levelOfAccount: "Level 1 - Low Level Accounts",
        lgaOfOrigin: "",
        lgaOfResidence: "Eti Osa",
        maritalStatus: "Single",
        nin: "12345678901",
        nameOnCard: "KNICKMANN TIM",
        nationality: "Germany",
        phoneNumber1: "07078943673",
        phoneNumber2: "",
        residentialAddress: "5 BOURDILLON ROAD",
        stateOfOrigin: "",
        stateOfResidence: "Lagos State",
        birthcountry: "germany",
        birthdate: "26-10-1997",
        centralID: "81588245",
        firstname: "TIM",
        surname: "KNICKMANN",
        telephoneno: "07078943673",
        trackingId: "0SLEADWSS94S1CB",
        psurname: "****",
        self_origin_place: "muenster",
        residence_address: "5 BOURDILLON ROAD IKOYI",
        residence_lga: "Eti-Osa",
        residence_state: "Lagos"
      }
      
      // Mask sensitive data
      if (dummyData.bvn) {
        dummyData.bvn = dummyData.bvn.slice(0, 3) + "****" + dummyData.bvn.slice(-3)
      }
      if (dummyData.nin) {
        dummyData.nin = dummyData.nin.slice(0, 3) + "****" + dummyData.nin.slice(-3)
      }
      
      setUserData({ ...dummyData, ...parsedData })
    }
    setIsLoading(false)
  }, [])

  const handleBack = () => {
    router.push('/')
  }

  const handleLogout = () => {
    localStorage.removeItem('paymonaToken')
    localStorage.removeItem('paymonaUser')
    router.push('/')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Load and initialize AttestFrontendSDK
      let AttestFrontendSDK
      try {
        const sdkModule = await import('@usemona/attest-frontend-sdk')
        AttestFrontendSDK = sdkModule.AttestFrontendSDK
      } catch (error) {
        console.error('Failed to load AttestFrontendSDK:', error)
        throw new Error('AttestFrontendSDK not available')
      }

      const frontendUrl = process.env.NEXT_PUBLIC_ATTEST_FRONTEND
      const apiUrl = process.env.NEXT_PUBLIC_ATTEST_BACKEND

      // Get scale from localStorage or use default
      const savedScale = localStorage.getItem('attestScale')
      const scaleValue = savedScale ? parseFloat(savedScale) : 0.5

      if (!attestContainerRef.current) {
        throw new Error('Attest container ref is not available')
      }

      const config = {
        clientId: process.env.NEXT_PUBLIC_MONA_CLIENT_ID || 'local-gov-portal-demo',
        targetElement: attestContainerRef.current,
        scale: scaleValue,
        ...(frontendUrl && { frontendUrl }),
        ...(apiUrl && { apiUrl })
      }

      const attestSDK = new AttestFrontendSDK(config)

      // Digital signing endpoint - use local API route with full URL
      const signUrl = `${window.location.origin}/api/auth/digital-sign`
      
      const response = await attestSDK.fetchWithAttestation(
        signUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profileData: userData,
            action: 'registration_submission'
          })
        }
        // SDK automatically uses handoff for desktop, direct signing for mobile
      )

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error('Digital signing failed')
      }
    } catch (error) {
      console.error('Digital signing error:', error)
      alert('Digital signing failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile data...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No profile data found</p>
          <button
            onClick={handleBack}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen pb-8">
      <Header />
      
      <div className="mx-auto mt-4 w-full max-w-[980px] px-4">
        <div className="frame shadow-frame rounded-md bg-white/70 p-4 md:p-6">
          {/* Header */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div>
                              <h1 className="text-2xl font-semibold text-gray-800 mb-2">Registration Form</h1>
              <p className="text-sm text-gray-600">Pre-populated from your attest profile - please review and submit</p>
              </div>
              {/* User Avatar and Name */}

            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Profile Successfully Retrieved
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Your profile information has been pre-populated from your attest profile. Please review and submit the form.
                </p>
              </div>
            </div>
          </div>

          {/* Logged In User Information */}
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {userData?.imageUrl ? (
                  <img
                    src={userData.imageUrl}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">
                      {userData?.firstName?.charAt(0) || userData?.lastName?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-blue-800">
                    Logged In User
                  </h3>
                  <p className="text-sm text-blue-700">
                    {userData?.firstName && userData?.lastName
                      ? `${userData.firstName} ${userData.lastName}`
                      : userData?.firstName || userData?.lastName || userData?.email || 'User'
                    }
                  </p>
                </div>
              </div>
              <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                Active Session
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Profile Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Personal Information
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-900 font-medium">
                      {userData.firstName} {userData.middleName} {userData.lastName}
                    </p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      autofilled
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date of Birth</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-900">{userData.dateOfBirth || userData.birthdate}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      autofilled
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Gender</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-900">{userData.gender}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      autofilled
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Marital Status</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-900">{userData.maritalStatus}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      autofilled
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Nationality</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-900">{userData.nationality}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      autofilled
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Country of Birth</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-900">{userData.birthcountry}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      autofilled
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Primary Phone</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-900">{userData.phoneNumber1 || userData.telephoneno}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      autofilled
                    </span>
                  </div>
                </div>
                {userData.phoneNumber2 && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Secondary Phone</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userData.phoneNumber2}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        autofilled
                      </span>
                    </div>
                  </div>
                )}
                {userData.email && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userData.email}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        autofilled
                      </span>
                    </div>
                  </div>
                )}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Residential Address</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-900">{userData.residentialAddress || userData.residence_address}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      autofilled
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Location Information
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">State of Residence</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-900">{userData.stateOfResidence || userData.residence_state}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      autofilled
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">LGA of Residence</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-900">{userData.lgaOfResidence || userData.residence_lga}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      autofilled
                    </span>
                  </div>
                </div>
                {userData.stateOfOrigin && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">State of Origin</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userData.stateOfOrigin}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        autofilled
                      </span>
                    </div>
                  </div>
                )}
                {userData.lgaOfOrigin && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">LGA of Origin</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userData.lgaOfOrigin}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        autofilled
                      </span>
                    </div>
                  </div>
                )}
                {userData.self_origin_place && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Place of Origin</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userData.self_origin_place}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        autofilled
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Identification Information */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Identification
              </h2>
              <div className="space-y-3">
                {userData.bvn && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">BVN</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userData.bvn}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        autofilled
                      </span>
                    </div>
                  </div>
                )}
                {userData.nin && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">NIN</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userData.nin}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        autofilled
                      </span>
                    </div>
                  </div>
                )}
                {userData.centralID && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Central ID</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userData.centralID}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        autofilled
                      </span>
                    </div>
                  </div>
                )}
                {userData.trackingId && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tracking ID</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userData.trackingId}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        autofilled
                      </span>
                    </div>
                  </div>
                )}
                {userData.registrationDate && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Registration Date</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userData.registrationDate}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        autofilled
                      </span>
                    </div>
                  </div>
                )}
                {userData.levelOfAccount && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Account Level</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userData.levelOfAccount}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        autofilled
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

            {/* Digital Signing Container */}
            {isSubmitting && (
              <div className="mt-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                    <span className="text-blue-800">Digitally signing your registration...</span>
                  </div>
                </div>
                <div 
                  ref={attestContainerRef}
                  className="w-full min-h-[200px] border border-gray-300 rounded-lg bg-white"
                />
              </div>
            )}

            {/* Submit Button */}
            {!isSubmitted && !isSubmitting && (
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Submit Registration
                </button>
              </div>
            )}

            {/* Success State */}
            {isSubmitted && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-green-800 mb-2">
                    Registration Successfully Submitted!
                  </h3>
                  <p className="text-green-700 mb-4">
                    Your registration has been digitally signed and submitted. You will receive a confirmation email shortly.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => window.location.href = '/'}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                    >
                      Back to Home
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                    >
                      Print Receipt
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="mt-6 text-center text-[11.5px] text-gray-600">
        Copyright (c) 2020, Kadira State Residents Registration Agency
      </div>
    </main>
  )
}
