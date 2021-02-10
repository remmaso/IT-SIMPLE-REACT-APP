import React, { Component } from "react";
// import BackButton from "../components/basic/BackButton";
import { withRouter } from "react-router-dom";
import FormInput from "../components/company/FormInput";
import Logger from "../utils/Logger";
import OfferItem from "../components/offer/OfferItem";
import styles from "../assets/styles/OfferDetails.module.css"

import fake_user from "../assets/images/fake/default_user.png"

import xIcon from "../assets/icons/x.svg";
import uploadIcon from "../assets/icons/upload.svg";
import trashIcon from "../assets/icons/trash.svg"
import xSquareIcon from "../assets/icons/x-square.svg";
import x_circle_icon from "../assets/icons/x-circle.svg";
import save_icon from "../assets/icons/save.svg";
import { uploadImage, putUserDetails } from "../components/basic/RestOfferAPI";
import LocationSelect from "../components/offer/location/LocationSelect";
class PersonalProfilePage extends Component {
  state = {
    myapplications: [],
    photoFileName: "",
    cvFileName: "",
    details: {
      authId: "",
      id: "",
      name: "",
      email: "",
      photoUrl: "",
      acceptTermAndConditions: false,
      marketingUpdatesRequested: false,
      classType: "",
      cvUrl: "",
      website: "",
      profile: "",
      message: "",
      jobProfile: "",
      userLocation: null,
    }
  }

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ details: user ? user : {} });
    if (user.cvUrl) this.setState({ cvFileName: decodeURI(user.cvUrl.split('/').slice(-1)[0]) })
    let requestOptions = {
      method: "POST",
      body: '{"query": "{offers(first: ' + 3 + '){ id jobTitle companyName jobLocation jobAvatar jobExperience salary { type from to currency per } techStack { key } } }"}'
    };
    fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "graphql", requestOptions)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          myapplications: (data.data.offers)
        })
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
          photoUrl: reader.result     // update the value of specific key
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
        photoUrl: ""     // update the value of specific key
      },
      photoFileName: ""
    }))
  }

  changeCV = () => {
    document.getElementById("cv-upload").click();
  }

  handleCV = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState(prevState => ({
        details: {                   // object that we want to update
          ...prevState.details,    // keep all other key-value pairs
          cvUrl: reader.result     // update the value of specific key
        },
        cvFileName: file.name
      }))
    }


    reader.readAsDataURL(file)
  }

  removeCV = (e) => {
    this.setState(prevState => ({
      details: {
        ...prevState.details,
        cvUrl: ""
      },
      cvFileName: ""
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

  getZipCode() {
    var zipCode = "";
    let location = this.state.details.userLocation;
    console.log(location)
    if (location) {
      for (var i = 0; i < location.address_components.length; i++) {
        var addressType = location.address_components[i].types[0];
        if (addressType === "postal_code") {
          zipCode = location.address_components[i]["long_name"];
        }
      }
    }
    return zipCode;
  }

  getCity() {
    var city = "";
    let location = this.state.details.userLocation;
    console.log(location)
    if (location) {
      for (var i = 0; i < location.address_components.length; i++) {
        var addressType = location.address_components[i].types[0];
        if (addressType === "locality") {
          city = location.address_components[i]["long_name"];
        }
      }
    }
    return city;
  }

  uploadAssets() {
    return Promise.all([uploadImage(this.state.details.photoUrl, this.state.photoFileName), uploadImage(this.state.details.cvUrl, this.state.cvFileName)])
  }

  handleSubmit() {
    let details = this.state.details;
    this.uploadAssets().then(([photo, cv]) => {
      details.photoUrl = photo ? photo.fileDownloadUrl : details.photoUrl;
      details.cvUrl = cv ? cv.fileDownloadUrl : details.cvUrl;
      putUserDetails(details)
        .then((res) => localStorage.setItem('user', JSON.stringify(res)))
        .catch(error => {
          Logger.trace("Error edit", error);
        });
    });
  }

  render() {
    return (
      <div className={ "container personal-profile" }>
        {/* <BackButton/> */ }
        { this.printPersonalDataSection() }
        { this.printProfessionalInfoSection() }
        { this.printAdditionalInfoSection() }
        { this.printProfileSettingsSection() }
        { this.printMyApplicationsSection() }
        <div className={ "action-row" }>
          <div className={ "navigation active cancel" } onClick={ (e) => { } }>
            <img src={ x_circle_icon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Cancel
          </div>
          <div className={ "navigation active save" } onClick={ (e) => { console.log(this.state.details); this.handleSubmit(); } }>
            <img src={ save_icon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Save
          </div>
        </div>
      </div>
    );
  }

  printPersonalDataSection() {
    return <div className={ "section" }>
      <div className={ "section-header" }>Your personal data</div>
      <div className={ "section-body" }>
        <div className={ "row" } style={ { alignItems: 'center', marginBottom: 30 } }>
          <div className={ "col" } style={ { flexGrow: 'unset' } }>
            <img src={ this.state.details.photoUrl ? this.state.details.photoUrl : fake_user } className={ "avatar" } alt={ "" } />
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
          <FormInput mandatory label={ "Name and Surname" } defaultValue={ this.state.details.name } onChange={ this.changeInput } name={ "name" } />
          <FormInput mandatory label={ "E-mail" } defaultValue={ this.state.details.email } disabled />
        </div>
        <div style={ { display: 'flex', alignItems: 'center' } }>
          <div
            className={ "active " + styles.os_selection + " " + (this.state.details.acceptTermAndConditions ? styles.os_selected : "") }
            onClick={ () => {
              this.setState((prevState) => ({
                details: {
                  ...prevState.details,
                  acceptTermAndConditions: !this.state.details.acceptTermAndConditions
                }
              }));
            } }>
            <div />
          </div>
          <div className={ "check-txt" }>Accept <a href="/" style={ { color: '#054AFA', textDecoration: 'underline' } }>terms and conditions</a></div>
        </div>
        <div style={ { display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 30 } }>
          <div
            className={ "active " + styles.os_selection + " " + (this.state.details.marketingUpdatesRequested ? styles.os_selected : "") }
            onClick={ () => {
              this.setState((prevState) => ({
                details: {
                  ...prevState.details,
                  marketingUpdatesRequested: !this.state.details.marketingUpdatesRequested
                }
              }));
            } }>
            <div />
          </div>
          <div className={ "check-txt" }>I would like to receive marketing updates</div>
        </div>
        <div className={ "upload-description" }>Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi.</div>
      </div>
    </div>

  }

  printProfessionalInfoSection() {
    return <div className={ "section" }>
      <div className={ "section-header" }>Your professional info</div>
      <div className={ "section-body" }>
        <div className={ "row" }>
          <div className={ "col-4" } style={ { marginBottom: 30 } }>
            <div className={ "form-label" }>{ "Your CV" }<span style={ { color: "#EB5928" } }>*</span> </div>
            <input className={ "form-input form-control" } onClick={ () => { this.changeCV() } } value={ this.state.cvFileName } style={ { paddingRight: 40, color: 'transparent', textShadow: '0 0 0  #0C152E ' } } />
            <input type="file" onChange={ this.handleCV } className={ "file-input" } id="cv-upload" accept="application/pdf" />
            { this.state.cvFileName && <img src={ trashIcon } alt="" style={ { position: 'absolute', right: 35, bottom: 22 } } onClick={ () => { this.removeCV() } } /> }
          </div>
          <FormInput width={ 4 } label={ "Your website" } onChange={ this.changeInput } name="website" defaultValue={ this.state.details.website } />
          <FormInput width={ 4 } label={ "Online profile" } onChange={ this.changeInput } name="profile" defaultValue={ this.state.details.profile } />
          <div className={ "col-12" }>
            <div className={ "form-label" }>Application message </div>
            <textarea className={ "form-input form-control" } defaultValue={ this.state.details.message } placeholder={ "Type a few words about yourself" } rows={ 7 } onChange={ this.changeInput } name="message" />
          </div>
        </div>
      </div>
    </div>
  }

  printAdditionalInfoSection() {
    return <div className={ "section" }>
      <div className={ "section-header" }>Additional info</div>
      <div className={ "section-body" }>
        <div className={ "row" }>
          <FormInput width={ 4 } label={ "Job profile" } onChange={ this.changeInput } name="jobProfile" defaultValue={ this.state.details.jobProfile } />
        </div>
        <div className={ "row" }>
          <div className={ "col-4" } style={ { marginBottom: 30 } }>
            <div className={ "form-label" }>{ "Street" }</div>
            <LocationSelect value={ this.state.details.userLocation } name={ "userLocation" } onChange={ this.changeLocation } className={ "form-control form-input" } />
          </div>
          {/* <FormInput width={ 4 } label={ "Street" } /> */ }
          <FormInput width={ 4 } label={ "Zip code" } defaultValue={ this.getZipCode() } />
          <FormInput width={ 4 } label={ "City" } defaultValue={ this.getCity() } />
        </div>
      </div>
    </div>
  }

  printProfileSettingsSection() {
    return <div className={ "section" }>
      <div className={ "section-header" }>Profile settings</div>
      <div className={ "section-body" }>
        <div className={ "row" }>
          <FormInput width={ 4 } label={ "Old password" } />
          <FormInput width={ 4 } label={ "New password" } />
          <FormInput width={ 4 } label={ "Repeat new password" } />
        </div>
        <div className={ "delete-account" }>
          <div>
            <div className={ "delete-title" }>Delete account</div>
            <div className={ "delete-description" }>Delete account information, all data will be removed and cannot be undone</div>
          </div>
          <div className={ "navigation active delete-btn" } onClick={ (e) => { } }>
            <img src={ xSquareIcon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Delete
          </div>
        </div>
      </div>
    </div>
  }

  printMyApplicationsSection() {
    return <div className={ "section my-applications" }>
      <div className={ "section-header" }>My Applications</div>
      <div className={ "section-body" }>
        { this.state.myapplications.length > 0 &&
          <div style={ { minWidth: '100%' } }>
            { this.state.myapplications.map((offer, index) => (
              <OfferItem jobOffer={ offer } key={ offer.id } index={ index } viewMode={ 'list' } />
            )) }
          </div>
        }
      </div>
    </div>
  }
}

export default withRouter(PersonalProfilePage);
