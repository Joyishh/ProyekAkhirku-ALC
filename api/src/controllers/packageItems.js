import Package from "../models/packageModel.js";
import PackageItem from "../models/packageItemModel.js";
import Subject from "../models/subjectModel.js";

export const createPackageItem = async(req, res) => {
    const { packageId } = req.params
    const { subjectId, numberOfMeets, levelSpecific } = req.body
    try{
        const packages = await Package.findByPk(packageId)
        if(!packages){
            return res.status(404).json({ success: false, message: 'Paket tidak ditemukan.' })
        }

        const subject = await Subject.findByPk(subjectId)
        if(!subject){
            return res.status(404).json({ success: false, message: 'Mata pelajaran tidak ditemukan.' })
        }

        const newPackageItems = await PackageItem.create({
            packageId,
            subjectId,
            numberOfMeets,
            levelSpecific
        })
        res.status(201).json({ success: true, message: 'Item berhasil ditambahkan ke paket.', data: newPackageItems });
    } catch (error) {
        if(error.name === 'SequelizeUniqueConstraintError'){
            return res.status(409).json({ success: false, message: 'Kombinasi mata pelajaran dan level sudah ada di paket ini.' });
        }
        console.error('Error saat menambahkan item ke paket:', error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.', error: error.message });
    }
}

export const getPackageItemByPackageId = async (req, res) => {
  const { packageId } = req.params;
  try {
    const packages = await Package.findByPk(packageId);
    if (!packages) {
      return res
        .status(404)
        .json({ success: false, message: "Paket tidak ditemukan." });
    }
    const items = await PackageItem.findAll({
      where: { packageId },
      include: [{ model: Subject, as: "subjectDetails" }],
      order: [["packageItemId", "ASC"]],
    });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("Error saat mengambil item paket:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Terjadi kesalahan pada server.",
        error: error.message,
      });
  }
};

export const updatePackageItem = async(req, res) => {
    const { packageItemId } = req.params
    const { numberOfMeets, levelSpecific } = req.body
    try{
        const items = await PackageItem.findByPk(packageItemId)
            if(!items){
                return res.status(404).json({ success: false, message: 'Item paket tidak ditemukan.' });
            }
            if(numberOfMeets !== undefined && numberOfMeets <= 0){
                return res.status(400).json({ success: false, message: 'Jumlah pertemuan harus lebih dari 0.' });
            }

            items.numberOfMeets = numberOfMeets || items.numberOfMeets
            items.levelSpecific = levelSpecific === undefined ? items.levelSpecific : levelSpecific;
            
            await items.save();
            res.status(200).json({ success: true, message: 'Item paket berhasil diperbarui.', data: items });
        } catch(error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ success: false, message: 'Update menyebabkan duplikasi kombinasi mata pelajaran dan level di paket ini.' });
        }
        console.error('Error saat memperbarui item paket:', error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.', error: error.message });
    }
}

export const deletePackageItem = async(req, res) => {
    const { packageItemId } = req.params
    try {
    const item = await PackageItem.findByPk(packageItemId);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item paket tidak ditemukan.' });
    }

    await item.destroy();
    res.status(200).json({ success: true, message: 'Item paket berhasil dihapus.' });
    } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(409).json({ success: false, message: 'Item paket tidak bisa dihapus karena masih digunakan.' });
    }
    console.error('Error saat menghapus item paket:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.', error: error.message });
  }
}