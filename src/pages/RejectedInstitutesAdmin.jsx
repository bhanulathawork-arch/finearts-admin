
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import axios from "axios";

import { Search, Trash2 } from "lucide-react";

import { FaTimes, FaTrash } from "react-icons/fa";



export default function RejectedInstitutesAdmin() {

  const [institutes, setInstitutes] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");



  // Delete confirmation

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [instituteToDelete, setInstituteToDelete] = useState(null);

  const [deleting, setDeleting] = useState(false);



  const token = localStorage.getItem("adminToken");



  // --------------------------------------------------

  // Helper: Get image URL

  // --------------------------------------------------

  const getImageUrl = (img) => {

    if (!img) return "";



    if (img.startsWith("http")) {

      return img;

    }



    // return `https://finearts-backend.onrender.com${img}`;
    return `http://localhost:5000${img}`;

  };



  // --------------------------------------------------

  // Helper: Get category names

  // Supports multiple categories

  // --------------------------------------------------

  const getCategories = (institute) => {

    if (!Array.isArray(institute?.categories)) {

      return [];

    }



    return institute.categories

      .map((item) => item?.category_name)

      .filter(Boolean);

  };



  // --------------------------------------------------

  // Filtered institutes

  // --------------------------------------------------

  const filteredInstitutes = institutes.filter((inst) => {

    const query = searchQuery.trim().toLowerCase();



    if (!query) return true;



    const categories = getCategories(inst);



    return (

      inst.name?.toLowerCase().includes(query) ||

      inst.description?.toLowerCase().includes(query) ||

      inst.email?.toLowerCase().includes(query) ||

      inst.phone_number?.toLowerCase?.().includes(query) ||

      inst.city?.toLowerCase().includes(query) ||

      inst.state?.toLowerCase().includes(query) ||

      String(inst.id || "").includes(query) ||


      categories.some((category) =>

        category.toLowerCase().includes(query)

      )

    );

  });



  // --------------------------------------------------

  // Fetch rejected institutes

  // --------------------------------------------------

  const fetchRejectedInstitutes = async () => {

    try {

      setLoading(true);



      const res = await axios.get(

        // "https://finearts-backend.onrender.com/api/institutes/admin/rejected",
        "http://localhost:5000/api/institutes/admin/rejected",

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );



      setInstitutes(res.data.data || []);

    } catch (error) {

      console.error("Fetch rejected institutes error:", error);



      toast.error(

        error?.response?.data?.message ||

          "Failed to fetch rejected institutes"

      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchRejectedInstitutes();

  }, []);



  // --------------------------------------------------

  // Delete

  // --------------------------------------------------

  const handleDeleteClick = (institute) => {

    setInstituteToDelete(institute);

    setShowDeleteModal(true);

  };



  const closeDeleteModal = () => {

    if (deleting) return;



    setShowDeleteModal(false);

    setInstituteToDelete(null);

  };



  const confirmDelete = async () => {

    if (!instituteToDelete || deleting) return;



    try {

      setDeleting(true);



      await axios.delete(

        // `https://finearts-backend.onrender.com/api/institutes/${instituteToDelete.id}`,

        `http://localhost:5000/api/institutes/${instituteToDelete.id}`,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );



      toast.success("Institute deleted successfully");



      setInstitutes((prev) =>

        prev.filter((inst) => inst.id !== instituteToDelete.id)

      );



      setShowDeleteModal(false);

      setInstituteToDelete(null);

    } catch (error) {

      console.error("Delete institute error:", error);



      toast.error(

        error?.response?.data?.message || "Delete failed"

      );

    } finally {

      setDeleting(false);

    }

  };



  return (

    <div className="p-0 text-white">

      {/* =====================================================

          HEADER

      ====================================================== */}

      <div className="mb-5">

        <h1 className="text-4xl font-bold text-purple-400 leading-tight">

          Rejected Institutes

        </h1>



        <p className="text-white mt-1">

          Institutes rejected by admin

        </p>

      </div>



      {/* =====================================================

          SEARCH

      ====================================================== */}

      <div className="mb-4">

        <div className="relative w-full">

          <Search

            className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"

            size={18}

          />



          <input

            type="text"

            placeholder="Search rejected institutes..."

            value={searchQuery}

            onChange={(e) => setSearchQuery(e.target.value)}

            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"

          />



          {searchQuery && (

            <button

              onClick={() => setSearchQuery("")}

              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-purple-400 transition-colors"

              type="button"

            >

              <FaTimes size={14} />

            </button>

          )}

        </div>

      </div>



      {/* =====================================================

          TABLE

          Removed:

          - Timing

          - Courses

      ====================================================== */}

      <div className="w-full min-w-0 bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

  <table className="w-full min-w-[900px] border-collapse">

            <thead className="bg-[#202027] text-white">

              <tr>

                <th className="p-4 text-left whitespace-nowrap">

                  Image

                </th>



                <th className="p-4 text-left whitespace-nowrap">

                  Name

                </th>



                <th className="p-4 text-left whitespace-nowrap">

                  Description

                </th>



                <th className="p-4 text-left whitespace-nowrap">

                  Email

                </th>



                <th className="p-4 text-left whitespace-nowrap">

                  Phone

                </th>



                <th className="p-4 text-left whitespace-nowrap">

                  City

                </th>



                <th className="p-4 text-left whitespace-nowrap">

                  State

                </th>



                <th className="p-4 text-left whitespace-nowrap">

                  Category

                </th>







                <th className="p-4 text-left whitespace-nowrap">

                  Status

                </th>



                <th className="p-4 text-left whitespace-nowrap">

                  Actions

                </th>

              </tr>

            </thead>



            <tbody>

              {/* =====================================================

                  LOADING

              ====================================================== */}

              {loading ? (

                <tr>

                  <td colSpan={10} className="p-12 text-center">

                    <div className="flex flex-col items-center gap-3">

                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />



                      <p className="text-white">

                        Loading institutes...

                      </p>

                    </div>

                  </td>

                </tr>

              ) : filteredInstitutes.length === 0 ? (

                <tr>

                  <td colSpan={10} className="p-12 text-center">

                    <div className="flex flex-col items-center gap-3">

                      <Search size={40} className="text-white" />



                      <p className="text-white text-lg">

                        {searchQuery

                          ? "No institutes found matching your search"

                          : "No rejected institutes"}

                      </p>



                      {searchQuery && (

                        <button

                          onClick={() => setSearchQuery("")}

                          className="text-purple-400 hover:text-purple-300 text-sm mt-1 transition-colors"

                          type="button"

                        >

                          Clear search

                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ) : (

                filteredInstitutes.map((inst) => {

                  const categories = getCategories(inst);

              

                  return (

                    <tr

                      key={inst.id}

                      className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"

                    >

                      {/* IMAGE */}

                      <td className="p-4">

                        {inst.image_url ? (

                          <img

                            src={getImageUrl(inst.image_url)}

                            alt={inst.name}

                            className="w-11 h-11 rounded-xl object-cover border border-[#333]"

                            onError={(e) => {

                              e.currentTarget.style.display = "none";

                            }}

                          />

                        ) : (

                          <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs">

                            N/A

                          </div>

                        )}

                      </td>



                      {/* NAME */}

                      <td className="p-4 font-medium whitespace-nowrap">

                        {inst.name || "-"}

                      </td>



                      {/* DESCRIPTION */}

                      <td className="p-4 text-white max-w-[180px] truncate">

                        {inst.description || "-"}

                      </td>



                      {/* EMAIL */}

                      <td className="p-4 text-white whitespace-nowrap">

                        {inst.email || "-"}

                      </td>



                      {/* PHONE */}

                      <td className="p-4 text-white whitespace-nowrap">

                        {inst.phone_number || "-"}

                      </td>



                      {/* CITY */}

                      <td className="p-4 text-white whitespace-nowrap">

                        {inst.city || "-"}

                      </td>



                      {/* STATE */}

                      <td className="p-4 text-white whitespace-nowrap">

                        {inst.state || "-"}

                      </td>



                      {/* =================================================

                          MULTIPLE CATEGORIES

                      ================================================== */}

                      <td className="p-4 min-w-[180px]">

                        {categories.length > 0 ? (

                          <div className="flex flex-wrap gap-1.5">

                            {categories.map((category, index) => (

                              <span

                                key={`${category}-${index}`}

                                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/15 text-purple-300 border border-purple-500/20"

                              >

                                {category}

                              </span>

                            ))}

                          </div>

                        ) : (

                          <span className="text-white">-</span>

                        )}

                      </td>



                      {/* STATUS */}

                      <td className="p-4 whitespace-nowrap">

                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">

                          REJECTED

                        </span>

                      </td>



                      {/* ACTIONS */}

                      <td className="p-4">

                        <div className="flex items-center gap-2">

                          <button

                            onClick={() => handleDeleteClick(inst)}

                            className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"

                            title="Delete institute"

                            type="button"

                          >

                            <Trash2

                              size={15}

                              className="text-red-500/70 group-hover:text-red-400 transition-colors"

                            />

                          </button>

                        </div>

                      </td>

                    </tr>

                  );

                })

              )}

            </tbody>

          </table>

        </div>

      </div>



      {/* =====================================================

          DELETE CONFIRMATION MODAL

      ====================================================== */}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="w-full max-w-[420px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

            <div className="p-8 flex flex-col items-center">

              {/* ICON */}

              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">

                <FaTrash className="text-red-400 text-lg" />

              </div>



              {/* TITLE */}

              <h2 className="text-xl font-bold text-white mb-3 text-center">

                Delete Institute

              </h2>



              {/* DESCRIPTION */}

              <p className="text-white text-center text-sm leading-relaxed mb-8">

                Are you sure you want to delete{" "}

                <span className="text-white font-semibold">

                  {instituteToDelete?.name}

                </span>

                ?

                <br />

                <span className="text-gray-400">

                  This action cannot be undone.

                </span>

              </p>



              {/* BUTTONS */}

              <div className="flex gap-3 w-full">

                <button

                  onClick={closeDeleteModal}

                  disabled={deleting}

                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"

                  type="button"

                >

                  Cancel

                </button>



                <button

                  onClick={confirmDelete}

                  disabled={deleting}

                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity text-sm disabled:opacity-50 disabled:cursor-not-allowed"

                  type="button"

                >

                  {deleting ? "Deleting..." : "Delete"}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}


