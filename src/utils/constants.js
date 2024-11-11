//Import Icon Images
import prepareDataIcon from "../assets/images/svg/prepareDataIcon.svg"
import exportDataIcon from "../assets/images/svg/exportDataIcon.svg"
import viewDataIcon from "../assets/images/svg/viewIcon.svg"

export const SIDEBAR_DATA = [
    {
        id:1,
        title:"Prepare Data",
        icon:prepareDataIcon,
        nodes:[
            {
                identifier:"prepareData",
                title:"Prepare Data",
                type:"source",
                multiple:true
            }
        ]
    },
    {
        id:2,
        title:"Views",
        icon:viewDataIcon,
        nodes:[
            {   
                identifier:"tableView",
                title:"Table View",
                type:"target",
                multiple:false
            },
            {   
                identifier:"dashboardView",
                title:"Dashboard View",
                type:"target",
                multiple:true
            },
        ]
    },
    {
        id:3,
        title:"Share Data",
        icon:exportDataIcon,
        nodes:[
            {
                identifier:"exportData",
                title:"Export Data",
                type:"target",
                multiple:false
            }
        ]
    },
]

export const CAN_SINGLE_ENTRY = ["Table View", "Export Data", "Prepare Data"];

export const formAccessProperty = {
    PREPARE_DATA : "prepareData",
    EXPORT_DATA : "exportData",
    TABLE_VIEW : "tableView",
    DASHBOARD_VIEW : "dashboardView",
    NESTED_TABLE : "Nested Table View",
    NESTED_DASHBOARD_DONUT_CHART : "Nested Dashboard View - Donut Chart",
    NESTED_DASHBOARD_BAR_CHART : "Nested Dashboard View - Bar Chart",
    NESTED_DASHBOARD_DATA_TABLE : "Nested Dashboard View - Data Table"
}

export const chartConstants = {
    donut : "Donut chart",
    bar : "Bar chart",
    table : "Data table"
}