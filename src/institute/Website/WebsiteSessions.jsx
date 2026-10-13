

import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import {

  HiCalendar,

  HiClock,

  HiVideoCamera,

  HiLockClosed,

  HiCheckCircle,

  HiExclamationCircle,

  HiSearch,

  HiChevronLeft,

  HiChevronRight,

  HiUser,

  HiBookOpen,

} from "react-icons/hi";

import API from "../../services/api";

import { getTimezone } from "../../utils/timezone";

/* =========================================================

   TIME HELPERS

\========================================================= */

const formatTime = (time) => {

  if (!time) return "-";

  const value = String(time).slice(0, 8);

  const [h, m] = value.split(":");

  let hour = Number(h);

  if (Number.isNaN(hour)) return value;

  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return `${hour}:${m} ${ampm}`;

};

const normalizeDays = (days) => {

  if (!days) return [];

  if (Array.isArray(days)) {

    return days

      .map((d) =>

        typeof d === "string"

          ? d

          : d?.day_name || d?.name

      )

      .filter(Boolean);

  }

  if (typeof days === "string") {

    try {

      const parsed = JSON.parse(days);

      if (Array.isArray(parsed)) {

        return normalizeDays(parsed);

      }

    } catch {}

    return days

      .split(",")

      .map((d) => d.trim())

      .filter(Boolean);

  }

  return [];

};

const makeDaysLabel = (days) => {

  const list = normalizeDays(days);

  if (!list.length) {

    return "Schedule not configured";

  }

  if (list.length === 1) {

    return `Every ${list[0]}`;

  }

  if (list.length === 2) {

    return `Every ${list[0]} & ${list[1]}`;

  }

  return `Every ${list

    .slice(0, -1)

    .join(", ")} & ${

    list[list.length - 1]

  }`;

};

const getNow = (

  timezone = "Asia/Kolkata"

) => {

  const parts =

    new Intl.DateTimeFormat(

      "en-US",

      {

        timeZone: timezone,

        hour: "2-digit",

        minute: "2-digit",

        second: "2-digit",

        hour12: false,

      }

    ).formatToParts(new Date());

  const get = (type) =>

    parts.find(

      (p) => p.type === type

    )?.value || "00";

  return `${

    get("hour") === "24"

      ? "00"

      : get("hour")

  }:${get("minute")}:${get(

    "second"

  )}`;

};

const getToday = (

  timezone = "Asia/Kolkata"

) =>

  new Intl.DateTimeFormat(

    "en-US",

    {

      timeZone: timezone,

      weekday: "long",

    }

  ).format(new Date());

/* =========================================================

   SESSION STATUS

\========================================================= */

const getStatus = (

  session,

  viewerTimezone

) => {

  const days = normalizeDays(

    session.days ||

      session.available_days ||

      session.class_days

  );

  const start =

    session.start_time ||

    session.local_start_time;

  let end =

    session.end_time ||

    session.local_end_time;

  if (!days.length || !start) {

    return "SCHEDULED";

  }

  const today =

    getToday(viewerTimezone);

  const isToday = days.some(

    (d) =>

      String(d).toLowerCase() ===

      today.toLowerCase()

  );

  if (!isToday) {

    return "UPCOMING";

  }

  if (!end && session.duration) {

    const [h, m] = String(start)

      .slice(0, 8)

      .split(":")

      .map(Number);

    if (

      Number.isFinite(h) &&

      Number.isFinite(m)

    ) {

      const total =

        h * 60 +

        m +

        Number(session.duration);

      end = `${String(

        Math.floor(total / 60) % 24

      ).padStart(2, "0")}:${String(

        total % 60

      ).padStart(2, "0")}:00`;

    }

  }

  if (!end) {

    return "UPCOMING";

  }

  const now =

    getNow(viewerTimezone).slice(

      0,

      8

    );

  const startValue =

    String(start).slice(0, 8);

  const endValue =

    String(end).slice(0, 8);

  if (

    now >= startValue &&

    now <= endValue

  ) {

    return "LIVE";

  }

  if (now > endValue) {

    return "COMPLETED";

  }

  return "UPCOMING";

};

/* =========================================================

   NORMALIZE SESSION

\========================================================= */

