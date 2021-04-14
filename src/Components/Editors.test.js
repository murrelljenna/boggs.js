/*import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {ReferenceEditor} from './Editors.js'

Enzyme.configure({ adapter: new Adapter() });

describe("ReferenceEditor", () => {
    it('should call onChange prop', () => {
        const onSearchMock = jest.fn();
        const event = {
            preventDefault() {},
            target: { value: 'the-value' }
        };
        const component = Enzyme.shallow(<ReferenceEditor onSearch={onSearchMock} />);
        component.find('input').simulate('change', event);
        expect(onSearchMock).toBeCalledWith('the-value');
    });
});*/