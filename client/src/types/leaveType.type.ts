export type leaveDetailsType = {
    id: number;
    uuid: string;
    name: string;
    description: string;
    is_paid: boolean;
    required_attachment: boolean;
    exclude_company_holidays: boolean;
    encashable: boolean;
    max_club_days: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}