const normalizeSession = (

  session,

  booking

) => {

  const cls =

    session?.class ||

    booking?.class ||

    {};

  const trainer =

    session?.trainer ||

    booking?.trainer ||

    {};

  const days = normalizeDays(

    session?.days ||

      session?.available_days ||

      session?.class_days

  );

  return {

    ...session,

    id:

      session?.id ||

      session?.session_id ||

      booking?.session_id,

    session_id:

      session?.session_id ||

      session?.id ||

      booking?.session_id,

    booking_id:

      booking?.id ||

      booking?.booking_id ||

      session?.booking_id,

    class_id:

      session?.class_id ||

      booking?.class_id ||

      cls?.id,

    class_title:

      session?.class_title ||

      session?.class_name ||

      booking?.class_title ||

      booking?.class_name ||

      cls?.title ||

      cls?.name ||

      null,

    class_image:

      session?.class_image ||

      session?.class_image_url ||

      cls?.image_url ||

      cls?.image ||

      booking?.class_image ||

      booking?.class_image_url ||

      null,

    session_title:

      session?.session_title ||

      session?.title ||

      session?.name ||

      "Class Session",

    trainer_name:

      session?.trainer_name ||

      trainer?.name ||

      trainer?.full_name ||

      booking?.trainer_name ||

      null,

    trainer_image:

      session?.trainer_image ||

      session?.trainer_profile_image ||

      trainer?.image ||

      trainer?.profile_image ||

      booking?.trainer_image ||

      null,

    days,

    available_days: days,

    days_label:

      session?.days_label ||

      makeDaysLabel(days),

    start_time:

      session?.start_time ||

      null,

    end_time:

      session?.end_time ||

      null,

    local_start_time:

      session?.local_start_time ||

      session?.display_time ||

      formatTime(

        session?.start_time

      ),

    duration:

      session?.duration ||

      booking?.duration ||

      null,

    zoom_link:

      session?.zoom_link ||

      session?.zoom?.join_url ||

      null,

    zoom:

      session?.zoom || {

        enabled:

          session?.mode ===

            "ONLINE" ||

          session?.mode ===

            "HYBRID",

        join_url:

          session?.zoom_link ||

          null,

      },

    can_join:

      session?.can_join === true,

    is_today:

      Boolean(

        session?.is_today

      ),

    students_count:

      session?.students_count ??

      session?.enrolled_students ??

      session?.student_count ??

      null,

  };

};

/* =========================================================

   MAIN COMPONENT

\========================================================= */

