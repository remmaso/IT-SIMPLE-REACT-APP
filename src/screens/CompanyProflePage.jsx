import React, { Component } from "react";
// import BackButton from "../components/basic/BackButton";
import { withRouter } from "react-router-dom";
import FormInput from "../components/company/FormInput";


import fake_user from "../assets/images/fake/default_user.png"

import xIcon from "../assets/icons/x.svg";
import uploadIcon from "../assets/icons/upload.svg";
import plusCircleIcon from "../assets/icons/plus-circle.svg";
import x_circle_icon from "../assets/icons/x-circle.svg";
import save_icon from "../assets/icons/save.svg";
import { getTechSenioritySelection } from "../components/offer/tech/TechUpdate";
import Logger from "../utils/Logger";
import LocationSelect from "../components/offer/location/LocationSelect";
import { uploadImage, putCompanyDetails } from "../components/basic/RestOfferAPI";
class CompanyProfilePage extends Component {

  state = {
    id: JSON.parse(localStorage.getItem('user')).id,
    details: {
      companyImage: "",
      companyName: "",
      companySize: "",
      companyHQ: "",
      companyLocation: {},
      companyEmail: "",
      companyWebsite: "",
      companyOnlineProfile: "",
      companySummary: "",
      branches: [],
      recruiters: [],
    },
    photoFileName: ""
  }

  componentDidMount() {
    this.fetchDetail();
  }

