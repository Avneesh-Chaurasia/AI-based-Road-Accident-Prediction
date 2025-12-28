import React from 'react'

const Team = () => {
  const members = [
    {
      name: "Avneesh Chaurasia",
      role: "AIML Engineer",
      desc: "Focused on building and training machine learning models for accident prediction.",
      initials: "AC"
    },
    {
      name: "Mohammed Affan Gorepeerzade",
      role: "Frontend Developer",
      desc: "Responsible for designing the UI with React and Tailwind CSS.",
      initials: "AG"
    },
    {
      name: "Mohammed Uzair Kazi",
      role: "Backend Developer",
      desc: "Works on APIs, data handling, and integrating ML with the frontend.",
      initials: "UK"
    },
    {
      name: "Taufique Juwari",
      role: "Researcher",
      desc: "Conducts research on accident data patterns and helps improve model accuracy.",
      initials: "TJ"
    },
    {
      name: "Danish Khan",
      role: "Researcher",
      desc: "Conducts research on accident data patterns and helps improve model accuracy.",
      initials: "DK"
    }
  ]

  return (
    <section id="team" className="min-h-screen bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Meet Our Team</h2>

        {/* Change grid layout to 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {members.map((member, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
            >
              {member.img ? (
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-gray-700"
                />
              ) : (
                <div className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center bg-indigo-600 text-white text-2xl font-bold border-4 border-gray-700">
                  {member.initials}
                </div>
              )}
              
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-indigo-400 font-medium">{member.role}</p>
              <p className="text-sm mt-3 text-gray-300">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
