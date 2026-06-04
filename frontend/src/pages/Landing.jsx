import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">

      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-red-600">🏥 MedQR</h1>
        <div className="flex gap-4">
          <Link to="/login" className="px-4 py-2 text-blue-600 font-semibold hover:underline">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
            Get Started
          </Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-5xl font-black text-gray-800 mb-6">
          Your Medical ID,<br />
          <span className="text-red-600">Always With You.</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          A QR code that speaks for you in emergencies. First responders scan it
          to instantly see your blood group, allergies, medications, and emergency contacts.
          No app needed.
        </p>
        <Link to="/register" className="px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-xl hover:bg-red-700 shadow-lg">
          Create Your Free MedQR →
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl mb-4">📝</div>
            <h4 className="font-bold text-lg mb-2">1. Register</h4>
            <p className="text-gray-600 text-sm">Create your account and fill in your medical details</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl mb-4">📱</div>
            <h4 className="font-bold text-lg mb-2">2. Get QR Code</h4>
            <p className="text-gray-600 text-sm">A unique QR code is generated for your profile</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl mb-4">💳</div>
            <h4 className="font-bold text-lg mb-2">3. Carry It</h4>
            <p className="text-gray-600 text-sm">Print it, stick on phone, or keep in your wallet</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl mb-4">🚑</div>
            <h4 className="font-bold text-lg mb-2">4. Get Help</h4>
            <p className="text-gray-600 text-sm">In emergency, anyone scans it to see your info</p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why MedQR?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border-2 border-red-200 rounded-xl">
              <h4 className="font-bold text-lg mb-2 text-red-600">⚡ Instant Access</h4>
              <p className="text-gray-600">Medical info available in under 2 seconds via any phone camera</p>
            </div>
            <div className="p-6 border-2 border-blue-200 rounded-xl">
              <h4 className="font-bold text-lg mb-2 text-blue-600">📱 No App Needed</h4>
              <p className="text-gray-600">Works with any smartphone camera. No download required</p>
            </div>
            <div className="p-6 border-2 border-green-200 rounded-xl">
              <h4 className="font-bold text-lg mb-2 text-green-600">🔒 Secure</h4>
              <p className="text-gray-600">You control what is visible. Deactivate your QR anytime</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center py-8 text-gray-500">
        <p>Built with ❤️ for saving lives | MedQR © 2025</p>
      </footer>
    </div>
  )
}

export default Landing