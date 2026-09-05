import API from "./api";

/* ── DASHBOARD ─────────────────────────────────────────── */
export const getTrainerDashboard        = () => API.get("/trainer-dashboard/dashboard");
export const getTrainerBookings         = () => API.get("/trainer-dashboard/bookings");
export const getTrainerStudents         = () => API.get("/trainer-dashboard/students");

/* ── PROFILE ────────────────────────────────────────────── */
export const getMyProfile               = () => API.get("/trainers/me");
export const completeTrainerProfile     = (data) => API.post("/trainers/complete-profile", data);

/* ── CLASSES ────────────────────────────────────────────── */
export const getMyClasses               = (trainerId) => API.get(`/classes/trainer/${trainerId}`);
export const createClass                = (data) => API.post("/classes/trainer/create", data);
export const updateClass                = (id, data) => API.put(`/classes/trainer/${id}`, data);
export const deleteClass                = (id) => API.delete(`/classes/trainer/${id}`);
export const applyToInstitute           = (data) => API.post("/classes/trainer/apply-institute", data);

/* ── SESSIONS ───────────────────────────────────────────── */
export const createSession              = (data) => API.post("/sessions", data);
export const updateSession              = (id, data) => API.put(`/sessions/${id}`, data);
export const cancelSession              = (id) => API.patch(`/sessions/${id}/cancel`);
export const getTrainerTodaySessions    = () => API.get("/sessions/trainer/today");
export const getTrainerUpcomingSessions = (days = 7) => API.get(`/sessions/trainer/upcoming?days=${days}`);

/* ── NOTIFICATIONS ──────────────────────────────────────── */
export const getMyNotifications         = () => API.get("/notifications/my");
export const markNotificationRead       = (id) => API.patch(`/notifications/${id}/read`);
export const markAllNotificationsRead   = () => API.patch("/notifications/read-all");

/* ── SUBCATEGORIES / CATEGORIES / INSTITUTES (for forms) ── */
export const getSubcategories           = () => API.get("/subcategories");
export const getCategories              = () => API.get("/categories");
export const getInstitutes              = () => API.get("/institutes");