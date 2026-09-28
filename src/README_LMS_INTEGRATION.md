# FineArts Trainer LMS Integration

This package preserves the existing Trainer Dashboard and adds an LMS authoring module on top of the existing Class architecture.

## Files changed/added

- `trainer/TrainerLMS.jsx` — new LMS curriculum authoring page.
- `trainer/TrainerClasses.jsx` — existing file preserved, with one additional LMS action button for each class.
- `sql_trainer_lms.sql` — MySQL tables for sections, lessons and lesson progress.

## Frontend route required

Add this route inside the existing trainer routes, under `TrainerLayout`:

```jsx
import TrainerLMS from "./trainer/TrainerLMS";

<Route path="/trainer/lms/:classId" element={<TrainerLMS />} />
```

The existing `TrainerClasses.jsx` now opens this route from the Book/LMS icon in each class row.

## Existing APIs expected

Trainer class list:

```text
GET /api/classes/trainer/my-classes
```

Trainer LMS:

```text
GET    /api/lms/trainer/classes/:classId/curriculum
POST   /api/lms/trainer/classes/:classId/sections
PUT    /api/lms/trainer/sections/:sectionId
DELETE /api/lms/trainer/sections/:sectionId
POST   /api/lms/trainer/sections/:sectionId/lessons
PUT    /api/lms/trainer/lessons/:lessonId
DELETE /api/lms/trainer/lessons/:lessonId
```

Student LMS already expected by the student LearningCourse page:

```text
GET   /api/lms/student/courses
GET   /api/lms/student/courses/:classId
PATCH /api/lms/student/lessons/:lessonId/progress
```

## Data flow

Trainer Class -> LMS Section -> LMS Lesson -> MySQL -> Student LearningCourse.

The trainer page contains no demo course, demo lesson, stock image, fake student or fallback curriculum data.

## Database

Run `sql_trainer_lms.sql` against the same MySQL database used by FineArts.

Before production, the backend must enforce trainer ownership of the selected class/section/lesson. The frontend does not replace authorization.

## UI

The new module follows the User Dashboard LMS visual language:

- dark black background
- radiant purple / pink accents
- white text
- muted secondary text
- cards and borders
- no green accent theme

## Important

The uploaded Trainer Dashboard archive does not contain the application's central `App.jsx` or the shared `Sidebar` component. Therefore this package does not overwrite those files. Only the route shown above needs to be added to the application's existing route configuration.
