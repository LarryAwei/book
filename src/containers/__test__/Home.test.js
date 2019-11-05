import React from 'react'
import { mount } from 'enzyme'
import { Home }  from '../Home'
import { parseToYearAndMonth, flatternArr, LIST_VIEW, CHART_VIEW } from '../../utility'
import PriceList from '../../components/PriceList'
import ViewTab from "../../components/ViewTab";
import MonthPicker from "../../components/MonthPicker";
import CreateBtn from "../../components/CreateBtn";

const initData = {
    categories: {},
    items: {},
    isLoading: false,
    categoriesIsLoaded: false,
    currentDate: parseToYearAndMonth()
}
const withLoadingData = {
    ...initData, isLoading: true
}
// const withLoadedData = {
//     categories: flatternArr(testCategories),
//     items: flatternArr(testItems),
//     isLoading: false,
//     currentDate: parseToYearAndMonth()
// }
const actions = {
    getInitalData: jest.fn(),
    selectNewMonth: jest.fn(),
    deleteItem: jest.fn()
}

let wrapper
describe('', ()=>{
    beforeEach(()=>{
        wrapper = mount(<Home/>)
    })
    it('should ', () => {
        expect(wrapper.find(PriceList).length).toEqual(1)
        expect(wrapper.find(ViewTab).props().activeTab).toEqual(LIST_VIEW)
        expect(wrapper.find(MonthPicker).props().year).toEqual(2019)
        expect(wrapper.find(PriceList).props().items.length).toEqual(1)
    });
    it('should click', function () {
        wrapper.find('nav-item a').last().simulate('click')
        expect(wrapper.find(PriceList).length).toEqual(0)
        expect(wrapper.find(ViewTab).props().activeTab).toEqual(CHART_VIEW)
    });
    it('should click new month', function () {
        wrapper.find('.dropdown-toggle').simulate('click')
        wrapper.find('.months-range .dropdown-item').at(11).simulate('click')
        expect(wrapper.find(MonthPicker).props().items.length).toEqual(1)
    });


})




// it('test home container first render, without any data, getInitalData should be called', () => {
//     const wrapper = mount(
//         <MemoryRouter>
//             <Home data={initData} actions={actions} />
//         </MemoryRouter>
//     )
//     expect(wrapper.find('.no-record').length).toEqual(1)
//     expect(actions.getInitalData).toHaveBeenCalled()
// })

// it('test home container with loading state, loading icon should show up', () => {
//     const wrapper = mount(
//         <MemoryRouter>
//             <Home data={withLoadingData} actions={actions} />
//         </MemoryRouter>
//     )
//     expect(wrapper.find(Loader).length).toEqual(1)
// })

// describe('test home container with loaded data', () => {
//     const wrapper = mount(
//         <MemoryRouter>
//             <Home data={withLoadedData} actions={actions} />
//         </MemoryRouter>
//     )
//     const wrapperInstance = wrapper.find(Home).instance()
//     it('should show price list and view tab', () => {
//         expect(wrapper.find(PriceList).length).toEqual(1)
//         expect(wrapper.find(Tabs).length).toEqual(1)
//         expect(wrapperInstance.state.tabView).toEqual(LIST_VIEW)
//         expect(wrapper.find(Loader).length).toEqual(0)
//     })
//     it('click the year and month should trigger the selectNewMonth callback', () => {
//         wrapper.find('.dropdown-toggle').simulate('click')
//         wrapper.find('.months-range .dropdown-item').first().simulate('click')
//         expect(actions.selectNewMonth).toHaveBeenCalledWith(initData.currentDate.year, 1)
//     })
//     it('click the item delete button should trigger the deleteItem callback', () => {
//         const firstItem = wrapper.find('.list-group .list-group-item').first()
//         firstItem.find('a').last().simulate('click')
//         expect(actions.deleteItem).toHaveBeenCalledWith(testItems[0])
//     })
//     it('click the the tab should change the view and state', () => {
//         wrapper.find('.nav-tabs .nav-item a').at(1).simulate('click')
//         expect(wrapper.find(PriceList).length).toEqual(0)
//         expect(wrapper.find(PieChart).length).toEqual(2)
//         expect(wrapperInstance.state.tabView).toEqual(CHART_VIEW)
//     })
// })