export default function WebsiteLiveSessions() {

  const navigate =

    useNavigate();

  const tz = { timezone: getTimezone() || "Asia/Kolkata" };

  const token =

    localStorage.getItem(

      "token"

    );

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    sessions,

    setSessions,

  ] = useState([]);

  const [

    hasBooking,

    setHasBooking,

  ] = useState(false);

  const [

    errorMessage,

    setErrorMessage,

  ] = useState("");

  const [

    clock,

    setClock,

  ] = useState("");

  const [

    tab,

    setTab,

  ] = useState("ALL");

  const [

    search,

    setSearch,

  ] = useState("");

  const [

    classFilter,

    setClassFilter,

  ] = useState("ALL");

  const [

    trainerFilter,

    setTrainerFilter,

  ] = useState("ALL");

  const [

    calendarMonth,

    setCalendarMonth,

  ] = useState(

    new Date()

  );

  const [

    selectedDate,

    setSelectedDate,

  ] = useState(

    new Date()

  );

  /* =======================================================

     CLOCK

  ======================================================= */

  useEffect(() => {

    const tick = () => {

      setClock(

        getNow(

          tz.timezone

        )

      );

    };

    tick();

    const id =

      setInterval(

        tick,

        1000

      );

    return () =>

      clearInterval(id);

  }, [tz.timezone]);

  /* =======================================================

     FETCH BOOKINGS

  ======================================================= */

  const fetchBookings =

    async () => {

      const response =

        await API.get(

          "/bookings/my-bookings",

          {

            headers: {

              "X-Timezone":

                tz.timezone,

            },

          }

        );

      const raw =

        response?.data;

      if (

        Array.isArray(raw)

      ) {

        return raw;

      }

      if (

        Array.isArray(

          raw?.bookings

        )

      ) {

        return raw.bookings;

      }

      if (

        Array.isArray(

          raw?.data?.bookings

        )

      ) {

        return raw.data.bookings;

      }

      if (

        Array.isArray(

          raw?.data

        )

      ) {

        return raw.data;

      }

      return [];

    };

  /* =======================================================

     FETCH SESSIONS

  ======================================================= */

  const fetchSessions =

    async () => {

      try {

        setLoading(true);

        setErrorMessage("");

        if (!token) {

          setSessions([]);

          setHasBooking(false);

          return;

        }

        const bookings =

          await fetchBookings();

        setHasBooking(

          bookings.length > 0

        );

        if (!bookings.length) {

          setSessions([]);

          return;

        }

        const classIds = [

          ...new Set(

            bookings

              .map(

                (b) =>

                  Number(

                    b?.class_id ||

                      b?.classId ||

                      b?.class?.id

                  )

              )

              .filter(

                (id) =>

                  Number.isInteger(

                    id

                  ) && id > 0

              )

          ),

        ];

        const results =

          await Promise.all(

            classIds.map(

              async (

                classId

              ) => {

                try {

                  const response =

                    await API.get(

                      `/sessions/class/${classId}`,

                      {

                        headers: {

                          "X-Timezone":

                            tz.timezone,

                        },

                      }

                    );

                  const raw =

                    response?.data;

                  const list =

                    raw?.data

                      ?.sessions ||

                    raw?.sessions ||

                    raw?.data ||

                    [];

                  return {

                    classId,

                    sessions:

                      Array.isArray(

                        list

                      )

                        ? list

                        : [],

                  };

                } catch (e) {

                  console.error(

                    `Failed to load sessions for class ${classId}`,

                    e

                  );

                  return {

                    classId,

                    sessions: [],

                  };

                }

              }

            )

          );

        const output = [];

        bookings.forEach(

          (booking) => {

            const classId =

              Number(

                booking?.class_id ||

                  booking?.classId ||

                  booking?.class?.id

              );

            const sessionId =

              Number(

                booking?.session_id ||

                  booking?.sessionId ||

                  booking?.session?.id

              );

            const result =

              results.find(

                (r) =>

                  Number(

                    r.classId

                  ) === classId

              );

            const list =

              result?.sessions ||

              [];

            let match = null;

            if (

              Number.isInteger(

                sessionId

              ) &&

              sessionId > 0

            ) {

              match =

                list.find(

                  (s) =>

                    Number(

                      s?.session_id ||

                        s?.id

                    ) ===

                    sessionId

                );

            }

            if (

              !match &&

              !sessionId

            ) {

              match =

                list[0];

            }

            if (match) {

              output.push(

                normalizeSession(

                  match,

                  booking

                )

              );

            }

          }

        );

        const unique = [];

        const seen =

          new Set();

        output.forEach(

          (s) => {

            const key = `${s.booking_id || "b"}-${

              s.session_id ||

              s.id ||

              "s"

            }`;

            if (

              !seen.has(key)

            ) {

              seen.add(key);

              unique.push(s);

            }

          }

        );

        setSessions(

          unique

        );

      } catch (error) {

        console.error(

          "SESSIONS LOAD ERROR:",

          error

        );

        setErrorMessage(

          error?.response

            ?.data?.message ||

            error?.message ||

            "Failed to fetch sessions"

        );

        setSessions([]);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchSessions();

  }, [

    token,

    tz.timezone,

  ]);

  /* =======================================================

     SESSION GROUPS

  ======================================================= */

  const live =

    useMemo(

      () =>

        sessions.filter(

          (s) =>

            getStatus(

              s,

              tz.timezone

            ) === "LIVE"

        ),

      [

        sessions,

        tz.timezone,

        clock,

      ]

    );

  const upcoming =

    useMemo(

      () =>

        sessions.filter(

          (s) => {

            const status =

              getStatus(

                s,

                tz.timezone

              );

            return (

              status ===

                "UPCOMING" ||

              status ===

                "SCHEDULED"

            );

          }

        ),

      [

        sessions,

        tz.timezone,

        clock,

      ]

    );

  const completed =

    useMemo(

      () =>

        sessions.filter(

          (s) =>

            getStatus(

              s,

              tz.timezone

            ) ===

            "COMPLETED"

        ),

      [

        sessions,

        tz.timezone,

        clock,

      ]

    );

  /* =======================================================

     FILTER

  ======================================================= */

  const filtered =

    useMemo(() => {

      const q =

        search

          .trim()

          .toLowerCase();

      return sessions.filter(

        (s) => {

          const status =

            getStatus(

              s,

              tz.timezone

            );

          if (

            tab === "LIVE" &&

            status !== "LIVE"

          ) {

            return false;

          }

          if (

            tab === "UPCOMING" &&

            !(

              status ===

                "UPCOMING" ||

              status ===

                "SCHEDULED"

            )

          ) {

            return false;

          }

          if (

            tab ===

              "COMPLETED" &&

            status !==

              "COMPLETED"

          ) {

            return false;

          }

          if (

            classFilter !==

              "ALL" &&

            s.class_title !==

              classFilter

          ) {

            return false;

          }

          if (

            trainerFilter !==

              "ALL" &&

            s.trainer_name !==

              trainerFilter

          ) {

            return false;

          }

          if (!q) {

            return true;

          }

          return [

            s.class_title,

            s.session_title,

            s.trainer_name,

          ].some(

            (v) =>

              String(

                v || ""

              )

                .toLowerCase()

                .includes(q)

          );

        }

      );

    }, [

      sessions,

      tab,

      classFilter,

      trainerFilter,

      search,

      tz.timezone,

      clock,

    ]);

  const classOptions = [

    ...new Set(

      sessions

        .map(

          (s) =>

            s.class_title

        )

        .filter(Boolean)

    ),

  ];

  const trainerOptions = [

    ...new Set(

      sessions

        .map(

          (s) =>

            s.trainer_name

        )

        .filter(Boolean)

    ),

  ];

  const nextSession =

    live[0] ||

    upcoming[0] ||

    null;

  /* =======================================================

     CALENDAR

  ======================================================= */

  const calendarCells =

    useMemo(() => {

      const year =

        calendarMonth.getFullYear();

      const month =

        calendarMonth.getMonth();

      const firstDay =

        new Date(

          year,

          month,

          1

        ).getDay();

      return Array.from(

        {

          length: 42,

        },

        (_, i) =>

          new Date(

            year,

            month,

            i -

              firstDay +

              1

          )

      );

    }, [

      calendarMonth,

    ]);

  const sessionDates =

    useMemo(() => {

      const dates =

        new Set();

      sessions.forEach(

        (s) => {

          const value =

            s.date ||

            s.session_date ||

            s.start_date;

          if (value) {

            const d =

              new Date(value);

            if (

              !Number.isNaN(

                d.getTime()

              )

            ) {

              dates.add(

                d.toDateString()

              );

            }

          }

        }

      );

      return dates;

    }, [sessions]);

  /* =======================================================

     STATES

  ======================================================= */

  if (loading) {

    return (

      <State

        title="Loading Sessions..."

        icon={

          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />

        }

      />

    );

  }

  if (!token) {

    return (

      <State

        title="Login Required"

        message="Please login to access your sessions."

        icon={

          <HiLockClosed

            size={38}

          />

        }

        button="Login"

        onClick={() => navigate("/institute/website/preview")}

      />

    );

  }

  if (

    !hasBooking &&

    !errorMessage

  ) {

    return (

      <State

        title="No Sessions"

        message="Book a class to start learning."

        icon={

          <HiCalendar

            size={38}

          />

        }

        button="Browse Classes"

        onClick={() =>

          navigate(

            "/classes"

          )

        }

      />

    );

  }

  if (

    errorMessage &&

    !sessions.length

  ) {

    return (

      <State

        title="Unable to Load Sessions"

        message={errorMessage}

        icon={

          <HiExclamationCircle

            size={38}

          />

        }

        button="Retry"

        onClick={

          fetchSessions

        }

      />

    );

  }

  /* =======================================================

     PAGE

  ======================================================= */

  return (

    <div className="min-h-screen bg-[#000000] text-white">

      <div className="mx-auto max-w-[1600px] px-5 pb-7 pt-2 xl:px-8">

        {/* HEADER */}

        <header className="mb-6 flex items-start justify-between gap-6">

          <div>

            <h1 className="text-4xl font-bold leading-none">

              Live{" "}

              <span className="bg-gradient-to-r from-[#1687FF] to-[#087CFF] bg-clip-text text-transparent">

                Sessions

              </span>

            </h1>

            <p className="mt-2 text-base text-white">

              Join your scheduled classes, interact with trainers, and learn live.

            </p>

          </div>

        </header>

        {/* TABS */}

        <div className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-[#050505]">

          <div className="grid grid-cols-4">

            <Tab

              active={

                tab === "ALL"

              }

              icon={

                <HiCalendar />

              }

              label="All Sessions"

              onClick={() =>

                setTab("ALL")

              }

            />

            <Tab

              active={

                tab ===

                "UPCOMING"

              }

              icon={

                <HiCalendar />

              }

              label="Upcoming"

              onClick={() =>

                setTab(

                  "UPCOMING"

                )

              }

            />

            <Tab

              active={

                tab === "LIVE"

              }

              icon={

                <span>◉</span>

              }

              label="Live Now"

              onClick={() =>

                setTab("LIVE")

              }

            />

            <Tab

              active={

                tab ===

                "COMPLETED"

              }

              icon={

                <HiCheckCircle />

              }

              label="Completed"

              onClick={() =>

                setTab(

                  "COMPLETED"

                )

              }

            />

          </div>

        </div>

        {/* CONTENT */}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-7">

          <main>

            {/* FILTERS */}

            <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_175px_175px]">

              <div className="relative">

                <HiSearch

                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white"

                  size={21}

                />

                <input

                  value={search}

                  onChange={(e) =>

                    setSearch(

                      e.target.value

                    )

                  }

                  placeholder="Search sessions, classes or trainers..."

                  className="h-12 w-full rounded-xl border border-white/10 bg-[#050505] pl-12 pr-4 text-sm text-white outline-none placeholder:text-white focus:border-blue-500/60"

                />

              </div>

              <Select

                value={

                  classFilter

                }

                onChange={

                  setClassFilter

                }

                options={

                  classOptions

                }

                label="All Classes"

              />

              <Select

                value={

                  trainerFilter

                }

                onChange={

                  setTrainerFilter

                }

                options={

                  trainerOptions

                }

                label="All Trainers"

              />

            </div>

            {/* SESSION CARDS */}

            {filtered.length ? (

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {filtered.map(

                  (session) => (

                    <SessionCard

                      key={`${session.booking_id}-${session.session_id}`}

                      session={

                        session

                      }

                      timezone={

                        tz.timezone

                      }

                    />

                  )

                )}

              </div>

            ) : (

              <div className="rounded-2xl border border-white/10 bg-[#080808] py-16 text-center text-white">

                No sessions found.

              </div>

            )}

          </main>

          {/* SIDEBAR */}

          <aside className="space-y-5 lg:sticky lg:top-[90px]">

            <NextSession

              session={

                nextSession

              }

              timezone={

                tz.timezone

              }

            />

            {/* CALENDAR */}

            <div className="rounded-2xl border border-white/10 bg-[#080808] p-4">

              <div className="mb-5 flex items-center justify-between">

                <h3 className="text-base font-bold">

                  Session Calendar

                </h3>

                <div className="flex gap-1 text-blue-400">

                  <button

                    type="button"

                    onClick={() =>

                      setCalendarMonth(

                        new Date(

                          calendarMonth.getFullYear(),

                          calendarMonth.getMonth() -

                            1,

                          1

                        )

                      )

                    }

                  >

                    <HiChevronLeft />

                  </button>

                  <button

                    type="button"

                    onClick={() =>

                      setCalendarMonth(

                        new Date(

                          calendarMonth.getFullYear(),

                          calendarMonth.getMonth() +

                            1,

                          1

                        )

                      )

                    }

                  >

                    <HiChevronRight />

                  </button>

                </div>

              </div>

              <div className="mb-5 flex items-center justify-between">

                <button

                  type="button"

                  className="text-white"

                  onClick={() =>

                    setCalendarMonth(

                      new Date(

                        calendarMonth.getFullYear(),

                        calendarMonth.getMonth() -

                          1,

                        1

                      )

                    )

                  }

                >

                  <HiChevronLeft />

                </button>

                <span className="font-semibold">

                  {calendarMonth.toLocaleDateString(

                    "en-US",

                    {

                      month:

                        "long",

                      year:

                        "numeric",

                    }

                  )}

                </span>

                <button

                  type="button"

                  className="text-white/55"

                  onClick={() =>

                    setCalendarMonth(

                      new Date(

                        calendarMonth.getFullYear(),

                        calendarMonth.getMonth() +

                          1,

                        1

                      )

                    )

                  }

                >

                  <HiChevronRight />

                </button>

              </div>

              <div className="grid grid-cols-7 gap-y-2 text-center">

                {[

                  "Sun",

                  "Mon",

                  "Tue",

                  "Wed",

                  "Thu",

                  "Fri",

                  "Sat",

                ].map(

                  (d) => (

                    <span

                      key={d}

                      className="text-[10px] text-white"

                    >

                      {d}

                    </span>

                  )

                )}

                {calendarCells.map(

                  (

                    date,

                    i

                  ) => {

                    const selected =

                      date.toDateString() ===

                      selectedDate.toDateString();

                    const sameMonth =

                      date.getMonth() ===

                      calendarMonth.getMonth();

                    const hasSessionDate =

                      sessionDates.has(

                        date.toDateString()

                      );

                    return (

                      <button

                        type="button"

                        key={`${date.toISOString()}-${i}`}

                        onClick={() =>

                          setSelectedDate(

                            date

                          )

                        }

                        className={`relative mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs ${

                          selected

                            ? "bg-gradient-to-r from-[#1687FF] to-[#087CFF] text-white"

                            : sameMonth

                            ? "text-white hover:bg-white/5"

                            : "text-white"

                        }`}

                      >

                        {

                          date.getDate()

                        }

                        {hasSessionDate && (

                          <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-blue-400" />

                        )}

                      </button>

                    );

                  }

                )}

              </div>

            </div>

            {/* RECENT */}

            <div className="rounded-2xl border border-white/10 bg-[#080808] p-4">

              <div className="mb-4 flex items-center justify-between">

                <h3 className="font-bold">

                  Recent Sessions

                </h3>

                <button

                  type="button"

                  className="text-xs text-blue-400"

                >

                  View All →

                </button>

              </div>

              {completed.slice(

                0,

                3

              ).length ? (

                completed

                  .slice(0, 3)

                  .map((s) => (

                    <div

                      key={`${s.booking_id}-${s.session_id}`}

                      className="mb-4 flex gap-3 last:mb-0"

                    >

                      {s.class_image ? (

                        <img

                          src={

                            s.class_image

                          }

                          className="h-12 w-14 rounded-lg object-cover"

                          alt={

                            s.class_title ||

                            "Session"

                          }

                        />

                      ) : (

                        <div className="flex h-12 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#050505] to-[#050505] text-[8px] text-white/25">

                          No image

                        </div>

                      )}

                      <div className="min-w-0 flex-1">

                        <div className="flex items-start justify-between gap-2">

                          <h4 className="truncate text-sm font-medium">

                            {

                              s.session_title ||

                              s.class_title

                            }

                          </h4>

                          <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] text-emerald-300">

                            Completed

                          </span>

                        </div>

                        <p className="mt-1 text-[10px] text-white/45">

                          {s.local_start_time ||

                            formatTime(

                              s.start_time

                            )}

                        </p>

                      </div>

                    </div>

                  ))

              ) : (

                <p className="py-6 text-center text-sm text-white">

                  No completed sessions.

                </p>

              )}

            </div>

          </aside>

        </div>

      </div>

    </div>

  );

}

