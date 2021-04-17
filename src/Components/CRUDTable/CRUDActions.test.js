import CRUDActions from "./CRUDActions.js";

const fakeApi = {
    patch: (pk, data) => "patch",
    post: (data) => "post",
    delete: (pk) => "delete"
}

describe('CRUDActions', () => {
    it('calls patch method on api when passed an Update action', () => {
        const action = {
            type: "Update"
        }

        expect(CRUDActions(fakeApi)(action)).toBe("patch")
    })

    it('calls post method on api when passed an Create action', () => {
        const action = {
            type: "Create"
        }

        expect(CRUDActions(fakeApi)(action)).toBe("post")
    })

    it('calls delete method on api when passed an Create action', () => {
        const action = {
            type: "Delete"
        }

        expect(CRUDActions(fakeApi)(action)).toBe("delete")
    })
})