import { Profiles } from './Definitions';

export const Routes = {
    home: {
        url: `/`,
        text: `Home`,
    },
    login: {
        url: `/login`,
        text: `Log In`,
    },
    register: {
        url: `/register`,
        text: `Sign Up`,
    },
    faq: {
        url: `/faq`,
        text: `FAQ`,
    },
    contact: {
        url: `/contact`,
        text: `Contact`,
    },
    // /employer
    employer: {
        url: `/employer`,
        text: `For Employers`,
    },
    registerEmployer: {
        url: `/employer/register`,
        text: ``,
    },
    // /posts
    allPosts: {
        url: `/posts`,
        text: `All Posts`,
    },
    singlePost: {
        url: `/posts/:post_id`,
        text: ``,
    },
    // /users
    profile: {
        url: `/users/:user_id`,
        text: `Profile`,
    },
    companyPosts: {
        url: `/users/:user_id/posts/postings`,
        text: `My Postings`,
    },
    companyApplications: {
        url: `/users/:user_id/posts/postings/applicants`,
        text: `My Applicants`,
    },
    studentApplications: {
        url: `/users/:user_id/posts/applications`,
        text: `My Applications`,
    },
    // /users/create
    createExperience: {
        url: `/users/:user_id/experiences/new`,
        text: ``,
    },
    createProject: {
        url: `/users/:user_id/projects/new`,
        text: ``,
    },
    createSkill: {
        url: `/users/:user_id/skills/new`,
        text: ``,
    },
    createPost: {
        url: `/users/:user_id/posts/postings/new`,
        text: ``,
    },
    // /users/edit
    editExperience: {
        url: `/users/:user_id/experiences/:experience_id/edit`,
        text: ``,
    },
    editProject: {
        url: `/users/:user_id/projects/:project_id/edit`,
        text: ``,
    },
    editSkill: {
        url: `/users/:user_id/skills/:skill_id/edit`,
        text: ``,
    },
    editPost: {
        url: `/users/:user_id/posts/postings/:post_id/edit`,
        text: ``,
    },
}

export const NavbarRoutes = {
    [Profiles.student]: [
        Routes.home,
        Routes.allPosts,
        Routes.profile,
        Routes.studentApplications
    ],
    [Profiles.employer]: [
        Routes.home,
        Routes.profile,
        Routes.companyPosts,
        Routes.companyApplications
    ],
    [Profiles.admin]: [
        Routes.home,
        Routes.profile,
        Routes.companyPosts,
        Routes.companyApplications
    ],
    default: [
        Routes.home,
        Routes.allPosts,
        Routes.login,
        Routes.register,
        Routes.employer,
    ],
    other: [
        Routes.faq,
        Routes.contact,
    ]
}
