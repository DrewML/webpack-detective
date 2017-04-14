// @flow

import { type Action } from '../types/fsa';

type UIActions = Action<'UPLOAD_MODAL_OPEN', bool>;

export type UIState = {
    uploadModalOpen: bool;
};

export const uploadModalOpen = (isOpen: bool): UIActions => ({
    type: 'UPLOAD_MODAL_OPEN',
    payload: isOpen
});

const initial = {
    uploadModalOpen: false // TODO: default to true when out of dev
};

const reducer = (state: UIState = initial, action: UIActions): UIState => {
    switch(action.type) {
        case 'UPLOAD_MODAL_OPEN':
            return {
                ...state,
                uploadModalOpen: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
