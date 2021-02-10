import Logger from "../../utils/Logger";
import { DataURIToBlob } from "../../utils/Utils";

export async function putJobOffer(details) {
    if (!details || !details.id) {
        Logger.error("trying to update empty offer")
        return;
    }
    Logger.info("Putting job offer", details);
    let method = "PUT";
    let requestOptions = {
        method: method,
        mode: "cors",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(details)
    };
    Logger.trace("sending put", requestOptions);
    let id = details.id;
    let requestUrl = "offers/" + id;
    return fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + requestUrl, requestOptions)
        .then(res => {
            Logger.trace("put result", res);
            if (res.status !== 200) {
                let result = res.json();
                Logger.trace("failed put", result);
                throw result;
            }
            return null;
        });
}

export async function postJobOffer(details) {
    if (!details || details.id) {
        Logger.error("trying to create empty or existing offer")
        return;
    }
    Logger.info("Posting job offer", details);
    let method = "POST";
    let requestOptions = {
        method: method,
        mode: "cors",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(details)
    };
    Logger.trace("sending post", requestOptions);
    let requestUrl = "offers/";
    return fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + requestUrl, requestOptions)
        .then(res => res.json())
        .then(res => {
            Logger.info("Posted job offer", res);
            Logger.info("Posted job offer", res.status);
            if (!res.status) {
                return res;
            }
            throw res;
        });
}

export async function uploadImage(imageData, filename) {
    if (imageData === "" || imageData.split(":")[0] === "http") return;
    var file = DataURIToBlob(imageData);
    let formdata = new FormData();
    formdata.append('file', file, filename);
    return fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "storage", {
        method: 'POST',
        body: formdata
    })
        .then(res => res.json())
}

export async function putUserDetails(details) {
    if (!details || !details.id) {
        Logger.error("trying to update empty offer")
        return;
    }
    Logger.info("Putting user detail", details);
    let method = "PUT";
    let requestOptions = {
        method: method,
        mode: "cors",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(details)
    };
    Logger.trace("sending put", requestOptions);
    let id = details.id;
    let requestUrl = "users/" + id + '/profile';
    return fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + requestUrl, requestOptions)
        .then(res => {
            Logger.trace("put result", res);
            if (res.status !== 200) {
                let result = res.json();
                Logger.trace("failed put", result);
                throw result;
            }
            return res.json();
        });
}

export async function putCompanyDetails(details) {
    if (!details || !details.id) {
        Logger.error("trying to update empty offer")
        return;
    }
    Logger.info("Putting user detail", details);
    let method = "PUT";
    let requestOptions = {
        method: method,
        mode: "cors",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(details)
    };
    Logger.trace("sending put", requestOptions);
    let id = details.id;
    let requestUrl = "companies/" + id ;
    return fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + requestUrl, requestOptions)
        .then(res => {
            Logger.trace("put result", res);
            if (res.status !== 200) {
                let result = res.json();
                Logger.trace("failed put", result);
                throw result;
            }
            return res.json();
        });
}


