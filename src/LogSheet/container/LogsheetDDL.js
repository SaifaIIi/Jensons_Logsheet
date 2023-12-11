import React, { useEffect, useState } from "react";
import InputField from "../../BasicComponents/InputField";
import DropDown from "../../BasicComponents/DropDown";
import axios from "axios";
import Table from "../../BasicComponents/Table";
var myInterVal;

function LogsheetDDL() {
  let date = new Date();
  let curDate =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);

  const [fromDate, setFromDate] = useState(curDate);
  const [toDate, setToDate] = useState(curDate);
  const [fromTime, setFromTime] = useState("00:00:00");
  const [toTime, setToTime] = useState("23:59:59");
  const [batch, setBatch] = useState("-1");
  const [ddlData, setddlData] = useState([
    { value: "-1", displayText: "Select Batch No." },
  ]);

  const [dataTable, setDataTable] = useState([]);
  const [noData, setnoData] = useState(false);
  const [showData, setShowData] = useState(false);
  const [hitContinu, setHitContinu] = useState(false);

  const onHanleInputes = (type, e) => {
    console.log(fromDate, toDate);
    setHitContinu(false);
    setnoData(false);
    setShowData(false);
    setBatch("-1");
    console.log(type, e.target.value);
    switch (type) {
      case "fromDate":
        if (e.target.value <= toDate) {
          setFromDate(e.target.value);
        } else {
          alert("From Date shoule be less than To Date");
        }
        break;
      case "toDate":
        if (e.target.value >= fromDate) {
          setToDate(e.target.value);
        } else {
          alert("To Date shoule be Greater than From Date");
        }
        break;
      case "fromTime":
        setFromTime(e.target.value);
        break;
      case "toTime":
        setToTime(e.target.value);
        break;
      case "batch":
        setBatch(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/report/et-dropdown?from=${fromDate}&to=${toDate}`
      )
      .then((data) => {
        console.log(data.data.etBatches, "datadata");
        setddlData([
          { value: "-1", displayText: "Select Batch No." },
          ...data.data.etBatches,
        ]);
      });
    setBatch("-1");
  }, [fromDate, toDate, fromTime, toTime]);
  const headerNames = [
    "DATE TIME",
    "ACTIVITY",
    "ET WEIGHT (KG)",
    "DT WEIGHT (KG)",
    "AGT RPM (ET)",
    "OPERATOR NAME",
  ];

  const takeTableData = () => {
    // if (batch !== "-1" && hitContinu) {
    axios
      .get(`http://localhost:8080/report/et-log?batchNo=${batch}`)
      .then((data) => {
        console.log(data.data.data);
        setDataTable(data.data.data);
        setnoData(data.data.data.length > 0 ? false : true);
        setShowData(data.data.data.length > 0);
      })
      .catch((e) => {
        setnoData(true);
        setShowData(false);
      });
    // }
  };

  useEffect(() => {
    if (batch === "-1") {
      setHitContinu(false);
    } else {
      takeTableData();
      setHitContinu(true);
    }
  }, [batch]);
  useEffect(() => {
    if (batch !== "-1" && hitContinu) {
      myInterVal = setInterval(() => {
        takeTableData();
      }, 4000);
    } else {
      clearInterval(myInterVal);
      console.log(myInterVal, "var myInterVal");
    }
  }, [hitContinu]);
  console.log(hitContinu, "hitContinu");
  const reset = () => {
    setShowData(false);
    setnoData(false);
    setDataTable([]);
    setBatch("-1");
    setToTime("23:59:59");
    setFromTime("00:00:00");
    setToDate(curDate);
    setFromDate(curDate);
    setHitContinu(false);
  };

  return (
    <div>
      <div className="main_container">
        <div className="item">
          <div className="project_container">
            <InputField
              lable="From Date"
              onChange={(e) => {
                onHanleInputes("fromDate", e);
              }}
              name="From Date"
              title="title"
              placeholder="Enter From Date"
              required={true}
              type={"date"}
              id={"props.id"}
              className={`demo`}
              value={fromDate}
            />
            <InputField
              lable="From Time"
              onChange={(e) => {
                onHanleInputes("fromTime", e);
              }}
              name="From Time"
              title="title"
              placeholder="Enter From Time"
              required={true}
              type={"time"}
              id={"props.id"}
              className={`demo`}
              step={"1"}
              value={fromTime}
            />
            <InputField
              lable="To Date"
              onChange={(e) => {
                onHanleInputes("toDate", e);
              }}
              name="To Date"
              title="title"
              placeholder="Enter To Date"
              required={true}
              type={"date"}
              id={"props.id"}
              className={`demo`}
              value={toDate}
            />
            <InputField
              lable="To Time"
              onChange={(e) => {
                onHanleInputes("toTime", e);
              }}
              name="To Time"
              title="title"
              placeholder="Enter To Time"
              required={true}
              type={"Time"}
              id={"props.id"}
              className={`demo`}
              step={"1"}
              value={toTime}
            />
            <DropDown
              lable="Batch No."
              onChange={(e) => {
                onHanleInputes("batch", e);
              }}
              name="From Time"
              title="title"
              placeholder="Enter From Time"
              required={true}
              type={"Time"}
              id={"props.id"}
              className={`demo`}
              option={ddlData}
              value={batch}
            />
            <div className=" export-reset-btn ">
              <button className="resetBtn cur-p" id="Export" onClick={reset}>
                Reset
              </button>
            </div>
          </div>
        </div>
        {showData ? (
          <div className="item">
            <div className="pdf-heading">
              <div className="head-wrapper">
                <div
                  className="width-100 txt-alin-cntr p-1 fnt-b"

                  // style= "color: #343a40;border-top-left-radius: 0.8rem; border-top-right-radius: 0.8rem;"
                >
                  ET LOG SHEET
                </div>
              </div>
            </div>
            <Table
              columnsKey={headerNames}
              columns={headerNames}
              dataTable={dataTable}
            />
          </div>
        ) : null}
        {noData ? (
          <div className="nodataSec-nodataText" id="nodataText">
            No Data To Display
          </div>
        ) : null}
      </div>
      {/* <div id="model">
        <div className="popUp p red   popUpEntrada">
          <div className="error-icon"></div>
          <div><span className="plr-2 fnt-b" >
            oko</span></div>
          <button className="puCancelar">ok</button>
        </div>
      </div>

      <div id="fullWidthBackground">
        <div className="popUpFundo red"></div>
      </div> */}
    </div>
  );
}

export default LogsheetDDL;
