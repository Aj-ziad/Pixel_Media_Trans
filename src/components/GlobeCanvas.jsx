'use client'
import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'
import { useTranslations } from 'next-intl'

function GlobeCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    let phi = 0
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 840,
      height: 840,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.9, 0.9, 0.9],
      markerColor: [1, 0.75, 0.2],
      glowColor: [1, 0.75, 0.2],
      markers: [],
      onRender: (state) => {
        state.phi = phi
        phi += 0.003
      },
    })
    return () => globe.destroy()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        filter: 'drop-shadow(0 0 40px rgba(255,185,0,0.4))',
        display: 'block',
      }}
    />
  )
}

export default function ContactSection() {
  const t = useTranslations('contact')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.target)
    try {
      const response = await fetch('https://formspree.io/f/xpwywree', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (response.ok) {
        setSubmitSuccess(true)
        e.target.reset()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full  px-4 py-16">
      <div className="max-w-6xl  mx-auto">

        {/* Two Column Container */}
        <div className="flex flex-col md:flex-row rounded-2xl bg-white  overflow-hidden">

          {/* LEFT SIDE — FORM */}
          <div className="flex-1 p-8 md:p-12">
            <h2
              className="text-5xl font-bold mb-8 tracking-tight text-gray-900"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {t('headingFirst')}{' '}
              <span className="italic font-bold" style={{ color: '#ffb900' }}>
                {t('headingSecond')}
              </span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-600">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t('form.name')}
                    className="w-full text-sm p-3 rounded-lg outline-none text-gray-800 placeholder-gray-400 border border-gray-300 focus:border-[#ffb900] transition-colors"
                    style={{ background: '#f8f8f8', fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-600">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t('form.email')}
                    className="w-full text-sm p-3 rounded-lg outline-none text-gray-800 placeholder-gray-400 border border-gray-300 focus:border-[#ffb900] transition-colors"
                    style={{ background: '#f8f8f8', fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-600">
                  {t('form.message')}
                </label>
                <textarea
                  name="message"
                  rows="6"
                  required
                  placeholder={t('form.message')}
                  className="w-full text-sm p-3 rounded-lg outline-none text-gray-800 placeholder-gray-400 border border-gray-300 focus:border-[#ffb900] transition-colors"
                  style={{ background: '#f8f8f8', fontFamily: "'Poppins', sans-serif" }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-sm font-semibold py-3 rounded-lg"
                style={{
                  backgroundColor: isSubmitting ? '#e6a800' : '#ffb900',
                  color: 'white',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {isSubmitting ? t('form.sending') : t('form.send')}
              </button>

              {submitSuccess && (
                <div
                  className="p-3 rounded-lg text-center text-sm"
                  style={{
                    background: 'rgba(255,185,0,0.1)',
                    border: '1px solid #ffb900',
                    color: '#a07800',
                  }}
                >
                  {t('form.success')}
                </div>
              )}

            </form>
          </div>

          {/* RIGHT SIDE — INFO + GLOBE */}
          <div
            className="relative p-12 md:w-[480px] overflow-hidden m-8 border border-gray-200 rounded-xl"
            style={{
              background: 'linear-gradient(160deg,#f5f0e8 0%,#ede8de 100%)',
              minHeight: '380px',
            }}
          >
            {/* Text top-left */}
            <p
              className="relative z-10 text-gray-900 text-4xl font-semibold leading-snug"
              style={{
                fontFamily: "'Poppins', sans-serif",
                maxWidth: '700px',
              }}
            >
              {t('globeText')}
            </p>

            {/* Globe — oversized, anchored bottom-right, clipped by overflow-hidden */}
            <div
              style={{
                position: 'absolute',
                bottom: '-80px',
                right: '-98px',
                width: '420px',
                height: '420px',
                pointerEvents: 'none',
              }}
            >
              <GlobeCanvas />
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}