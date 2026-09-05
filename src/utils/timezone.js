// src/utils/timezone.js

import { useMemo } from "react";

/* ==========================================================
   USER TIMEZONE
========================================================== */

export const getTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
};

/* ==========================================================
   TIMEZONE ABBREVIATION
========================================================== */

export const getTimezoneAbbr = (timezone = getTimezone()) => {
  try {
    const parts = new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      timeZoneName: "short",
    }).formatToParts(new Date());

    return (
      parts.find((p) => p.type === "timeZoneName")?.value ||
      timezone
    );
  } catch {
    return timezone;
  }
};

/* ==========================================================
   DATE FORMAT
========================================================== */

export const formatDate = (date) => {
  if (!date) return "-";

  // Already formatted by backend
  if (
    typeof date === "string" &&
    (date.includes(",") || /^[A-Za-z]{3}\s/.test(date))
  ) {
    return date;
  }

  try {
    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
};

/* ==========================================================
   DATETIME FORMAT
========================================================== */

export const formatDateTime = (date) => {
  if (!date) return "-";

  try {
    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(date));
  } catch {
    return date;
  }
};

/* ==========================================================
   TIME ONLY
========================================================== */

export const formatTimeOnly = (timeString) => {
  if (!timeString) return "--";

  try {
    const today = new Date().toISOString().split("T")[0];

    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(`${today}T${timeString}`));
  } catch {
    return timeString;
  }
};

/* ==========================================================
   SESSION DISPLAY HELPERS
========================================================== */

export const displaySessionTime = (session = {}) => {
  return (
    session.start_time_display ||
    formatTimeOnly(session.start_time)
  );
};

export const displaySessionEndTime = (session = {}) => {
  return (
    session.end_time_display ||
    formatTimeOnly(session.end_time)
  );
};

export const displaySessionTimeRange = (session = {}) => {
  return `${displaySessionTime(session)} - ${displaySessionEndTime(session)}`;
};

export const displaySessionDate = (session = {}) => {
  return (
    session.session_date_formatted ||
    formatDate(session.session_date)
  );
};

export const displaySessionDay = (session = {}) => {
  return (
    session.session_day ||
    session.day_name ||
    "-"
  );
};

/* ==========================================================
   DURATION
========================================================== */

export const formatDuration = (minutes) => {
  const value = Number(minutes);

  if (!value) return "-";

  if (value < 60) {
    return `${value} min`;
  }

  const hrs = Math.floor(value / 60);
  const mins = value % 60;

  if (mins === 0) {
    return `${hrs} hr`;
  }

  return `${hrs} hr ${mins} min`;
};

/* ==========================================================
   RELATIVE STATUS
========================================================== */

export const getRelativeTime = (session = {}) => {
  if (
    session.live_status === "STARTING_SOON" &&
    session.startsIn
  ) {
    return `Starts in ${Math.abs(
      session.startsIn.minutes || 0
    )} min`;
  }

  if (
    session.live_status === "LIVE" &&
    session.endsIn
  ) {
    return `${Math.abs(
      session.endsIn.minutes || 0
    )} min left`;
  }

  return session.join_label || "";
};

/* ==========================================================
   ORIGINAL TIMEZONE
========================================================== */

export const getOriginalTimezoneInfo = (
  session = {}
) => {
  if (!session.original_timezone) return null;

  return {
    timezone: session.original_timezone,

    abbr: getTimezoneAbbr(
      session.original_timezone
    ),

    originalTime: session.original_start_time
      ? formatTimeOnly(session.original_start_time)
      : null,

    originalEndTime: session.original_end_time
      ? formatTimeOnly(session.original_end_time)
      : null,
  };
};

/* ==========================================================
   VISITOR TIMEZONE LABEL
========================================================== */

export const getVisitorTimezoneLabel = () => {
  const tz = getTimezone();

  return `${getTimezoneAbbr(tz)} • ${tz}`;
};

/* ==========================================================
   HOOK
========================================================== */

export const useTimezone = () => {
  return useMemo(() => {
    const timezone = getTimezone();

    return {
      timezone,

      visitorTimezone: timezone,

      label: timezone,

      abbr: getTimezoneAbbr(timezone),

      timezoneLabel: getVisitorTimezoneLabel(),

      formatDate,

      formatDateTime,

      formatTimeOnly,

      formatDuration,

      displaySessionTime,

      displaySessionEndTime,

      displaySessionTimeRange,

      displaySessionDate,

      displaySessionDay,

      getRelativeTime,

      getOriginalTimezoneInfo,
    };
  }, []);
};