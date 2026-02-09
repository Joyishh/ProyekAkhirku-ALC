import Package from "../models/packageModel.js";
import PackageItem from "../models/packageItemModel.js";
import Subject from "../models/subjectModel.js";

export const createPackage = async (req, res) =>{
    const { packageName, description, basePrice, isActive} = req.body
    try{
        if(!packageName){
            return res.status(400).json({ success: false, message: 'Nama paket wajib diisi.' });
        }

        const newPackage = await Package.create({
            packageName,
            description,
            basePrice,
            isActive
        })
        return res.status(200).json({ success: true, message: 'Paket berhasil dibuat.', data: newPackage });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ success: false, message: 'Nama paket sudah ada.' });
    }
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.', error: error.message })
    }
}

export const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.findAll({
            include: [{
                model: PackageItem,
                as: 'packageItems',
                include: [{
                    model: Subject,
                    as: 'subjectDetails',
                }],
            }],
            order: [['packageName', 'ASC']],
        });
        return res.status(200).json({ success: true, data: packages });
    } catch (error) {
        console.error('Error saat mengambil semua paket:', error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.', error: error.message });
    }
};

export const getActivePackages = async (req, res) => {
    try {
        const packages = await Package.findAll({
            where: {
                isActive: true
            },
            attributes: ['packageId', 'packageName', 'basePrice', 'description'],
            order: [['packageName', 'ASC']],
        });
        return res.status(200).json({ 
            success: true, 
            message: 'Paket aktif berhasil diambil',
            data: packages 
        });
    } catch (error) {
        console.error('Error saat mengambil paket aktif:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan pada server.', 
            error: error.message 
        });
    }
};

export const getPackageById = async (req, res) => {
    const { packageId } = req.params;
    try {
        const packages = await Package.findByPk(packageId, {
            include: [{
                model: PackageItem,
                as: 'packageItems',
                include: [{
                    model: Subject,
                    as: 'subjectDetails',
                }],
            }],
        });
        if (!packages) {
            return res.status(404).json({ success: false, message: 'Paket tidak ditemukan.' });
        }
        return res.status(200).json({ success: true, data: packages });
    } catch (error) {
        console.error('Error saat mengambil paket berdasarkan ID:', error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.', error: error.message });
    }
}

export const updatePackage = async (req, res) =>{
    const { packageId } = req.params
    const { packageName, description, basePrice, isActive} = req.body
    try{
        const packages = await Package.findByPk(packageId)
        if(!packages){
            return res.status(404).json({ success: false, message: 'Paket tidak ditemukan.' });
        }

        packages.packageName = packageName || packages.packageName
        packages.description = description === undefined ? packages.description : description;
        packages.basePrice = basePrice === undefined ? packages.basePrice : basePrice;
        packages.isActive = isActive === undefined ? packages.isActive : isActive;

        await packages.save()
        res.status(200).json({ success:true, message:'Paket berhasil diperbarui', data: packages})
    } catch(error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ success: false, message: 'Nama paket sudah ada.' });
        }
        console.error('Error saat memperbarui paket:', error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.', error: error.message });
    }
}

export const deletePackage = async (req, res) => {
    const { packageId } = req.params
    try{
        const packages = await Package.findByPk(packageId)
        if(!packages){
            return res.status(404).json({ success: false, message: 'Paket tidak ditemukan.' });
        }
        await packages.destroy()
        return res.status(200).json({ success: true, message: 'Paket berhasil dihapus.' });
    } catch (error) {
        if(error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(409).json({ success: false, message: 'Paket tidak bisa dihapus karena masih digunakan di data lain (misal: pendaftaran siswa).' });
    }
    console.error('Error saat menghapus paket:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.', error: error.message });
    }
}