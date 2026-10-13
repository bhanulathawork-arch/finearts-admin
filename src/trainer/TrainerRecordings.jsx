import { useEffect, useMemo, useState } from "react";
import { getAuth } from "firebase/auth";
import { BookOpen, Search, Video, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
const getAuthConfig = async () => {
let token = localStorage.getItem("token");
try {
const auth = getAuth();
if (auth.currentUser) {
token = await auth.currentUser.getIdToken(true);
}
} catch (error) {
console.warn("Firebase token error:", error);
}
return {
headers: token
? {
Authorization: `Bearer ${token}`,
}
: {},
};
};
const normalizeClasses = (payload) => {
const root = payload?.data ?? payload ?? {};
const data =
root?.classes ??
root?.data?.classes ??
root?.rows ??
root?.data ??
root;
return Array.isArray(data) ? data : [];
};
const getClassType = (item) =>
String(
item?.class_type ??
item?.classType ??
item?.type ??
"LIVE"
)
.trim()
.toUpperCase();
const getCategoryName = (item) =>
item?.category_name ??
item?.categoryName ??
item?.category?.name ??
item?.category ??
"General";
const getImage = (item) =>
item?.image ??
item?.image_url ??
item?.imageUrl ??
item?.thumbnail ??
item?.thumbnail_url ??
"";
export default function TrainerRecordings() {
const navigate = useNavigate();
const [classes, setClasses] = useState([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
const fetchClasses = async () => {
try {
setLoading(true);
const response = await API.get(
"/classes/trainer/my-classes",
await getAuthConfig()
);
const allClasses = normalizeClasses(response.data);
const recordedClasses = allClasses.filter(
(item) => ["RECORDING", "RECORDED"].includes(getClassType(item))
);
setClasses(recordedClasses);
} catch (error) {
console.error("FETCH RECORDING CLASSES ERROR:", error);
toast.error(
error?.response?.data?.message ||
"Failed to load recording classes."
);
setClasses([]);
} finally {
setLoading(false);
}
};
useEffect(() => {
fetchClasses();
}, []);
const filteredClasses = useMemo(() => {
const query = search.trim().toLowerCase();
if (!query) {
return classes;
}
return classes.filter((item) => {
const title = String(
item?.title ?? item?.name ?? ""
).toLowerCase();
const category = String(
getCategoryName(item)
).toLowerCase();
const classType = getClassType(item).toLowerCase();
return (
title.includes(query) ||
category.includes(query) ||
classType.includes(query)
);
});
}, [classes, search]);
const openLMS = (classItem) => {
const classId =
classItem?.id ??
classItem?.class_id;
if (!classId) {
toast.error("Class ID not found.");
return;
}
navigate(`/trainer/lms/${classId}`);
};
return (
<div className="min-h-screen bg-[#07070b] text-white px-5 py-7 sm:px-7 lg:px-8">
<div className="mx-auto max-w-[1450px]">
{/* HEADER */}
<div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
<div>
<h1 className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
Recording Classes
</h1>
<p className="mt-2 text-sm text-white sm:text-base">
Manage your recorded classes and open their LMS.
</p>
</div>
<button
type="button"
onClick={fetchClasses}
disabled={loading}
className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
>
<RefreshCw
size={17}
className={loading ? "animate-spin" : ""}
/>
Refresh
</button>
</div>
{/* SEARCH */}
<div className="mb-7 bg-transparent p-0">
<div className="relative">
<Search
size={20}
className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white"
/>
<input
type="text"
value={search}
onChange={(event) => setSearch(event.target.value)}
placeholder="Search recording classes..."
className="h-14 w-full rounded-xl border border-white/10 bg-[#15121f] pl-12 pr-4 text-white placeholder:text-white outline-none transition focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10"
/>
</div>
</div>
{/* COUNT */}
{/* LOADING */}
{loading && (
<div className="py-20 text-center text-white">
Loading recording classes...
</div>
)}
{/* EMPTY */}
{!loading && filteredClasses.length === 0 && (
<div className="rounded-2xl border border-white/10 bg-[#101019] py-20 text-center">
<Video
size={42}
className="mx-auto mb-4 text-white"
/>
<h3 className="text-lg font-bold text-white">
No recording classes found
</h3>
<p className="mt-2 text-sm text-white">
{search
? "Try a different search."
: "You do not have any recorded classes yet."}
</p>
</div>
)}
{/* CLASS CARDS */}
{!loading && filteredClasses.length > 0 && (
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
{filteredClasses.map((item) => {
const classId =
item?.id ?? item?.class_id;
const title =
item?.title ??
item?.name ??
"Untitled Class";
const image = getImage(item);
return (
<div
key={classId}
className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111118] shadow-xl transition duration-300 hover:-translate-y-1 hover:border-pink-500/30"
>
{/* IMAGE */}
<div className="relative h-40 w-full shrink-0 overflow-hidden bg-[#191523]">
{image ? (
<img
src={image}
alt={title}
className="h-full w-full object-cover"
onError={(event) => {
event.currentTarget.style.display = "none";
}}
/>
) : (
<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-900/40 via-[#191523] to-pink-900/30">
<BookOpen
size={48}
className="text-purple-300/50"
/>
</div>
)}
<div className="absolute left-3 top-3 rounded-lg border border-pink-400/20 bg-black/60 px-3 py-1.5 text-xs font-bold text-pink-300 backdrop-blur">
RECORDED
</div>
</div>
{/* CONTENT */}
<div className="flex flex-1 flex-col p-5">
<h3 className="min-h-[28px] truncate text-lg font-bold leading-7 text-white">
{title}
</h3>
<div className="mt-4 flex items-center justify-between gap-4">
<p className="text-xs font-semibold uppercase tracking-wider text-white">
Category
</p>
<p className="truncate text-sm font-semibold text-white">
{getCategoryName(item)}
</p>
</div>
{/* OPEN LMS */}
<div className="mt-auto pt-5">
<button
type="button"
onClick={() => openLMS(item)}
className="flex h-11 w-full items-center justify-center gap-2 rounded-xl font-bold text-white transition hover:scale-[1.01]"
style={{
background:
"linear-gradient(135deg,#9b2cff,#ff2aae)",
}}
>
<BookOpen size={18} />
Open LMS
</button>
</div>
</div>
</div>
);
})}
</div>
)}
</div>
</div>
);
}
