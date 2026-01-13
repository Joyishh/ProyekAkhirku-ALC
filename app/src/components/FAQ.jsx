import React from 'react';
import { Play, ChevronDown } from 'lucide-react';

// Custom CSS untuk animasi
const customStyles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
    to {
      opacity: 1;
      max-height: 500px;
      padding-top: 1.25rem;
      padding-bottom: 1.25rem;
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      max-height: 500px;
      padding-top: 1.25rem;
      padding-bottom: 1.25rem;
    }
    to {
      opacity: 0;
      max-height: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  
  .animate-slideDown {
    animation: slideDown 0.3s ease-out forwards;
  }
  
  .animate-slideUp {
    animation: slideUp 0.3s ease-in forwards;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = customStyles;
  document.head.appendChild(styleElement);
}

const faqData = [
  {
    id: 'faq1',
    question: 'Bagaimana cara mendaftar di Ababil Learning Center?',
    answer: 'Untuk mendaftar, Anda bisa mengunjungi pusat kami langsung atau mengisi formulir pendaftaran online yang tersedia di website kami. Setelah itu, tim kami akan segera menghubungi Anda untuk proses selanjutnya.',
  },
  {
    id: 'faq2',
    question: 'Apakah ada kelas online yang tersedia?',
    answer: 'Tidak, saat ini kami hanya menyediakan kelas tatap muka di lokasi kami. Namun, kami sedang mempertimbangkan untuk menambah kelas online di masa depan.',
  },
  {
    id: 'faq3',
    question: 'Bagaimana sistem pembayarannya?',
    answer: 'Sistem pembayaran kami fleksibel, bisa melalui transfer bank, pembayaran tunai di tempat, atau melalui platform pembayaran digital yang bekerja sama dengan kami.',
  },
  {
    id: 'faq4',
    question: 'Apakah ada diskon atau promo untuk pendaftaran lebih dari satu siswa?',
    answer: 'Tentu, kami seringkali memiliki program diskon khusus untuk pendaftaran keluarga atau jika mendaftarkan lebih dari satu siswa sekaligus. Silakan hubungi tim admisi kami untuk informasi promo terkini.',
  },
  {
    id: 'faq5',
    question: 'Apakah ada sertifikat setelah menyelesaikan program?',
    answer: 'Ya, setiap siswa yang telah menyelesaikan program akan mendapatkan sertifikat resmi dari Ababil Learning Center.',
  },
  {
    id: 'faq6',
    question: 'Apakah ada sistem evaluasi atau laporan perkembangan siswa?',
    answer: 'Ada. Kami menyediakan aplikasi pendamping untuk memantau kehadiran, nilai, dan perkembangan belajar siswa secara berkala.',
  },
];

const FAQ = () => {
  const [expandedPanels, setExpandedPanels] = React.useState(new Set());
  const [closingPanels, setClosingPanels] = React.useState(new Set());

  const toggleAccordion = (panelId) => {
    setExpandedPanels(prev => {
      const newExpandedSet = new Set(prev);
      
      if (newExpandedSet.has(panelId)) {
        // Panel sedang terbuka, mulai animasi tutup
        setClosingPanels(prevClosing => new Set(prevClosing).add(panelId));
        
        // Hapus dari expanded setelah animasi selesai
        setTimeout(() => {
          setExpandedPanels(currentExpanded => {
            const updatedSet = new Set(currentExpanded);
            updatedSet.delete(panelId);
            return updatedSet;
          });
          setClosingPanels(prevClosing => {
            const updatedClosing = new Set(prevClosing);
            updatedClosing.delete(panelId);
            return updatedClosing;
          });
        }, 300); // Durasi animasi
        
        return newExpandedSet; // Return state yang sama untuk sementara
      } else {
        // Panel sedang tertutup, buka langsung
        newExpandedSet.add(panelId);
        return newExpandedSet;
      }
    });
  };

  return (
    <section id="faq" className="w-full py-12 md:py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl font-bold text-[#1F2937] mb-4">FAQ</h2>
          <p className='text-center text-lg font-medium mb-8 text-[#64748b]'>Temukan jawaban untuk pertanyaan umum seputar program kami</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((item) => {
            const isExpanded = expandedPanels.has(item.id);
            const isClosing = closingPanels.has(item.id);
            
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className={`w-full bg-[#3B82F6] text-white p-5 flex items-center justify-between transition-all duration-200 ${
                    isExpanded ? 'rounded-t-xl' : 'rounded-xl'
                  }`}
                  aria-expanded={isExpanded}
                  aria-controls={`${item.id}-content`}
                >
                  <div className="flex items-center flex-1">
                    <span className="font-medium text-left text-base md:text-lg">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-white transition-transform duration-300 flex-shrink-0 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {/* Accordion Content */}
                {(isExpanded || isClosing) && (
                  <div
                    id={`${item.id}-content`}
                    className={isClosing ? 'animate-slideUp' : 'animate-slideDown'}
                  >
                    <div className="p-5 bg-white">
                      <p className="text-[#4B5563] text-base leading-relaxed font-medium">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;