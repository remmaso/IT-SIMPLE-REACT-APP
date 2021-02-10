import React from "react";

export const CATEGORIES = ["Quality Assurance", "Backend", "Scrum Master", "Business Analyst", "Developer", "C# Developer", "Other"];
export const CONTRACT_TYPES = ["B2B", "Civil Contract", "Permanent Contract", "Other"];
const PER_VALUES = ["Hour", "Day", "Week", "Month", "Contract", "Task"];

export const PER_OPTIONS = [<option key={"empty_per"} value="" disabled hidden>Per</option>];
PER_VALUES.forEach((entry) => PER_OPTIONS.push(<option key={entry} value={entry}>{entry}</option>));

const CURRENCIES = ["EUR", "USD", "RON", "PLN", "AFN", "ALL", "DZD", "AOA", "XCD", "ARS", "AMD", "AWG", "SHP", "AUD", "AZN", "BSD", "BHD", "BDT", "BBD", "BYN", "BZD", "XOF", "BMD", "BTN", "BOB", "BAM", "BWP", "BRL", "BND", "BGN", "BIF", "CVE", "KHR", "XAF", "CAD", "KYD", "NZD", "CLP", "CNY", "COP", "KMF", "CDF", "none", "CRC", "HRK", "CUP", "ANG", "CZK", "DKK", "DJF", "DOP", "EGP", "ERN", "SZL", "ETB", "FKP", "FJD", "XPF", "GMD", "GEL", "GHS", "GIP", "GTQ", "GGP", "GNF", "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "INR", "IDR", "XDR", "IRR", "IQD", "IMP", "ILS", "JMD", "JPY", "JEP", "JOD", "KZT", "KES", "KWD", "KGS", "LAK", "LBP", "LSL", "LRD", "LYD", "CHF", "MOP", "MGA", "MWK", "MYR", "MVR", "MRU", "MUR", "MXN", "MDL", "MNT", "MAD", "MZN", "MMK", "NAD", "NPR", "NIO", "NGN", "KPW", "MKD", "NOK", "OMR", "PKR", "PGK", "PYG", "PEN", "PHP", "QAR", "RUB", "RWF", "WST", "STN", "SAR", "RSD", "SCR", "SLL", "SGD", "SBD", "SOS", "ZAR", "GBP", "KRW", "SSP", "LKR", "SDG", "SRD", "SEK", "SYP", "TWD", "TJS", "TZS", "THB", "TOP", "TTD", "TND", "TRY", "TMT", "UGX", "UAH", "AED", "UYU", "UZS", "VUV", "VES", "VND", "YER", "ZMW"];

export const CURRENCIES_OPTIONS = [<option key={"empty_per"} value="" disabled hidden>Select currency</option>];
CURRENCIES.forEach((entry) => CURRENCIES_OPTIONS.push(<option key={entry} value={entry}>{entry}</option>));

export const AVAILABLE_METHODOLOGIES = ["MySQL", "JavaScript", "Unix", "Azure", "BPMN", "Agile", "C#", "Oracle DB", "Oracle", "Phyton", "Scrum", "ISTQB", "Quality Assurance", "PHP", "Java"];

export const FILTER_OPTION = [<option value="tea" key="tea">Tea</option>, <option value="coffee" key="coffee">Coffee</option>, <option value="soda" key="soda">Soda</option>];
