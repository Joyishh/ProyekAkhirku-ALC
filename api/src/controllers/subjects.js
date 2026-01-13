import Subject from "../models/subjectModel.js";

export const createSubject = async(req, res) => {
    const { subjectName, description } = req.body
    try{
        if(!subjectName){
            return res.status(400).json({ success: false, message: 'Nama mata pelajaran wajib diisi.'})
        }
        const newSubject = await Subject.create({
            subjectName,
            description
        })
        return res.status(201).json({ success: true, message: 'Nama mata pelajaran berhasil dibuat.', data: newSubject})
    } catch (error){
        return res.status(500).json({ success: false, message: 'Terjadi kesalahan saat membuat mata pelajaran.', error: error.message });
    }
}

export const getAllSubjects = async(req, res) => {
    try{
        const subjects = await Subject.findAll({
            order: [['subjectName', 'DESC']],
        })
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengambil data mata pelajaran.', error: error.message });
    }
}

export const getSubjectsById = async(req, res) => {
    const { subjectId } = req.params
    try{
        const subject = await Subject.findOne({
            where: { subjectId },
        });
        if (!subject) {
            return res.status(404).json({ success: false, message: 'Mata pelajaran tidak ditemukan.' });
        }
        res.status(200).json({ success: true, data: subject });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengambil data mata pelajaran.', error: error.message });
    }
}

export const editSubject = async (req, res) => {
    const { subjectId } = req.params;
    const { subjectName, description } = req.body;

    try {
        const subject = await Subject.findOne({
            where: { subjectId },
        });

        if (!subject) {
            return res.status(404).json({ success: false, message: 'Mata pelajaran tidak ditemukan.' });
        }

        if (subjectName) subject.subjectName = subjectName;
        if (description) subject.description = description;

        await subject.save();

        res.status(200).json({ success: true, message: 'Mata pelajaran berhasil diperbarui.', data: subject });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Terjadi kesalahan saat memperbarui data mata pelajaran.', error: error.message });
    }
};

export const deleteSubject = async (req, res) => {
    const { subjectId } = req.params;
    try {
        const subject = await Subject.findOne({
            where: { subjectId },
        });

        if (!subject) {
            return res.status(404).json({ success: false, message: 'Mata pelajaran tidak ditemukan.' });
        }

        await subject.destroy();
        res.status(200).json({ success: true, message: 'Mata pelajaran berhasil dihapus.' });
    } catch (error) {
        console.error("Error deleting subject:", error);
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ success: false, message: 'Tidak dapat menghapus mata pelajaran karena masih terkait dengan data lain.' });
        }
        res.status(500).json({ success: false, message: 'Terjadi kesalahan saat menghapus mata pelajaran.', error: error.message });
    }
};