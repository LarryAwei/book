import React, {Component} from 'react'
import {LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft} from "../utility";
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import TotalPrice from "../components/TotalPrice";
import MonthPicker from "../components/MonthPicker";
import CreateBtn from "../components/CreateBtn";
import {Tabs, Tab} from "../components/Tabs";
import {flatternArr} from "../utility";
import Ionicon from "react-ionicons";
import {testCategories, testItems} from "../testData";
import {AppContext} from "../App";
import {withContext} from "../WithContext";
import {withRouter} from 'react-router-dom'

// export const categories = {
//     "1": {
//         "id": "1",
//         "name": "旅行",
//         "type": "outcome",
//         "iconName": "ios-plane"
//     },
//     "2": {
//         "id": "2",
//         "name": "红包",
//         "type": "income",
//         "iconName": "ios-plane"
//     }
// };
// export const items = [
//     {
//         "id": 1,
//         "title": "旅游",
//         "price": 200,
//         "date": "2019-10-20",
//         "cid" : 1
//     },
//     {
//         "id": 2,
//         "title": "充值",
//         "price": 100,
//         "date": "2019-12-20",
//         "cid": 2
//     }
// ];
const newItem = {
    "id": 4,
    "title": "新项目",
    "price": 3000,
    "date": "2019-09-12",
    cid: 1
}
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: testItems,
            currentDate: parseToYearAndMonth(),
            tabView: LIST_VIEW
        }
    }

    changeView = (view) => {
        this.setState({
            tabView: view
        })
    }
    changeDate = (year, month) => {
        this.setState({
            currentDate: {year, month}
        })

    }
    createItem = () => {
        this.props.history.push('/create')
        // this.setState({
        //     items: [newItem, ...this.state.items]
        // })
    }
    modifyItem = (mitem) => {
        this.props.history.push(`/edit/${mitem.id}`)
        // const modifyItems = this.state.items.map(item=>{
        //     if(item.id===mitem.id)
        //         return {...item, title: 'new'}
        //     else
        //         return item
        // })
        // this.setState({
        //     items: modifyItems
        // })
    }
    deleteItem = (ditem) => {
        this.props.actions.deleteItem(ditem)
        // const filterItems = this.state.items.filter(item=>item.id!==ditem.id)
        // this.setState({
        //     items: filterItems
        // })
    }
    render() {
        const {data} = this.props
        const {items, currentDate, tabView} = this.state
        const itemWithCategory = items.map(item=>{
            item.category=flatternArr(testCategories)[item.cid];
            return item
        }).filter(item=>{
            return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
        })

        let totalIncome = 0, totalOutcome = 0
        itemWithCategory.forEach(item => {
            if (testCategories[0].type === TYPE_OUTCOME) {
                totalOutcome += item.price
            } else {
                totalIncome += item.price
            }
        });
        return(

                        <React.Fragment>
                            <header className="App-header">
                                <p>
                                    Edit <code>src/App.js</code> and save to reload.
                                </p>
                                <a
                                    className="App-link"
                                    href="https://reactjs.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Learn React
                                </a>
                                <div className="row">
                                    <div className="col">
                                        <MonthPicker
                                            year={currentDate.year}
                                            month={currentDate.month}
                                            onChange={this.changeDate}
                                        />
                                    </div>
                                    <div className="col">
                                        <TotalPrice
                                            income={totalIncome}
                                            outcome={totalOutcome}
                                        />
                                    </div>
                                </div>

                            </header>
                            <div className={"content-area py-3 px-3"}>
                                <Tabs activeIndex={0} onTabChange={this.changeView}>
                                    <Tab>
                                        <Ionicon
                                            className="rounded-circle mr-2"
                                            fontSize="25px"
                                            color={'#007BFF'}
                                            icon='ios-paper'
                                        />
                                        列表模式
                                    </Tab>
                                    <Tab>
                                        <Ionicon
                                            className="rounded-circle mr-2"
                                            fontSize="25px"
                                            color={'#007BFF'}
                                            icon='ios-pie'
                                        />
                                        图表模式
                                    </Tab>
                                </Tabs>
                                {/*<ViewTab activeTab={tabView} onTabChange={this.changeView} />*/}
                                <CreateBtn  onClick={this.createItem}/>
                                {tabView===LIST_VIEW &&
                                <PriceList items={itemWithCategory} onModifyItem={this.modifyItem} onDelItem={this.deleteItem}/>
                                }
                                {
                                    tabView===CHART_VIEW &&
                                    <h1>图标</h1>
                                }

                            </div>
                        </React.Fragment>

        )
    }
}
export default withRouter(withContext(Home))
