import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';

// Material-UI Card Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// Iconify
import { Icon } from '@iconify/react';

import Testi1 from '../assets/GambarTesti1.jpg';
import Testi2 from '../assets/GambarTesti2.jpg';
import Testi3 from '../assets/GambarTesti3.jpg';

const testimonials = [
  {
    name: 'Ibu Sarah Wijaya',
    role: 'Orang Tua Siswa SMP',
    photo: Testi1,
    rating: 5,
    text: 'Sejak bergabung dengan ALC Learning, nilai matematika anak saya meningkat drastis. Guru-gurunya sabar dan metode mengajarnya mudah dipahami.'
  },
  {
    name: 'Ahmad Rizky',
    role: 'Siswa Kelas 12',
    photo: Testi2,
    rating: 5,
    text: 'Kursus bahasa Inggris di ALC sangat membantu saya lulus TOEFL dengan skor tinggi. Fasilitasnya lengkap dan suasana belajarnya menyenangkan.'
  },
  {
    name: 'Ibu Maya Sari',
    role: 'Orang Tua Siswa SD',
    photo: Testi3,
    rating: 5,
    text: 'Program coding untuk anak-anak di ALC Learning sangat bagus. Anak saya jadi lebih tertarik dengan teknologi dan berpikir logis.'
  },
  {
    name: 'Budi Santoso',
    role: 'Siswa SMA',
    photo: Testi1,
    rating: 5,
    text: 'Bimbingan belajar di ALC membantu saya masuk PTN impian. Materinya lengkap dan cara mengajarnya sangat efektif.'
  },
  {
    name: 'Ibu Rina',
    role: 'Orang Tua Siswa SD',
    photo: Testi2,
    rating: 5,
    text: 'Anak saya jadi lebih percaya diri dalam belajar. Guru-guru di ALC sangat profesional dan sabar dalam mengajar.'
  },
  {
    name: 'Dimas Pratama',
    role: 'Mahasiswa',
    photo: Testi3,
    rating: 5,
    text: 'Kursus desain grafis di ALC sangat membantu karir saya. Sekarang saya sudah bekerja di agency ternama.'
  }
];

const Testimonials = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        icon="material-symbols:star"
        className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="testimonials" className="w-full bg-gray-100 py-16 md:py-20">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1F2937] mb-4">Apa Kata Mereka</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Testimoni dari siswa dan orang tua yang telah merasakan manfaatnya
          </p>
        </div>

        {/* Container with padding for shadow */}
        <div className="px-2 md:px-4 py-2">
          {/* Testimonials Carousel */}
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            slidesPerView={1}
            spaceBetween={24}
            centeredSlides={false}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="testimonials-swiper !pb-6 !px-2"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between min-h-[320px] mx-1">
                  {/* Rating Stars */}
                  <div className="flex justify-center mb-4">
                    {renderStars(testimonial.rating)} 
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-center mb-6 leading-relaxed text-base flex-grow">
                    "{testimonial.text}"
                  </p>

                  {/* Profile */}
                  <div className="flex flex-col items-center mt-auto">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover mb-3 border-3 border-blue-100"
                    />
                    <h4 className="font-bold text-[#1F2937] text-base mb-1">{testimonial.name}</h4>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;