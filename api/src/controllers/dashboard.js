import Registration from "../models/registrationModel.js";
import StudentEnrollment from "../models/studentEnrollmentModel.js";
import Users from "../models/userModel.js";
import Student from "../models/studentModel.js";

/**
 * Get Admin Dashboard Statistics
 * Fetches key performance indicators for admin dashboard
 */
export const getAdminDashboardStats = async (req, res) => {
    try {
        // Fetch all statistics concurrently using Promise.all
        const [pendingCount, activeStudentCount, totalRegistrations] = await Promise.all([
            // 1. Count pending registrations (awaiting review)
            Registration.count({
                where: { status: 'pending_review' }
            }),

            // 2. Count active students (unique student_id from enrollments)
            StudentEnrollment.count({
                distinct: true,
                col: 'student_id',
                where: { status: 'aktif' }
            }),

            // 3. Count total approved registrations (all time)
            Registration.count({
                where: { status: 'approved' }
            })
        ]);

        return res.status(200).json({
            success: true,
            data: {
                pendingCount,
                activeStudentCount,
                totalRegistrations
            }
        });

    } catch (error) {
        console.error("Get admin dashboard stats error:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil statistik dashboard",
            error: error.message
        });
    }
};

// TODO: Add future dashboard stats functions
// export const getTeacherDashboardStats = async (req, res) => { ... }
// export const getStudentDashboardStats = async (req, res) => { ... }