import React from 'react'
import 'react-autocomplete-input/dist/bundle.css';
import WorkMethodologyUpdate from "./WorkMethodologyUpdate";
import WorkMethodologyCreate from "./WorkMethodologyCreate";
import {CollectionEdit} from "./CollectionEdit";

export default class WorkMethodology extends CollectionEdit {
    getCollectionId() {
        return "workMethodology";
    }

    getCreate() {
        return <WorkMethodologyCreate controller={this}/>;
    }

    getUpdate(i, entry) {
        return <WorkMethodologyUpdate key={i} value={entry} controller={this}/>;
    }
}

