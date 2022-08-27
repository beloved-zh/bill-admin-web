import {UserInfo} from "@api/auth/types"

export interface UserState extends UserInfo {
    token: string;
}
