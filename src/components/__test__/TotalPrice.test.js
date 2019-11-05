import React from 'react'
import {shallow} from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai';
import TotalPrice from "../TotalPrice";
Enzyme.configure({ adapter: new Adapter() });
const props = {
    income: 1000,
    outcome: 2000
};
describe('test', ()=>{
    it('should ', ()=> {
        const wrapper = shallow(<TotalPrice {...props}/>);
        expect(wrapper.find('.income span').text()*1).to.equal(1000)
        expect(wrapper.find('.outcome span').text()*1).to.equal(2000)
    });
});
