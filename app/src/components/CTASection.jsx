import React from 'react';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';

const CTASection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-16 md:py-20">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-20">
        <div className="text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Siap Meraih Prestasi Terbaik?
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Bergabunglah dengan ribuan siswa yang telah merasakan peningkatan prestasi 
            akademik bersama ALC Learning Course. Mulai perjalanan sukses Anda hari ini!
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="contained"
              startIcon={<Icon icon="material-symbols:school" />}
              sx={{
                borderRadius: "12px",
                backgroundColor: "#fff",
                color: "#3b82f6",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                fontSize: "16px",
                textTransform: "none",
                minWidth: "160px",
                "&:hover": {
                  backgroundColor: "#f8fafc",
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
              startIcon={<Icon icon="material-symbols:call" />}
              sx={{
                borderRadius: "12px",
                color: "#fff",
                borderColor: "#fff",
                borderWidth: "2px",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                fontSize: "16px",
                textTransform: "none",
                minWidth: "160px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "#fff",
                  borderWidth: "2px",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Hubungi Kami
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
