import Admin from "./page/Admin";
import {
    ADMIN_ROUTE,
    COURSE_ROUTE,
    CREATE_ROUTE,
    LOGIN_ROUTE,
    PAGE_ROUTE,
    PROFILE_ROUTE,
    REG_ROUTE, TEST_ROUTE
} from "./utils/consts";
import Profile from "./page/Profile";
import Course from "./page/Course";
import CoursesPage from "./page/CoursesPage";
import Auth from "./page/Auth";
import CreateCourse from "./page/CreateCourse";
import Test from "./page/Test";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component:Admin
    },
    {
        path: PROFILE_ROUTE,
        Component:Profile
    }
]

export const publicRoutes = [
    {
        path: ADMIN_ROUTE,
        Component:Admin
    },
    {
        path: COURSE_ROUTE,
        Component:Course
    },
    {
        path: PAGE_ROUTE + '/:id',
        Component:CoursesPage
    },
    {
        path: LOGIN_ROUTE,
        Component:Auth
    },
    {
        path: REG_ROUTE,
        Component:Auth
    },
    {
        path: TEST_ROUTE + '/:id',
        Component:Test
    }
]