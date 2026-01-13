import React from 'react';
import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';

const Footer = () => {
  const contactInfo = {
    address: "Jl. Ahmad Yani, Kec. Muara Dua",
    city: "Ogan Komering Ulu Selatan, Sumatera Selatan 32211",
    phone: "0812-3456-789",
    email: "alcmuaradua@gmail.com"
  };

  const operationalHours = [
    { day: "Senin - Sabtu", time: "10:00 - 19:00" }
  ];

  const socialLinks = [
    { icon: "mdi:facebook", url: "#!" },
    { icon: "mdi:instagram", url: "#!" },
    { icon: "mdi:youtube", url: "#!" },
    { icon: "mdi:whatsapp", url: "#!" },
    { icon: "ic:baseline-tiktok", url: "#!" }
  ];

  const footerLinks = [
    { text: "Privacy Policy", url: "#!" },
    { text: "Terms of Service", url: "#!" },
    { text: "Sitemap", url: "#!" }
  ];

  return (
    <footer className="bg-[#1F2937] text-white">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-20 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Kolom 1: Logo + Deskripsi */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold">Ababil Learning Course</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Bimbingan belajar terpercaya dengan metode pembelajaran modern dan guru 
              berpengalaman untuk meraih prestasi terbaik.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                >
                  <Icon icon={social.icon} className="text-white text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Kontak Kami */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Kontak Kami</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Icon icon="material-symbols:location-on" className="text-blue-400 text-xl mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{contactInfo.address}</p>
                  <p className="text-gray-300">{contactInfo.city}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon icon="material-symbols:call" className="text-blue-400 text-xl flex-shrink-0" />
                <p className="text-gray-300">{contactInfo.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Icon icon="material-symbols:mail" className="text-blue-400 text-xl flex-shrink-0" />
                <p className="text-gray-300">{contactInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Kolom 3: Jam Operasional */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Jam Operasional</h3>
            <div className="space-y-3">
              {operationalHours.map((schedule, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-300">{schedule.day}</span>
                  <span className="text-white font-medium">{schedule.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom 4: Lokasi */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Lokasi</h3>
            <div className="w-full h-32 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.291626123047!2d104.0673111757475!3d-4.541433947850012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e38437ebac2dd89%3A0xf13c8f625a41480f!2sKURSUS%20ALC%20MUARADUA%20(%20Komputer%2C%20Bahasa%20Inggris%2C%20Bimbel%20%26%20CALISTUNG)!5e0!3m2!1sen!2sid!4v1758615455700!5m2!1sen!2sid" 
                width="100%" 
                height="128"
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi ALC Learning Center"
              />
            </div>
            <Button
              variant="contained"
              startIcon={<Icon icon="material-symbols:location-on" />}
              onClick={() => window.open('https://maps.google.com/maps?q=KURSUS+ALC+MUARADUA+(%20Komputer,+Bahasa+Inggris,+Bimbel+%26+CALISTUNG)&t=&z=15&ie=UTF8&iwloc=&output=embed', '_blank')}
              sx={{
                borderRadius: "8px",
                backgroundColor: "#3b82f6",
                color: "#fff",
                fontWeight: 500,
                px: 3,
                py: 1.5,
                fontSize: "14px",
                textTransform: "none",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#2563eb",
                },
              }}
            >
              Lihat Peta
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 ALC Learning Course. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;