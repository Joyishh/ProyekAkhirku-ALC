import React from 'react'
import { Icon } from '@iconify/react'

const programs = [
  {
    icon: 'lucide:school',
    iconBg: 'bg-[#1976A5]',
    title: 'Bimbel Sekolah',
    titleColor: 'text-[#1976A5]',
    desc: 'Program bimbingan belajar untuk jenjang SD, SMP, dan SMA yang dirancang mengikuti kurikulum nasional, bertujuan memperkuat pemahaman materi, meningkatkan nilai akademik, serta mempersiapkan siswa menghadapi ujian sekolah dan seleksi masuk perguruan tinggi.'
  },
  {
    icon: 'mdi:earth',
    iconBg: 'bg-[#3797AF]',
    title: 'Kursus Bahasa',
    titleColor: 'text-[#3797AF]',
    desc: 'Pelatihan bahasa Inggris yang interaktif dan menyenangkan, difokuskan pada penguasaan empat keterampilan utama listening, speaking, reading, dan writing dengan metode praktis untuk meningkatkan kepercayaan diri dalam berkomunikasi global.'
  },
  {
    icon: 'mdi:monitor',
    iconBg: 'bg-[#13293D]',
    title: 'Kursus IT',
    titleColor: 'text-[#13293D]',
    desc: 'Program pelatihan keterampilan digital yang mencakup penguasaan aplikasi perkantoran dan desain, dirancang untuk siswa dan umum guna menghadapi tuntutan dunia kerja dan teknologi masa kini.'
  }
]

const ProgramCard = () => {
  return (
    <section id="programs" className='w-full bg-white py-12'>
      <div className='max-w-screen-2xl mx-auto px-8 md:px-20'>
        <h2 className='text-4xl font-bold text-center mb-4 text-[#1F2937]'>Program Unggulan Kami</h2>
        <p className='text-center text-lg font-medium mb-8 text-[#64748b]'>Pilih program yang sesuai dengan kebutuhan dan tingkat pendidikan Anda</p>
        <div className='flex flex-col md:flex-row gap-8 justify-center items-stretch'>
          {programs.map((program, idx) => (
            <div
              key={idx}
              className='flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center transition-transform hover:-translate-y-2 hover:border-blue-200'
              style={{ minWidth: 280, maxWidth: 350 }}
            >
              <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full ${program.iconBg}`}>
                <Icon icon={program.icon} color="#fff" width="48" height="48" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${program.titleColor}`}>{program.title}</h3>
              <p className="text-gray-700 font-normal">{program.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProgramCard