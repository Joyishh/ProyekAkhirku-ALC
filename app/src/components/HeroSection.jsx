import React from "react";
import Button from "@mui/material/Button";
import { Icon } from '@iconify/react';
import HeroImage from "../assets/ImageHeroSection.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16 lg:py-24">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Content Area */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-[#1F2937]">Bimbingan Belajar</span>
              <br />
              <span className="text-[#3b82f6]">Terpadu untuk SD-SMA</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-lg">
              Wujudkan prestasi terbaik dengan metode pembelajaran yang efektif dan guru berpengalaman. 
              Gabung bersama Ababil Learning Course dan raih prestasi terbaikmu dengan bimbingan yang tepat!
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button
                variant="contained"
                startIcon={<Icon icon="material-symbols:school" />}
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#3b82f6",
                  color: "#fff",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: "16px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#2563eb",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Daftar Sekarang
              </Button>
              <Button
                variant="outlined"
                startIcon={<Icon icon="material-symbols:play-arrow" />}
                sx={{
                  borderRadius: "12px",
                  color: "#3b82f6",
                  borderColor: "#3b82f6",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: "16px",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#2563eb",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Lihat Program
              </Button>
            </div>

            {/* Statistics */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <div className="text-4xl font-bold text-[#334155] mb-1">5000+</div>
                <div className="text-[#64748b] font-medium">Siswa Aktif</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#334155] mb-1">95%</div>
                <div className="text-[#64748b] font-medium">Tingkat Kelulusan</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#334155] mb-1">15+</div>
                <div className="text-[#64748b] font-medium">Tahun Pengalaman</div>
              </div>
            </div>
          </div>

          {/* Image Area */}
          <div className="lg:w-1/2 flex justify-end">
            <div className="w-full max-w-lg">
              <img 
                src={HeroImage} 
                alt="Ilustrasi pembelajaran di ALC Learning" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
