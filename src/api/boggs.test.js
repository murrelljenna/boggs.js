import { asLookup } from "./boggs.js";

import fc from 'fast-check';

jest.mock('./axios.js');

describe('asLookup', () => {
    it('returns { id : {...fields} } mapping for quick lookup', () => {
        fc.assert(
            fc.property (
                fc.array(fc.dictionary(fc.string(), fc.string(), {key: fc.constantFrom('id', 'dunno', 'meh', 'meow')}), {minLength: 1}),
                (data) => (data['id'] in asLookup(data))
            )
        )
    })
})