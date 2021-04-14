import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CRUDTableFormat, {formatLookup} from './Formatters.js'
import fc from 'fast-check';

Enzyme.configure({ adapter: new Adapter() });

describe("formatLookup", () => {
    it('maps the correct key', () => {
        const data = {
            '1': {
                street_number: '742',
                street_name: 'Evergreen Terrace'
            },
            '2': {
                street_number: '744',
                street_name: 'Evergreen Terrace'
            }
        }

        const mapping = (value) => `${value.street_number} ${value.street_name}`

        const formatLookupClosure = formatLookup(data, mapping);

        for (const [key, value] of Object.entries(data)) {
            const formattedValue = formatLookupClosure(key);
            expect(formattedValue).toEqual(mapping(value));
        }
    });
});

describe("CRUDTableFormat", () => {
    it('returns undefined if no formatter provided in column', () => {
        fc.assert(
            fc.property(
                fc.object(), 
                fc.string(),  
                (column, value) => CRUDTableFormat({column: column, value: value}) === undefined
            )
        )
    });

    it('returns properly formatted value when supplied with truthy parameters', () => {
        fc.assert(
            fc.property(
                fc.func(fc.string()), 
                fc.lorem(),  
                (formatter, value) => {
                    return CRUDTableFormat({column: {formatter: formatter}, value: value}) == formatter(value)
                }
            )
        )
    });
});