/* =========================================================

   TAB

\========================================================= */

function Tab({

  active,

  icon,

  label,

  onClick,

}) {

  return (

    <button

      type="button"

      onClick={onClick}

      className={`flex h-14 items-center justify-center gap-3 border-r border-white/10 text-sm font-medium transition ${

        active

          ? "bg-gradient-to-r from-[#1687FF] to-[#087CFF] text-white"

          : "text-white hover:bg-white/[0.03]"

      }`}

    >

      <span className="text-lg">

        {icon}

      </span>

      {label}

    </button>

  );

}

/* =========================================================

   SELECT

\========================================================= */

function Select({

  value,

  onChange,

  options,

  label,

}) {

  return (

    <select

      value={value}

      onChange={(e) =>

        onChange(

          e.target.value

        )

      }

      className="h-12 rounded-xl border border-white/10 bg-[#050505] px-4 text-sm text-white outline-none"

    >

      <option value="ALL">

        {label}

      </option>

      {options.map((o) => (

        <option

          key={o}

          value={o}

        >

          {o}

        </option>

      ))}

    </select>

  );

}

/* =========================================================

   INFO

\========================================================= */

function Info({

  icon,

  children,

}) {

  return (

    <div className="mt-2 flex items-center gap-3 text-sm text-white">

      <span className="text-blue-300">

        {icon}

      </span>

      <span>

        {children}

      </span>

    </div>

  );

}

