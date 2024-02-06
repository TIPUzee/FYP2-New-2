import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class OffcanvasService {
    anyOffcanvasOpened: number = 0;

    async AdminCompletedAppointmentsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/completed-appointments/completed-appointments.component').then(x => {
            a = x.CompletedAppointmentsComponent;
        });
        return a;
    }

    async AdminPatientsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/patients/patients.component').then(x => {
            a = x.PatientsComponent;
        });
        return a;
    }

    async AdminAppointmentPaymentsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/appointment-payments/appointment-payments.component').then(x => {
            a = x.AppointmentPaymentsComponent;
        });
        return a;
    }

    async AdminActiveAppointmentsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/active-appointments/active-appointments.component').then(x => {
            a = x.ActiveAppointmentsComponent;
        });
        return a;
    }

    async AdminAllAppointmentCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/all-appointments/all-appointments.component').then(x => {
            a = x.AllAppointmentsComponent;
        });
        return a;
    }

    async AdminDoctorWithdrawalRequestsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/doctor-drawal-requests/doctor-drawal-requests.component').then(x => {
            a = x.DoctorDrawalRequestsComponent;
        });
        return a;
    }

    async AdminDoctorWithdrawalTransactionsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/doctor-drawal-transactions/doctor-drawal-transactions.component').then(x => {
            a = x.DoctorDrawalTransactionsComponent;
        });
        return a;
    }

    async AdminDoctorsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/doctors/doctors.component').then(x => {
            a = x.DoctorsComponent;
        });
        return a;
    }

    async AdminDoctorsApprovalRequestsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/doctors-approval-requests/doctors-approval-requests.component').then(x => {
            a = x.DoctorsApprovalRequestsComponent;
        });
        return a;
    }

    async AdminDoctorsSpecializationsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/doctors-specializations/doctors-specializations.component').then(x => {
            a = x.DoctorsSpecializationsComponent;
        });
        return a;
    }

    async AdminFailedAppointmentsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/failed-appointments/failed-appointments.component').then(x => {
            a = x.FailedAppointmentsComponent;
        });
        return a;
    }

    async AdminLanguagesCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/languages/languages.component').then(x => {
            a = x.LanguagesComponent;
        });
        return a;
    }

    async AdminPatientDrawalRequestsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/patient-drawal-requests/patient-drawal-requests.component').then(x => {
            a = x.PatientDrawalRequestsComponent;
        });
        return a;
    }

    async AdminPatientDrawalTransactionsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/patient-drawal-transactions/patient-drawal-transactions.component').then(x => {
            a = x.PatientDrawalTransactionsComponent;
        });
        return a;
    }

    async AdminPendingAppointmentsActionsCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/pending-appointments-actions/pending-appointments-actions.component').then(x => {
            a = x.PendingAppointmentsActionsComponent;
        });
        return a;
    }

    async AdminSpecializationCategoryAndDiseaseMappingCompo(): Promise<any> {
        let a;
        await import('../../../a/dash/specialization-category-and-disease-mapping/specialization-category-and-disease-mapping.component').then(x => {
            a = x.SpecializationCategoryAndDiseaseMappingComponent;
        });
        return a;
    }

    constructor() {}
}
