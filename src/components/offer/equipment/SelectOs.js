import React, { Component } from "react";
import styles from "../../../assets/styles/OfferDetails.module.css";
import Logger from "../../../utils/Logger";

import apple_icon  from "../../../assets/icons/apple.svg";
import linux_icon from "../../../assets/icons/linux.svg";
import windows_icon from "../../../assets/icons/windows.svg";
export default class SelectOs extends Component {

    render() {
        Logger.trace("operating systems", this.props.value);
        let system = this.props.value.find(elem => elem.key === "Operating system");
        Logger.trace("operating systems", system);
        let systemStr = system ? system.value.toLowerCase() : "";
        let isMac = systemStr.includes("mac");
        let isWindows = systemStr.includes("win");
        let isLinux = systemStr.includes("lin");
        return (
            <div className={"stack_row"}>
                <div className={"sub_title"}>
                    Select OS
                </div>
                <div className={"os-select"}>
                    <div >
                        <div className={"os-col"}>
                            <div className={"os-row"}>
                                <div className={"col-auto"} style={{ paddingRight: 0 }}>
                                    <div
                                        className={"active " + styles.os_selection + " " + (isMac ? styles.os_selected : "")}
                                        onClick={() => this.selectOs("mac", !isMac)}>
                                        <div />
                                    </div>
                                </div>
                                <div className={"col"} style={{ paddingLeft: 10 }}>
                                    Apple
                            </div>
                                <div className={"col-auto"}>
                                    <img src={apple_icon} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div className={"os-col"}>

                            <div className={"os-row"}>
                                <div className={"col-auto"} style={{ paddingRight: 0 }}>
                                    <div
                                        className={"active " + styles.os_selection + " " + (isWindows ? styles.os_selected : "")}
                                        onClick={() => this.selectOs("win", !isWindows)}>
                                        <div />
                                    </div>
                                </div>
                                <div className={"col"} style={{ paddingLeft: 10 }}>
                                    Windows
                            </div>
                                <div className={"col-auto"}>
                                    <img src={windows_icon} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div className={"os-col"}>
                            <div className={"os-row"}>
                                <div className={"col-auto"} style={{ paddingRight: 0 }}>
                                    <div
                                        className={"active " + styles.os_selection + " " + (isLinux ? styles.os_selected : "")}
                                        onClick={() => this.selectOs("lin", !isLinux)}>
                                        <div />
                                    </div>
                                </div>
                                <div className={"col"} style={{ paddingLeft: 10 }}>
                                    Linux
                            </div>
                                <div className={"col-auto"}>
                                    <img src={linux_icon} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    selectOs(system, selection) {
        let value = this.props.value;
        let systemEntryFound = value.find(elem => elem.key === "Operating system");
        let systemEntry = systemEntryFound ? systemEntryFound : { key: "Operating system", value: "" };
        let systemStr = systemEntry.value.toLowerCase();
        if (selection) {
            systemStr = systemStr + "," + system;
        } else {
            systemStr = systemStr.replace(system, "");
            systemStr = systemStr.replace(",,", ",");
        }
        Logger.trace("selectOs is", systemEntry.value);
        Logger.trace("selectOs to be", systemStr);
        systemEntry.value = systemStr;
        if (!systemEntryFound) {
            value.push(systemEntry);
        }
        this.props.onChange(this, "equipment", value);
    }
}
