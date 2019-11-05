import React from 'react'
import {shallow} from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from "enzyme-to-json";
import PriceList from "../PriceList";
import {items, categories} from '../../containers/Home'
Enzyme.configure({ adapter: new Adapter() });

const itemWithCategory = items.map(item=>{
    item.category = categories[item.cid]
    return item
});
const props = {
    items: itemWithCategory,
    onModifyItem: jest.fn(),
    onDelItem: jest.fn()
};
let wrapper;
describe('test priceList', ()=>{
    beforeEach(()=>{
        wrapper = shallow(<PriceList {...props}/>)
    });
    it('should render a component matching the snapshot', () => {
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();

    });
    it('should length', () => {
        expect(wrapper.find('.list-group-item').length).toEqual(itemWithCategory.length)
    });
    it('should trigger function callback',  () => {
        const firstItem = wrapper.find('.list-group-item').first()
        firstItem.find('a').first().simulate('click')
        expect(props.onModifyItem).toHaveBeenCalledWith(itemWithCategory[0])
    });
});