  fetchDetail() {
    fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "companies/" + this.state.id)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ details: data })
      })
      .catch((e) => Logger.warn(e, this));
  }

  changeAvatar = () => {
    document.getElementById("avatar-upload").click();
  }

  handleAvatar = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState(prevState => ({
        details: {                   // object that we want to update
          ...prevState.details,    // keep all other key-value pairs
          companyImage: reader.result     // update the value of specific key
        },
        photoFileName: file.name
      }))
    }

    reader.readAsDataURL(file)
  }

  removeAvatar = (e) => {
    this.setState(prevState => ({
      details: {                   // object that we want to update
        ...prevState.details,    // keep all other key-value pairs
        companyImage: ""     // update the value of specific key
      },
      photoFileName: ""
    }))
  }

  changeInput = (e) => {
    let target = e.target;
    let field = target.name;
    let value = target.value;
    this.setState((prevState) => ({
      details: {
        ...prevState.details,
        [field]: value
      }
    }));
  }

  changeLocation = (target, name, value) => {
    this.setState((prevState) => ({
      details: {
        ...prevState.details,
        [name]: value
      }
    }));
  }

  handleSubmit() {
    let details = this.state.details;
    this.uploadAssets().then(([photo]) => {
      details.companyImage = photo ? photo.fileDownloadUrl : details.companyImage;
      putCompanyDetails(details)
        .then((res) => console.log(res))
        .catch(error => {
          Logger.trace("Error edit", error);
        });
    });
  }

  uploadAssets() {
    return Promise.all([uploadImage(this.state.details.companyImage, this.state.photoFileName)])
  }

  render() {
    return (
      <div className={ "container company-profile" }>
        {/* <BackButton/> */ }
        { this.printPersonalDataSection() }
        { this.printCompanyBranchesSection() }
        { this.printRecruimentTeamSection() }
        { this.printAccountSettingsSection() }
        <div className={ "action-row" }>
          <div className={ "navigation active cancel" } onClick={ (e) => { } }>
            <img src={ x_circle_icon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Cancel
          </div>
          <div className={ "navigation active save" } onClick={ (e) => { this.handleSubmit() } }>
            <img src={ save_icon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Save
          </div>
        </div>
      </div>
    );
  }

  printPersonalDataSection() {
    return <div className={ "section" }>
      <div className={ "section-header" }>Your company data</div>
      <div className={ "section-body" }>
        <div className={ "row" } style={ { alignItems: 'center', marginBottom: 30 } }>
          <div className={ "col" } style={ { flexGrow: 'unset' } }>
            <img src={ this.state.details.companyImage ? this.state.details.companyImage : fake_user } className={ "avatar" } alt={ "" } />
            <div className={ "avatar-close" } onClick={ () => { this.removeAvatar() } }>
              <img src={ xIcon } alt="" />
            </div>
          </div>
          <div className={ "col" }>
            <div className={ "navigation active upload-photo" } onClick={ (e) => { this.changeAvatar() } }>
              <input type="file" onChange={ this.handleAvatar } className={ "file-input" } id="avatar-upload" accept="image/x-png,image/gif,image/jpeg" />
              <img src={ uploadIcon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Upload photo
            </div>
            <div className={ "upload-description" }>At least 256x256 JPG or PNG file</div>
          </div>
        </div>
        <div className={ "row" }>
          <FormInput width={ 6 } mandatory label={ "Company name" } defaultValue={ this.state.details.companyName } onChange={ this.changeInput } name={ "companyName" } />
          <FormInput width={ 6 } mandatory label={ "Company Size" } defaultValue={ this.state.details.companySize } onChange={ this.changeInput } name={ "companySize" } />
          <FormInput width={ 6 } mandatory label={ "Company HQ" } defaultValue={ this.state.details.companyHQ } onChange={ this.changeInput } name={ "companyHQ" } />
          <div className={ "col-6" } style={ { marginBottom: 30 } }>
            <div className={ "form-label" }>{ "Full address" }<span style={ { color: "#EB5928" } }>*</span> </div>
            <LocationSelect value={ this.state.details.companyLocation } name={ "companyLocation" } onChange={ this.changeLocation } className={ "form-control form-input" } />
          </div>
          <FormInput width={ 6 } mandatory label={ "Phone" } defaultValue={ this.state.details.companyPhone } onChange={ this.changeInput } name={ "companyPhone" } />
          <FormInput width={ 6 } mandatory label={ "E-mail address" } defaultValue={ this.state.details.companyEmail } onChange={ this.changeInput } name={ "companyEmail" } />
          <FormInput width={ 6 } mandatory label={ "Company website" } defaultValue={ this.state.details.companySize } onChange={ this.changeInput } name={ "companyWebsite" } />
          <FormInput width={ 6 } mandatory label={ "Online profile" } defaultValue={ this.state.details.companyWebsite } onChange={ this.changeInput } name={ "companyOnlineProfile" } />
          <div className={ "col-12" }>
            <div className={ "form-label" }>Company summary<span style={ { color: "#EB5928" } }>*</span> </div>
            <textarea className={ "form-input form-control" } placeholder={ "Type a few words about your company" } rows={ 7 } name="companySummary" onChange={ this.changeInput } defaultValue={ this.state.details.companySummary } />
          </div>
        </div>
      </div>
    </div>

  }

  printCompanyBranchesSection() {
    return <div className={ "section" }>
      <div className={ "section-header" }>Company branches
        <div className={ "navigation active add" } onClick={ (e) => { } }>
          <img src={ plusCircleIcon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Add new branch
        </div>
      </div>
      <div className={ "section-body" }>

        <div>
          <div className={ "sub-title" }>Branch 1(Default)</div>
          <div className={ "row" }>
            <FormInput width={ 6 } mandatory label={ "Branch custom name" } />
            <FormInput width={ 6 } mandatory label={ "Office location" } />
            <FormInput width={ 6 } mandatory label={ "Full address" } />
            <FormInput width={ 6 } mandatory label={ "Phone" } />
            <FormInput width={ 6 } mandatory label={ "Application mail address" } />
          </div>
        </div>
      </div>
    </div>
  }

  printRecruimentTeamSection() {
    return <div className={ "section" }>
      <div className={ "section-header" }>Recruiment team
      <div className={ "navigation active add" } onClick={ (e) => { } }>
          <img src={ plusCircleIcon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Add new recruiter
        </div>
      </div>
      <div className={ "section-body" }>
        <div>
          <div className={ "sub-title" }>Recruiter 1(Default)</div>
          <div className={ "row" }>
            <FormInput width={ 6 } mandatory label={ "Name" } />
            <FormInput width={ 6 } mandatory label={ "Last name" } />
            <FormInput width={ 6 } mandatory label={ "E-mail" } />
            {/* <FormInput width={ 6 } label={ "Branch" } /> */ }

            <div className={ "col-6" } style={ { marginBottom: 30 } }>
              <div className={ "form-label" }>{ "Branch" }</div>
              <select
                required
                className={ "form-control" }
                name={ "value" }
                onChange={ (e) => { } }>
                { getTechSenioritySelection() }
              </select>
            </div>

          </div>
        </div>
      </div>
    </div>
  }

  printAccountSettingsSection() {
    return <div className={ "section" }>
      <div className={ "section-header" }>Company account settings</div>
      <div className={ "section-body" }>
        <div className={ "row" }>
          <FormInput width={ 4 } label={ "Old password" } />
          <FormInput width={ 4 } label={ "New password" } />
          <FormInput width={ 4 } label={ "Repeat new password" } />
          <div className={ "col-4" } style={ { marginBottom: 30 } }>
            <div className={ "form-label" }>{ "Set new admin" }</div>
            <select
              required
              className={ "form-control" }
              name={ "value" }
              onChange={ (e) => { } }>
              { getTechSenioritySelection() }
            </select>
          </div>
        </div>

      </div>
    </div>
  }
}

export default withRouter(CompanyProfilePage);
