"use client"

import { useState, useRef, useEffect } from 'react'
import StartCard from "./StartCard";

function PersonIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" fill="#fff"/>
      <path d="M4 20a8 8 0 0 1 16 0Z" fill="#fff"/>
      <path d="M18 7h3v2h-3v3h-2V9h-3V7h3V4h2Z" fill="#fff"/>
    </svg>
  );
}
function IdIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" fill="#fff"/>
      <circle cx="8.5" cy="12" r="2.2" fill="#1F7F45"/>
      <rect x="12" y="10" width="7" height="1.8" rx="0.9" fill="#1F7F45"/>
      <rect x="12" y="13" width="5" height="1.8" rx="0.9" fill="#1F7F45"/>
    </svg>
  );
}

export default function StartPanel() {
  const [isMonaAttest, setIsMonaAttest] = useState(false)
  const [showAttestContainer, setShowAttestContainer] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showClearDataModal, setShowClearDataModal] = useState(false)
  const [scale, setScale] = useState(0.5)
  const attestContainerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleStartRegistration = async () => {
    if (isMonaAttest) {
      await handleMonaAttestLogin('registration')
    } else {
      // Regular login - redirect to registration form
      window.location.href = '/registration'
    }
  }

  const handleRetrieveRegistration = async () => {
    if (isMonaAttest) {
      await handleMonaAttestLogin('retrieve')
    } else {
      // Regular login - redirect to retrieve form
      window.location.href = '/retrieve'
    }
  }

  const handleMonaAttestLogin = async (_action: 'registration' | 'retrieve') => {
    setIsLoading(true)
    setShowAttestContainer(true)
    
    try {
      // Initialize AttestFrontendSDK with targetElement
      const { AttestFrontendSDK } = await import('@usemona/attest-frontend-sdk')
      
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
      
     

      // Use local mock API endpoint
      const loginUrl = `${window.location.origin}/api/auth/login`
      
      const response = await attestSDK.fetchWithAttestation(
        loginUrl,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
        // SDK automatically uses handoff for desktop, direct signing for mobile
      )

      if (response.ok) {
        const loginData = await response.json()
        if (loginData.success) {
          // Store token and user data
          localStorage.setItem('paymonaToken', loginData.token)
          localStorage.setItem('paymonaUser', JSON.stringify(loginData.user))
          
          // Redirect to profile page for attest-based login
          window.location.href = '/profile'
        }
      }
    } catch (error) {
      console.error('Mona Attest login error:', error)
      setShowAttestContainer(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleMouseDown = () => {
    longPressTimerRef.current = setTimeout(() => {
      setShowClearDataModal(true)
    }, 500) // 500ms for long press
  }

  const handleToggleMouseUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
  }

  const handleToggleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowClearDataModal(true)
  }

  const handleClearData = () => {
    // Clear all localStorage and sessionStorage except attestScale
    const attestScale = localStorage.getItem('attestScale')
    localStorage.clear()
    sessionStorage.clear()
    
    // Restore attestScale
    if (attestScale) {
      localStorage.setItem('attestScale', attestScale)
    }
    
    setShowClearDataModal(false)
    // Optionally refresh the page or show a success message
    window.location.reload()
  }

  const handleScaleChange = (newScale: number) => {
    setScale(newScale)
    localStorage.setItem('attestScale', newScale.toString())
  }

  // Load scale from localStorage when modal opens
  useEffect(() => {
    if (showClearDataModal) {
      const savedScale = localStorage.getItem('attestScale')
      if (savedScale) {
        setScale(parseFloat(savedScale))
      }
    }
  }, [showClearDataModal])

  return (
    <section className="rounded-md border border-gray-200 bg-white p-4 shadow-[inset_0_-2px_0_rgba(0,0,0,0.06)]">
      <div className="border-b-2 border-amber-400 pb-3">
        <h2 className="text-[13.5px] font-semibold text-gray-800">
          Start Registration Process
        </h2>
      </div>

      {/* Mona Attest Toggle */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <span className={`text-xs font-medium ${!isMonaAttest ? 'text-emerald-600' : 'text-gray-500'}`}>
          Regular
        </span>
        <button
          ref={toggleRef}
          onClick={() => setIsMonaAttest(!isMonaAttest)}
          onMouseDown={handleToggleMouseDown}
          onMouseUp={handleToggleMouseUp}
          onMouseLeave={handleToggleMouseUp}
          onTouchStart={handleToggleMouseDown}
          onTouchEnd={handleToggleMouseUp}
          onContextMenu={handleToggleContextMenu}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
            isMonaAttest ? 'bg-emerald-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
              isMonaAttest ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-xs font-medium ${isMonaAttest ? 'text-emerald-600' : 'text-gray-500'}`}>
          Mona Attest
        </span>
      </div>

      {/* Mona Attest Container */}
      {isMonaAttest && showAttestContainer && (
        <div 
          ref={attestContainerRef}
          className="w-full min-h-[300px] border border-gray-300 rounded-lg bg-white mt-4"
        />
      )}

      {/* Registration Cards - Only show when not showing attest container */}
      {!(isMonaAttest && showAttestContainer) && (
        <div className="mt-5 space-y-6">
          <StartCard
            icon={<PersonIcon />}
            title="Start Registration"
            subtitle="For adults and children above 16, click the button below"
            cta="Start Registration"
            onClick={handleStartRegistration}
            disabled={isLoading}
          />
          <StartCard
            icon={<IdIcon />}
            title="Retrieve Registration"
            subtitle="To retrieve and continue a previously saved registration, click the button below"
            cta="Retrieve Registration"
            onClick={handleRetrieveRegistration}
            disabled={isLoading}
          />
        </div>
      )}

      {/* Clear Data Modal */}
      {showClearDataModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Attest SDK Configuration
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Configure the scale factor and manage your data settings.
              </p>

              {/* Scale Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Scale Factor: <span className="font-bold text-emerald-600">{scale}</span>
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={scale}
                    onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0.1</span>
                    <span>0.5</span>
                    <span>1.0</span>
                    <span>1.5</span>
                    <span>2.0</span>
                  </div>
                </div>
                
                {/* Quick Presets */}
                <div className="mt-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleScaleChange(0.3)}
                      className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      Small (0.3)
                    </button>
                    <button
                      onClick={() => handleScaleChange(0.5)}
                      className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      Medium (0.5)
                    </button>
                    <button
                      onClick={() => handleScaleChange(1.0)}
                      className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      Normal (1.0)
                    </button>
                    <button
                      onClick={() => handleScaleChange(1.5)}
                      className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      Large (1.5)
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => setShowClearDataModal(false)}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearData}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Clear Data
                </button>
                <button
                  onClick={() => {
                    const attestUrl = process.env.NEXT_PUBLIC_ATTEST_FRONTEND + '/config'
                    window.open(attestUrl, '_blank')
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Clear Attest Data
                </button>
                <button
                  onClick={() => {
                    const monaUrl = process.env.NEXT_PUBLIC_MONA_FRONTEND + '/config'
                    window.open(monaUrl, '_blank')
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Clear Mona Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
