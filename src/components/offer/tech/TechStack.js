import React from 'react'
import 'react-autocomplete-input/dist/bundle.css';
import TechUpdate from "./TechUpdate";
import TechCreate from "./TechCreate";
import { CollectionEdit } from "./CollectionEdit";

export default class TechStack extends CollectionEdit {
    getCollectionId() {
        return "techStack";
    }

    getCreate() {
        return <TechCreate controller={this} />;
    }

    getUpdate(i, entry) {
        return <TechUpdate key={i} value={entry} controller={this} />;
    }
}

