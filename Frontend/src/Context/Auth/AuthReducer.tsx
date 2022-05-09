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
                name: action.payload?.name,
                email: action.payload?.email,
                photo: action.payload?.photo,
            };

        case 'LOGOUT':
            return {
                ...state,
                login: false,
                userId: '',
                name: '',
                email: '',
                photo: '',
            };

        default:
            return state;
    }
};

export default AuthReducer;
