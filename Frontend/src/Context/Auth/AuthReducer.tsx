import { AuthActionType, AuthStateType } from '../../Types';

const AuthReducer = (
    state: AuthStateType,
    action: AuthActionType,
): AuthStateType => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                login: true,
                userId: action.payload?.user_id,
                username: action.payload?.username,
                name: action.payload?.name,
                email: action.payload?.email,
                photo: action.payload?.photo,
                id: action.payload?.id,
            };

        case 'LOGOUT':
            return {
                ...state,
                login: false,
                userId: '',
                username: '',
                name: '',
                email: '',
                photo: '',
                id: '',
            };

        default:
            return state;
    }
};

export default AuthReducer;