/* =========================================================

   SESSION CARD

\========================================================= */

function SessionCard({

  session,

  timezone,

}) {

  const navigate =

    useNavigate();

  const status =

    getStatus(

      session,

      timezone

    );

  const image =

    session.class_image;

  const zoom =

    session.zoom

      ?.join_url ||

    session.zoom_link;

  const classId =

    session.class_id ||

    session.classId ||

    session.class?.id;

  /* =======================================================

     GO TO LEARNING COURSE

  ======================================================= */

  const goToLearningCourse =

    () => {

      if (!classId) {

        console.error(

          "Class ID not available for session:",

          session

        );

        return;

      }

      navigate(

        `/my-learning/${classId}`

      );

    };

  return (

    <article

      className={`overflow-hidden rounded-2xl border bg-[#080808] ${

        status === "LIVE"

          ? "border-blue-500/40"

          : "border-white/10"

      }`}

    >

      {/* IMAGE */}

      <div className="relative h-[126px] overflow-hidden">

        {image ? (

          <img

            src={image}

            alt={

              session.class_title ||

              "Session"

            }

            className="h-full w-full object-cover"

          />

        ) : (

          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#050505] via-[#080808] to-[#050505] text-xs font-semibold text-white">

            No image

          </div>

        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />

        {/* STATUS */}

        <div

          className={`absolute left-4 top-4 rounded-lg px-3 py-1.5 text-xs font-semibold ${

            status === "LIVE"

              ? "bg-[#FF164F]"

              : "bg-gradient-to-r from-[#1687FF] to-[#1687FF]"

          }`}

        >

          {status ===

            "LIVE" && (

            <span className="mr-1">

              ●

            </span>

          )}

          {status ===

          "LIVE"

            ? "LIVE NOW"

            : "Upcoming"}

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-4">

        {/* CLASS */}

        <div className="flex items-start justify-between gap-3">

          <h3 className="text-[18px] font-bold leading-6">

            {session.class_title ||

              "—"}

            {session.session_title &&

              session.session_title !==

                session.class_title && (

                <span className="block">

                  {

                    session.session_title

                  }

                </span>

              )}

          </h3>

          {status ===

            "LIVE" && (

            <span className="shrink-0 rounded-full bg-red-500/15 px-2 py-1 text-[10px] text-red-300">

              ● Live

            </span>

          )}

        </div>

        {/* TRAINER */}

        <div className="mt-3 flex items-center gap-2">

          {session.trainer_image ? (

            <img

              src={

                session.trainer_image

              }

              alt=""

              className="h-7 w-7 rounded-full object-cover"

            />

          ) : (

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">

              <HiUser

                size={15}

              />

            </span>

          )}

          <span className="text-sm text-white">

            Trainer:{" "}

            <span className="text-white">

              {session.trainer_name ||

                "—"}

            </span>

          </span>

        </div>

        {/* DAY */}

        <Info

          icon={

            <HiCalendar />

          }

        >

          {session.is_today

            ? "Today"

            : session.days_label}

        </Info>

        {/* TIME */}

        <Info

          icon={

            <HiClock />

          }

        >

          {session.local_start_time ||

            formatTime(

              session.start_time

            )}

          {session.end_time

            ? ` - ${formatTime(

                session.end_time

              )}`

            : ""}

        </Info>

        {/* =================================================

            ZOOM + LEARNING COURSE BUTTONS

        ================================================= */}

        <div className="mt-4 grid grid-cols-1 gap-2">

          {/* ZOOM */}

          {session.can_join &&

          zoom ? (

            <a

              href={zoom}

              target="_blank"

              rel="noreferrer"

              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1687FF] to-[#087CFF] text-sm font-semibold transition hover:brightness-110"

            >

              <HiVideoCamera

                size={18}

              />

              Join Zoom Session

            </a>

          ) : status ===

              "UPCOMING" ||

            status ===

              "SCHEDULED" ? (

            <button

              type="button"

              disabled

              className="flex h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-white/10 text-sm text-white"

            >

              <HiClock

                size={18}

              />

              Session Not Started

            </button>

          ) : (

            <button

              type="button"

              disabled

              className="h-11 w-full rounded-lg border border-white/10 text-sm text-white"

            >

              Session Completed

            </button>

          )}

          {/* GO TO LEARNING COURSE */}

          {classId && (

            <button

              type="button"

              onClick={

                goToLearningCourse

              }

              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-blue-500/40 bg-blue-500/10 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20"

            >

              <HiBookOpen

                size={18}

              />

              Go to Learning Course

            </button>

          )}

        </div>

      </div>

    </article>

  );

}

/* =========================================================

   NEXT SESSION

\========================================================= */

function NextSession({

  session,

  timezone,

}) {

  const navigate =

    useNavigate();

  if (!session) {

    return (

      <div className="rounded-2xl border border-white/10 bg-[#080808] p-5">

        <h3 className="font-bold">

          Next Live Session

        </h3>

        <p className="py-8 text-center text-sm text-white">

          No upcoming session.

        </p>

      </div>

    );

  }

  const status =

    getStatus(

      session,

      timezone

    );

  const zoom =

    session.zoom

      ?.join_url ||

    session.zoom_link;

  const classId =

    session.class_id ||

    session.classId ||

    session.class?.id;

  const goToLearningCourse =

    () => {

      if (!classId) {

        return;

      }

      navigate(

        `/my-learning/${classId}`

      );

    };

  return (

    <div className="rounded-2xl border border-white/10 bg-[#080808] p-4">

      <div className="mb-4 flex items-center justify-between">

        <h3 className="font-bold">

          Next Live Session

        </h3>

        <button

          type="button"

          className="text-xs text-blue-400"

        >

          View All →

        </button>

      </div>

      <div className="flex gap-3">

        {session.class_image ? (

          <img

            src={

              session.class_image

            }

            alt={

              session.class_title ||

              "Session"

            }

            className="h-28 w-24 rounded-xl object-cover"

          />

        ) : (

          <div className="flex h-28 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#050505] via-[#080808] to-[#050505] text-[10px] text-white">

            No image

          </div>

        )}

        <div className="min-w-0">

          <h4 className="text-sm font-semibold leading-5">

            {session.session_title ||

              session.class_title ||

              "—"}

          </h4>

          <Info

            icon={

              <HiCalendar />

            }

          >

            {session.is_today

              ? "Today"

              : session.days_label}

          </Info>

          <Info

            icon={

              <HiClock />

            }

          >

            {session.local_start_time ||

              formatTime(

                session.start_time

              )}

            {session.end_time

              ? ` - ${formatTime(

                  session.end_time

                )}`

              : ""}

          </Info>

          <Info

            icon={

              <HiUser />

            }

          >

            Trainer:{" "}

            {session.trainer_name ||

              "—"}

          </Info>

        </div>

      </div>

      {/* ZOOM */}

      {session.can_join &&

      zoom ? (

        <a

          href={zoom}

          target="_blank"

          rel="noreferrer"

          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1687FF] to-[#087CFF] text-sm font-semibold transition hover:brightness-110"

        >

          <HiVideoCamera />

          Join Zoom Session

        </a>

      ) : (

        <button

          type="button"

          disabled

          className="mt-4 flex h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-white/10 text-sm text-white"

        >

          <HiClock />

          {status ===

            "UPCOMING" ||

          status ===

            "SCHEDULED"

            ? "Session Not Started"

            : "Join Unavailable"}

        </button>

      )}

      {/* LEARNING COURSE */}

      {classId && (

        <button

          type="button"

          onClick={

            goToLearningCourse

          }

          className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-blue-500/40 bg-blue-500/10 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20"

        >

          <HiBookOpen

            size={18}

          />

          Go to Learning Course

        </button>

      )}

    </div>

  );

}

/* =========================================================

   STATE

\========================================================= */

function State({

  icon,

  title,

  message,

  button,

  onClick,

}) {

  return (

    <div className="flex min-h-[70vh] items-center justify-center bg-[#000000] px-5 text-white">

      <div className="max-w-md text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">

          {icon}

        </div>

        <h1 className="mt-6 text-3xl font-bold">

          {title}

        </h1>

        {message && (

          <p className="mt-4 text-white">

            {message}

          </p>

        )}

        {button && (

          <button

            type="button"

            onClick={onClick}

            className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#1687FF] to-[#087CFF] py-3 font-semibold"

          >

            {button}

          </button>

        )}

      </div>

    </div>

  );

}
