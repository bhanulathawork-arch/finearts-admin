# Institute LMS + Teaching Management

This ZIP now includes the Institute equivalents of the Trainer teaching pages, using the Trainer panel files as the implementation basis.

## Added pages

- `institute/InstituteLMS.jsx`
- `institute/InstituteAssignments.jsx`
- `institute/InstituteAttendance.jsx`
- `institute/InstituteRecordings.jsx`

## Institute routes to add in your application's main router

```jsx
<Route path="/institute/lms" element={<InstituteLMS />} />
<Route path="/institute/lms/:classId" element={<InstituteLMS />} />
<Route path="/institute/assignments" element={<InstituteAssignments />} />
<Route path="/institute/attendance" element={<InstituteAttendance />} />
<Route path="/institute/recordings" element={<InstituteRecordings />} />
```

## Institute class LMS shortcut

`InstituteClasses.jsx` now includes a **Manage LMS** button that opens:

```text
/institute/lms/:classId
```

## API paths expected by the adapted pages

These are the Institute counterparts of the Trainer API paths used by the supplied Trainer components:

```text
GET    /api/classes/institute/my-classes
GET    /api/sessions/institute/my-sessions
GET    /api/assignments/institute/my-assignments
POST   /api/assignments/institute
PUT    /api/assignments/institute/:assignmentId
DELETE /api/assignments/institute/:assignmentId

GET    /api/attendance/session/:sessionId
POST   /api/attendance/session/:sessionId

GET    /api/bookings/institute/my-bookings?session_id=:sessionId

GET    /api/recordings/institute
POST   /api/recordings/institute
DELETE /api/recordings/institute/:recordingId
```

The supplied source files establish the Trainer-side API paths. The Institute endpoint names above are the corresponding frontend adaptations; the backend must expose these Institute routes for the pages to load/save data.

## Sidebar

Because the supplied Institute ZIP uses the shared `Sidebar` component outside this ZIP, add these Institute menu items in your shared sidebar configuration if they are not already present:

- LMS → `/institute/lms`
- Assignments → `/institute/assignments`
- Attendance → `/institute/attendance`
- Recordings → `/institute/recordings`

The existing `InstituteLayout.jsx` can continue to use `Sidebar role="INSTITUTE"`.
