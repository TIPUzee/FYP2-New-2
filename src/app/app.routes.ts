import { Routes } from '@angular/router';
import { ProfilePreviewComponent } from './d/dash/profile-preview/profile-preview.component';

export const routes: Routes = [
    {
        path: 'd',
        loadComponent: () => import('./d/d.component').then(x => x.DComponent),
        children: [
            {
                path: 'dash',
                redirectTo: '',
            },
            {
                path: '',
                loadComponent: () => import('./d/dash/dash.component').then(x => x.DashComponent),
                children: [
                    {
                        path: '',
                        redirectTo: 'pa',
                        pathMatch: 'full',
                    },
                    {
                        path: 'p',
                        loadComponent: () => import('./d/dash/profile/profile.component').then(x => x.ProfileComponent),
                        data: { animation: 'profile' },
                    },
                    {
                        path: 'p-preview',
                        loadComponent: () => import('./d/dash/profile-preview/profile-preview.component').then(x => x.ProfilePreviewComponent),
                        data: { animation: 'previewProfile' },
                    },
                    {
                        path: 'ar',
                        loadComponent: () => import('./d/dash/requested-appointments/requested-appointments.component').then(x => x.RequestedAppointmentsComponent),
                        data: { animation: 'requestedAppointments' },
                    },
                    {
                        path: 'ua',
                        loadComponent: () => import('./d/dash/unpaid-appointments/unpaid-appointments.component').then(x => x.UnpaidAppointmentsComponent),
                        data: { animation: 'unpaidAppointments' },
                    },
                    {
                        path: 'pa',
                        loadComponent: () => import('./d/dash/pending-appointments/pending-appointments.component').then(x => x.PendingAppointmentsComponent),
                        data: { animation: 'pendingAppointments' },
                    },
                    {
                        path: 'ca',
                        loadComponent: () => import('./d/dash/completed-appointments/completed-appointments.component').then(x => x.CompletedAppointmentsComponent),
                        data: { animation: 'completedAppointments' },
                    },
                    {
                        path: 't',
                        loadComponent: () => import('./d/dash/transactions/transactions.component').then(x => x.TransactionsComponent),
                        data: { animation: 'transactions' },
                    },
                    {
                        path: 'withdraw',
                        loadComponent: () => import('./d/dash/withdraw/withdraw.component').then(x => x.WithdrawComponent),
                        data: { animation: 'withdraw' },
                    },
                    {
                        path: '**',
                        loadComponent: () => import('./d/dash/page-not-found/page-not-found.component').then(x => x.PageNotFoundComponent),
                        data: { animation: 'pageNotFound' },
                    },
                ],
            },
        ],
    },
    {
        path: 'p',
        loadComponent: () => import('./p/p.component').then(x => x.PComponent),
        children: [
            {
                path: 'dash',
                redirectTo: '',
            },
            {
                path: '',
                loadComponent: () => import('./p/dash/dash.component').then(x => x.DashComponent),
                children: [
                    {
                        path: '',
                        redirectTo: 'a',
                        pathMatch: 'full',
                    },
                    {
                        path: 'p',
                        loadComponent: () => import('./p/dash/profile/profile.component').then(x => x.ProfileComponent),
                        data: { animation: 'profile' },
                    },
                    {
                        path: 'doctor',
                        loadComponent: () => import('./p/dash/doctor/doctor.component').then(x => x.DoctorComponent),
                        data: { animation: 'doctor' },
                    },
                    {
                        path: 'book',
                        loadComponent: () => import('./p/dash/book/book.component').then(x => x.BookComponent),
                        data: { animation: 'book' },
                    },
                    {
                        path: 'chat',
                        loadComponent: () => import('./p/dash/chat/chat.component').then(x => x.ChatComponent),
                        data: { animation: 'chat' },
                    },
                    {
                        path: 'pay',
                        loadComponent: () => import('./p/dash/pay/pay.component').then(x => x.PayComponent),
                        data: { animation: 'pay' },
                    },
                    {
                        path: 'doctors',
                        loadComponent: () => import('./p/dash/doctors/doctors.component').then(x => x.DoctorsComponent),
                        data: { animation: 'doctors' },
                    },
                    {
                        path: 'suggested-doctors',
                        loadComponent: () => import('./p/dash/suggested-doctors/suggested-doctors.component').then(x => x.SuggestedDoctorsComponent),
                        data: { animation: 'suggested' },
                    },
                    {
                        path: 'a',
                        loadComponent: () => import('./p/dash/appointments/appointments.component').then(x => x.AppointmentsComponent),
                        data: { animation: 'appointments' },
                    },
                    {
                        path: 'trans',
                        loadComponent: () => import('./p/dash/transactions/transactions.component').then(x => x.TransactionsComponent),
                        data: { animation: 'transactions' },
                    },
                    {
                        path: 'withdraw',
                        loadComponent: () => import('./p/dash/withdraw/withdraw.component').then(x => x.WithdrawComponent),
                        data: { animation: 'withdraw' },
                    },
                    {
                        path: '**',
                        loadComponent: () => import('./p/dash/page-not-found/page-not-found.component').then(x => x.PageNotFoundComponent),
                        data: { animation: 'pageNotFound' },
                    },
                ],
            },
        ],
    },
    {
        path: 'a',
        loadComponent: () => import('./a/a.component').then(x => x.AComponent),
        children: [
            {
                path: 'dash',
                redirectTo: '',
            },
            {
                path: '',
                loadComponent: () => import('./a/dash/dash.component').then(x => x.DashComponent),
                children: [
                    {
                        path: 'home',
                        redirectTo: '',
                        pathMatch: 'full',
                    },
                    {
                        path: '',
                        loadComponent: () => import('./a/dash/home/home.component').then(x => x.HomeComponent),
                        data: { animation: 'home' },
                    },
                    {
                        path: 'pats',
                        loadComponent: () => import('./a/dash/patients/patients.component').then(x => x.PatientsComponent),
                        data: { animation: 'patients' },
                    },
                    {
                        path: 'docs',
                        loadComponent: () => import('./a/dash/doctors/doctors.component').then(x => x.DoctorsComponent),
                        data: { animation: 'doctors' },
                        children: [
                            {
                                path: 'profile',
                                loadComponent: () => import('./p/dash/doctor/doctor.component').then(x => x.DoctorComponent),
                                data: { animation: 'doctor-profile' },
                            },
                        ],
                    },
                    {
                        path: 'docs-approval-req',
                        loadComponent: () =>
                            import('./a/dash/doctors-approval-requests/doctors-approval-requests.component').then(x => x.DoctorsApprovalRequestsComponent),
                        data: { animation: 'doctors-approval-requests' },
                        children: [
                            {
                                path: 'profile',
                                loadComponent: () => import('./p/dash/doctor/doctor.component').then(x => x.DoctorComponent),
                                data: { animation: 'doctor-profile' },
                            },
                        ],
                    },
                    {
                        path: 'all-appo',
                        loadComponent: () => import('./a/dash/all-appointments/all-appointments.component').then(x => x.AllAppointmentsComponent),
                        data: { animation: 'all-appointments' },
                    },
                    {
                        path: 'comp-appo',
                        loadComponent: () => import('./a/dash/completed-appointments/completed-appointments.component').then(x => x.CompletedAppointmentsComponent),
                        data: { animation: 'completed-appointments' },
                    },
                    {
                        path: 'fail-appo',
                        loadComponent: () => import('./a/dash/failed-appointments/failed-appointments.component').then(x => x.FailedAppointmentsComponent),
                        data: { animation: 'failed-appointments' },
                    },
                    {
                        path: 'active-appo',
                        loadComponent: () => import('./a/dash/active-appointments/active-appointments.component').then(x => x.ActiveAppointmentsComponent),
                        data: { animation: 'active-appointments' },
                    },
                    {
                        path: 'appo-actions',
                        loadComponent: () =>
                            import('./a/dash/pending-appointments-actions/pending-appointments-actions.component').then(x => x.PendingAppointmentsActionsComponent),
                        data: { animation: 'pending-appointments-actions' },
                    },
                    {
                        path: 'appo-pays',
                        loadComponent: () => import('./a/dash/appointment-payments/appointment-payments.component').then(x => x.AppointmentPaymentsComponent),
                        data: { animation: 'appointment-payments' },
                    },
                    {
                        path: 'doc-w-trxs',
                        loadComponent: () =>
                            import('./a/dash/doctor-drawal-transactions/doctor-drawal-transactions.component').then(x => x.DoctorDrawalTransactionsComponent),
                        data: { animation: 'doctor-withdrawal-transactions' },
                    },
                    {
                        path: 'doc-w-req',
                        loadComponent: () => import('./a/dash/doctor-drawal-requests/doctor-drawal-requests.component').then(x => x.DoctorDrawalRequestsComponent),
                        data: { animation: 'doctor-withdrawal-requests' },
                    },
                    {
                        path: 'pat-w-trxs',
                        loadComponent: () =>
                            import('./a/dash/patient-drawal-transactions/patient-drawal-transactions.component').then(x => x.PatientDrawalTransactionsComponent),
                        data: { animation: 'patient-withdrawal-transactions' },
                    },
                    {
                        path: 'pat-w-req',
                        loadComponent: () => import('./a/dash/patient-drawal-requests/patient-drawal-requests.component').then(x => x.PatientDrawalRequestsComponent),
                        data: { animation: 'patient-withdrawal-requests' },
                    },
                    {
                        path: 'spec',
                        loadComponent: () => import('./a/dash/doctors-specializations/doctors-specializations.component').then(x => x.DoctorsSpecializationsComponent),
                        data: { animation: 'specializations' },
                    },
                    {
                        path: 'spec-disease-map',
                        loadComponent: () =>
                            import('./a/dash/specialization-category-and-disease-mapping/specialization-category-and-disease-mapping.component').then(
                                x => x.SpecializationCategoryAndDiseaseMappingComponent,
                            ),
                        data: { animation: 'specialization-and-disease-mapping' },
                    },
                    {
                        path: 'lang',
                        loadComponent: () => import('./a/dash/languages/languages.component').then(x => x.LanguagesComponent),
                        data: { animation: 'languages' },
                    },
                    {
                        path: '**',
                        loadComponent: () => import('./a/dash/page-not-found/page-not-found.component').then(x => x.PageNotFoundComponent),
                        data: { animation: 'pageNotFound' },
                    },
                ],
            },
        ],
    },
    {
        path: '',
        loadComponent: () => import('./g/g.component').then(x => x.GComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./g/home/home.component').then(x => x.HomeComponent),
            },
            {
                path: 'login',
                loadComponent: () => import('./g/login/login.component').then(x => x.LoginComponent),
                data: { animation: 'login' },
            },
            {
                path: 'regis',
                loadComponent: () => import('./g/regis/regis.component').then(x => x.RegisComponent),
            },
            {
                path: 'regis/mail',
                loadComponent: () => import('./g/regis-email/regis-email.component').then(x => x.RegisEmailComponent),
            },
            {
                path: 'reset',
                loadComponent: () => import('./g/reset/reset.component').then(x => x.ResetComponent),
            },
            {
                path: 'reset/mail',
                loadComponent: () => import('./g/reset-email/reset-email.component').then(x => x.ResetEmailComponent),
            },
            {
                path: 'reset/pass',
                loadComponent: () => import('./g/reset-new-pass/reset-new-pass.component').then(x => x.ResetNewPassComponent),
            },
            {
                path: 'about',
                loadComponent: () => import('./g/about/about.component').then(x => x.AboutComponent),
            },
            {
                path: 'faq',
                loadComponent: () => import('./g/faq/faq.component').then(x => x.FaqComponent),
            },
            {
                path: 'disclaimer',
                loadComponent: () => import('./g/disclaimer/disclaimer.component').then(x => x.DisclaimerComponent),
            },
            {
                path: 'm/d',
                loadComponent: () => import('./g/disease/disease.component').then(x => x.DiseaseComponent),
                children: [
                    {
                        path: 'a',
                        loadComponent: () => import('./g/disease/advance/advance.component').then(x => x.AdvanceComponent),
                        children: [
                            {
                                path: 'i',
                                loadComponent: () => import('./g/disease/advance/options/options.component').then(x => x.OptionsComponent),
                            },
                            {
                                path: 'r',
                                loadComponent: () => import('./g/disease/advance/results/results.component').then(x => x.ResultsComponent),
                            },
                        ],
                    },
                ],
            },
            {
                path: 'm/t',
                loadComponent: () => import('./g/tumor/tumor.component').then(x => x.TumorComponent),
                children: [
                    {
                        path: 'i',
                        loadComponent: () => import('./g/tumor/inputs/inputs.component').then(x => x.InputsComponent),
                    },
                    {
                        path: 'r',
                        loadComponent: () => import('./g/tumor/results/results.component').then(x => x.ResultsComponent),
                    },
                ],
            },
            {
                path: '**',
                loadComponent: () => import('./g/page-not-found/page-not-found.component').then(x => x.PageNotFoundComponent),
            },
        ],
    },
];
