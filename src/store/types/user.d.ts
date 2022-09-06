import {UserInfo} from "@api/auth/types"

export interface UserState {
    token: string;
    userInfo: UserInfo;
}
