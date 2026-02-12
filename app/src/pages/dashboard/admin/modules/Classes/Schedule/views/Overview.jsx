import React, { useState, useEffect } from 'react';
import DataTable from '../../../../../../components/DataTable';
import { classScheduleService } from '../../../../../../services/classScheduleService';
import ScheduleModal from './ScheduleModal';

const Overview = ({ classId }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dayTranslation = {
    'Monday': 'Senin',
    'Tuesday': 'Selasa',
    'Wednesday': 'Rabu',
    'Thursday': 'Kamis',
    'Friday': 'Jumat',
    'Saturday': 'Sabtu',
    'Sunday': 'Minggu'
  };

  useEffect(() => {
    if (classId) {
      fetchSchedules();
    }
  }, [classId]);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const data = await classScheduleService.getSchedulesByClass(classId);
      setSchedules(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      try {
        await classScheduleService.deleteSchedule(id);
        fetchSchedules();
      } catch (error) {
        console.error('Error deleting schedule:', error);
        alert('Gagal menghapus jadwal. Silakan coba lagi.');
      }
    }
  };

  const columns = [
    {
      header: 'Mata Pelajaran',
      accessor: 'subject',
      render: (row) => row.subject?.name || '-'
    },
    {
      header: 'Guru',
      accessor: 'teacher',
      render: (row) => row.teacher?.full_name || '-'
    },
    {
      header: 'Hari',
      accessor: 'day_of_week',
      render: (row) => dayTranslation[row.day_of_week] || row.day_of_week
    },
    {
      header: 'Waktu',
      accessor: 'time',
      render: (row) => `${row.start_time} - ${row.end_time}`
    },
    {
      header: 'Ruangan',
      accessor: 'location_or_room',
      render: (row) => row.location_or_room || '-'
    },
    {
      header: 'Aksi',
      accessor: 'actions',
      render: (row) => (
        <button
          onClick={() => handleDelete(row.id)}
          className="btn btn-danger btn-sm"
        >
          Hapus
        </button>
      )
    }
  ];

  return (
    <div className="schedule-overview">
      <div className="overview-header">
        <h3>Jadwal Pelajaran</h3>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn btn-primary"
        >
          Tambah Jadwal
        </button>
      </div>

      {loading ? (
        <div className="loading">Memuat jadwal...</div>
      ) : (
        <DataTable
          columns={columns}
          data={schedules}
          emptyMessage="Belum ada jadwal pelajaran"
        />
      )}

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classId={classId}
        onSuccess={fetchSchedules}
      />
    </div>
  );
};

export default Overview;