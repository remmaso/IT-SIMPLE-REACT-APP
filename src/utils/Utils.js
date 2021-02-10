import React from "react";

import win_icon from "../assets/icons/windows.svg";
import apple_icon from "../assets/icons/apple.svg";
import linux_icon from "../assets/icons/linux.svg";

export function notImplemented(e) {
    alert("Not Implemented Yet")
}

export function goTo(withRouterComponent, e, location) {
    e.preventDefault();
    withRouterComponent.props.history.push(location);
}

export function goHome(withRouterComponent, e) {
    goTo(withRouterComponent, e, '/');
}

export function goBack(withRouterComponent, e) {
    e.preventDefault();
    withRouterComponent.props.history.goBack();
}

export function goAddOffer(withRouterComponent, e) {
    goTo(withRouterComponent, e, '/offer/add');
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const LEVELS = ["jun", "reg", "adv", "mas"];

function getLevel(level) {
    for (let i = 0; i < LEVELS.length; i++) {
        if (level.includes(LEVELS[i])) {
            return i;
        }
    }
    return -1;
}

export function isLevel(level, i) {
    if (!level) {
        return false;
    }
    return getLevel(level.toLowerCase()) >= i;
}

export function getSystemPresentation(system) {
    let systemStr = system.toLowerCase();
    let isMac = systemStr.includes("mac");
    let isWindows = systemStr.includes("win");
    let isLinux = systemStr.includes("lin");
    let isNonAbove = !isLinux && !isWindows && !isMac;
    return <>
        { isMac &&
            <img src={ apple_icon } alt="" style={ { marginRight: 20 } } />
        }
        { isWindows &&
            <img src={ win_icon } alt="" style={ { marginRight: 20 } } />
        }
        { isLinux &&
            <img src={ linux_icon } alt="" style={ { marginRight: 20 } } /> }
        { isNonAbove &&
            system
        }
    </>;
}

export function currentDateFormatted() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return today.getFullYear() + '-' + (month < 10 ? ('0' + month) : month) + '-' + (date < 10 ? ('0' + date) : date);
}

export function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
}

export function loginStatus() {
    let user = localStorage.getItem('user');
    let role = localStorage.getItem('role');
    if (!user) return false; else return role;
}