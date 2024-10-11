export interface ConsumptionLogsType {
    beverage_id: number;
    count: number;
    created_at: string;
    date: string;
    id: number;
    user_id: number;
}

export interface BeverageType {
    id: number;
    beverage: "tea" | "coffee";
}

export interface UserTye {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
}