export const authUserRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role_id;

        if (!userRole) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this resource" });
        }

        next();
    };
};