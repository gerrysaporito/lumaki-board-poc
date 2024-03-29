import FAQ from './FAQ';

export const Content = {
    notFound: 'N/A',
    login: {
        buttonText: `Log in`,
        heading: `Welcome Back.`
    },
    register: {
        student: {
            buttonText: `Let's go!`,
            heading: `Apply for your next internship today.`,
            register: true,
        },
        employers: {
            intro: {
                title: `Your virtual intern marketplace. Find talent today.`,
                subTitle: `Create an account to submit job postings as well as view and filter applicants.`,
            },
            register: {
                buttonText: `Let's go!`,
                heading: `List your first job today.`,
                register: true,
                employers: true,
            },
        }
    },
    homepage: {
        authenticated: {
            title: `A no-frills virtual internship marketplace.`,
            subTitle: `Flexible internship experiences at your fingertips. `,
            cards: [
                {
                    title: `Looking for a job?`,
                    subTitle: `Some random gibberish here`,
                    buttonText: `Sign up here`,
                    link: `/register`,
                },
                {
                    title: `Wanna fill your position?`,
                    subTitle: `Some random gibberish here`,
                    buttonText: `Learn more here`,
                    link: `/employer`,
                }
            ]
        },
        unauthenticated: {
            title: `A no-frills virtual internship marketplace.`,
            subTitle: `Flexible internship experiences at your fingertips. `,
            cards: [
                {
                    title: `Looking for a job?`,
                    subTitle: `Some random gibberish here`,
                    buttonText: `Sign up here`,
                    link: `/register`,
                },
                {
                    title: `Wanna fill your position?`,
                    subTitle: `Some random gibberish here`,
                    buttonText: `Learn more here`,
                    link: `/employer`,
                }
            ]
        }
    },
    profile: {
        intro: {
            student: {
                register: {
                    header: `Let's get to know you `,
                    subheader: ''
                },
                login: {
                    header: `Welcome `,
                    subheader: ''
                },
            },
            employer: {
                register: {
                    header: `Welcome :name from :company!`,
                    subheader: ''
                },
                login: {
                    header: `Here's what we know about :company.`,
                    subheader: ''
                },
            },
        },
        subheader: '',
        student: {
            experiences: {
                title: `Your Experiences.`,
                buttonText: `+ Add Experience`,
            },
            projects: {
                title: `Your Projects.`,
                buttonText: `+ Add Project`,
            },
            skills: {
                title: `Your Skills.`,
                buttonText: `+ Add Skill`,
            },
        },
        employer: {
            description: {
                title: `COMPANY DESCRIPTION`,
                subTitle: `Let students know what your company does! This will be used in any future job postings on the platform.`
            }
        }
    },
    forms: {
        post: {
            create: {
                note: `Add details about the job here. You will be redirected to the previous page with the job(s) populated.`,
                title: `JOB`,
                buttonText: `Add Job`,
            },
            edit: {
                note: `Edit the details about the job here. You will be redirected to the previous page when you save this job.`,
                title: `JOB`,
                buttonText: `Update Job`,
            },
        },
        experience: {
            create: {
                note: `Add details about your experience here. You will be redirected to the previous page with your experience(s) populated.`,
                title: `EXPERIENCE`,
                buttonText: `Add Experience`,
            },
            edit: {
                note: `Add details about your experience here. You will be redirected to the previous page with your experience(s) populated.`,
                title: `EXPERIENCE`,
                buttonText: `Update Experience`,
            },
        },
        project: {
            create: {
                note: `Add details about your project here. You will be redirected to the previous page with your project(s) populated.`,
                title: `PROJECT`,
                buttonText: `Add Project`,
            },
            edit: {
                note: `Edit details about your project here. You will be redirected to the previous page with your project(s) populated.`,
                title: `PROJECT`,
                buttonText: `Update Project`,
            },
        },
        skill: {
            create: {
                note: `Add details about your skill here. You will be redirected to the previous page with your skill(s) populated.`,
                title: `SKILL`,
                buttonText: `Add Skill`,
            },
            edit: {
                note: `Edit details about your skill here. You will be redirected to the previous page with your skill(s) populated.`,
                title: `SKILL`,
                buttonText: `Update Experience`,
            },
        },
        contact: {
            employer: {
                title: `Got questions? We’ve got answers.`,
                subTitle: `Want to learn more, add your company’s posting to our job board, or receive guidance on running remote internships? Drop us a message and we’ll get back to you as soon as we can! (lumaki.labs@gmail.com)`,
                subject: `Company/Organization:`,
                contactPerson: `Name:`,
                contactMethod: `Email:`,
                messageTitle: `Type your message here: (Please include a link to your company’s website or LinkedIn)`,
                buttonText: 'Submit',
            },
            general: {
                title: `CONTACT US`,
                subTitle: `From questions to comments and everything else in between, feel free to reach out to us! lumaki.labs@gmail.com`,
                subject: `Subject:`,
                contactPerson: `Name:`,
                contactMethod: `Email:`,
                messageTitle: `Type your message here:`,
                buttonText: 'Submit',
            }
        },
    },
    faq: {
        title: 'FREQUENTLY ASKED QUESTIONS',
        content: FAQ
    },
    post: {
        title: {
            description: `Your Role At `,
            requirements: `Skills/Requirements.`,
            compensation: `What you get.`
        },
    },
    ViewApplicants: {
        title: `View Applicants`,
        buttonText: {
            all: `All Applicants`,
            saved: `Bookmarked Applicants`,
            pipeline: `Pipeline`,
        }
    },
    MyPostings: {
        title: `My Postings`,
        subTitle: `Above each posting you will see the status of your job posting.
            This will indicate if the posting is live, pending, or offline.
            At the bottom of each card, you will see the option to EDIT, SEE DETAILS, or delete your posting.
            EDIT will allow you to make changes to the card itself while SEE DETAILS is where you can go to edit the expanded posting details.`,
        buttonText: {
            edit: `EDIT`,
            delete: `DELETE`,
            view: `SEE DETAILS`,
        }
    },
}
