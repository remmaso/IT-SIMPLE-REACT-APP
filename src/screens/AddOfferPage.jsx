import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import getSymbolFromCurrency from 'currency-symbol-map'
import Dropzone from "react-dropzone";

import Logger from "../utils/Logger";
import { createJobOffer, DEFAULT_OFFER } from "../components/basic/DEFAULT_OFFER";
import { currentDateFormatted, goTo, } from "../utils/Utils";
import { postJobOffer, putJobOffer, uploadImage } from "../components/basic/RestOfferAPI";
import SubHeader from "../components/offer/SubHeader";
import TechStack from "../components/offer/tech/TechStack";
import { validateNotEmpty, validateNumber, validateRange } from "../utils/Validators";
import LocationSelect from "../components/offer/location/LocationSelect";
import SalaryEdit from "../components/offer/salary/SalaryEdit";
import { CATEGORIES, CONTRACT_TYPES } from "../assets/Const";
import WorkMethodology from "../components/offer/meth/WorkMethodology";
import styles from "../assets/styles/OfferDetails.module.css"
import { ArrayEdit } from "../components/offer/dailyTasks/ArrayEdit";
import EditEquipment from "../components/offer/equipment/EditEquipment";

import defaultLogo from "../assets/images/jobavatar.png";
import pencil_icon from "../assets/icons/pencil.svg";
import camera_icon from "../assets/icons/camera.svg";
import plus_icon from "../assets/icons/plus-circle.svg";
import x_circle_icon from "../assets/icons/x-circle.svg";
import save_icon from "../assets/icons/save.svg";
import template_icon from "../assets/icons/template.svg";
import publish_icon from "../assets/icons/publish.svg";

class OfferDetails extends Component {

  state = {
    requestedId: null,
    details: DEFAULT_OFFER,
    salaryPosition: -1,
    mode: null,
    errors: null,
    avatarFileName: "",
    imageFileName: ""
  };

  lastId = null;

  VALIDATORS = new Map([
    ["companySize", [validateNumber]],
    ["remotePercentage", [validateNumber, validateRange(0, 100)]],
    ["jobTitle", [validateNotEmpty]],
    ["jobExperience", [validateNotEmpty]],
    ["jobDescription", [validateNotEmpty]]
  ]);

  changeLogo = () => {
    document.getElementById("logo-upload").click();
  }

  handleLogo = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState(prevState => ({
        details: {                   // object that we want to update
          ...prevState.details,    // keep all other key-value pairs
          jobAvatar: reader.result     // update the value of specific key
        },
        avatarFileName: file.name
      }))
    }

    reader.readAsDataURL(file)
  }

  changeJobImage = () => {
    document.getElementById("job-image-upload").click();
  }

  handleJobImage = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState(prevState => ({
        details: {                   // object that we want to update
          ...prevState.details,    // keep all other key-value pairs
          jobImage: reader.result     // update the value of specific key
        },
        imageFileName: file.name
      }))
    }

    reader.readAsDataURL(file)
  }

  static getDerivedStateFromProps(props, state) {
    Logger.trace("OfferDetails props", props);
    Logger.trace("OfferDetails state", state);
    if (!props.match.params.id) {
      if (state.mode !== "add") {
        return {
          mode: "add",
          details: createJobOffer(),
          errors: null,
          salaryPosition: 0
        };
      }
      return {};
    }
    let requestedId = props.match.params.id;
    let mode = 'edit';
    if (state.requestedId === requestedId && state.mode === mode) {
      return {};
    }
    return { requestedId: requestedId, mode: mode, errors: null };
  }

  componentDidMount() {
    if (this.shouldFetchDetails()) {
      this.fetchDetails(this.state.requestedId);
    }
  }

  shouldFetchDetails() {
    return this.state.requestedId !== this.lastId;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.shouldFetchDetails()) {
      this.fetchDetails(this.state.requestedId);
      // window.scrollTo(0, 0);
    }
  }

  fetchDetails(id) {
    if (!id) {
      return;
    }
    this.lastId = id;
    fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "offers/" + id)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        let salaryPosition = -1;
        if (data && data.salary && data.salary.length > 0) {
          salaryPosition = 0;
        }
        this.setState({ details: data, salaryPosition: salaryPosition })
      })
      .catch((e) => Logger.warn(e, this));
  }

  isEditable() {
    return this.state.details && (this.state.mode === "edit" || this.state.mode === "add");
  }

  isEdit() {
    return this.state.details && this.state.mode === "edit";
  }

  isAdd() {
    return this.state.details && this.state.mode === "add";
  }

  render() {
    let formStyle = "editable";
    if (this.isAdd()) {
      formStyle += " add";
    }
    if (this.isEdit()) {
      formStyle += " edit";
    }

    return <div>
      <form autoComplete={ "false" }>
        <div className={ "offer_details " + formStyle }>
          { this.printHeader() }
          <SubHeader details={ this.state.details } editable={ this.isEditable() } onChange={ this.onChange } />
          <div className={ "container" }>
            <div className={ "row" }>
              <div className={ "col-8" } style={ { paddingLeft: 0 } }>
                { this.printSectionErrors(this.state.errors) }
                { this.printSectionJobDetails(this.state.details) }
                { this.printSectionTechStack(this.state.details) }
                { this.printSectionWorkMethodology(this.state.details) }
                { this.printSectionDailyTasks(this.state.details) }
                { this.printSectionEquipment(this.state.details) }
                {/* {this.printSectionJobSpec(this.state.details)} */ }
                { this.printSectionBenefits(this.state.details.benefits) }
                { this.printSectionOfficeAmenities(this.state.details.officeAmenities) }
                { this.printSectionActions(this.state.details.id) }
              </div>
              { this.printJobHighlights(this.state.details) }
            </div>
          </div>
        </div>
      </form>
    </div>
  }

  uploadAssets() {
    return Promise.all([uploadImage(this.state.details.jobAvatar, this.state.avatarFileName), uploadImage(this.state.details.jobImage, this.state.imageFileName)])
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    let details = this.state.details;

    let processErrors = (error) => {
      const errors = error.errors;
      let wrongFields = document.getElementsByClassName("form_error");
      Logger.trace("wrong fields", wrongFields);
      for (let field of wrongFields) {
        field.classList.remove("form_error");
        field.setAttribute("title", "");
      }
      if (errors) {
        errors.forEach((error) => {
          Logger.trace("error " + error["field"], error);
          let errorFields = document.getElementsByName(error["field"]);
          Logger.trace("error fields", errorFields);
          errorFields.forEach(field => {
            field.classList.add("form_error");
            field.setAttribute("title", error["defaultMessage"]);
          })
        })
      }
      const errorsView = errors ? errors : [];
      errorsView.push({ field: "", defaultMessage: error.message });
      this.setState({ errors: errorsView });
    };

    if (this.isEdit()) {
      this.uploadAssets().then(([avatar, image]) => {
        details.jobImage = image ? image.fileDownloadUrl : details.jobImage;
        details.jobAvatar = avatar ? avatar.fileDownloadUrl : details.jobAvatar;
        putJobOffer(details)
          .then(() => goTo(this, e, "/offer/" + details.id))
          .catch(error => {
            error.then(err => {
              Logger.trace("Error edit", err);
              processErrors(err);
            })
          });
      });
    } else if (this.isAdd()) {
      this.uploadAssets().then(([avatar, image]) => {
        details.jobImage = image ? image.fileDownloadUrl : details.jobImage;
        details.jobAvatar = avatar ? avatar.fileDownloadUrl : details.jobAvatar;
        postJobOffer({
          ...details,
          "postingDate": currentDateFormatted()
        })
          .then(res => {
            goTo(this, e, "/offer/" + res.id);
          })
          .catch(error => {
            Logger.trace("Error", error);
            processErrors(error);
          });
      });

    }
  };

  onChangeHandler = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.onChange(target, name, value);
  };

  onChange = (target, name, value) => {
    Logger.trace("setting value", target);
    let validators = this.VALIDATORS.get(name);
    if (validators) {
      target.classList.remove("form_error");
      target.setAttribute("title", "");
      validators.forEach(validator => {
        let result = validator(value);
        if (result) {
          target.classList.add("form_error");
          target.setAttribute("title", result);
        }
      })
    }
    this.setState((prevState) => ({
      details: {
        ...prevState.details,
        [name]: value
      }
    }));
  };

  printSalaryDetails(details, salaryPosition) {
    return <div className={ "col-4 content floating " + styles.salary_detail }>
      <div>
        { this.printSalaryAtPosition(details.salary, salaryPosition) }
        { this.printSalarySwitch(details.salary, salaryPosition) }
        { this.printLocation(details) }
        <div className={ "navigation active apply" }>
          <div className={ "row" }>
            <div className={ "col-auto" }><i className={ "fa fa-check-circle" } /></div>
            <div className={ "col" }>Apply</div>
          </div>
        </div>
        <div className={ "col-12 other" }>
          <div className={ "row" }>
            <div className={ "active col-lg" }>
              <div className={ "row active" }>
                <div className={ "col-auto" }><i className={ "fa fa-share" } /></div>
                <div className={ "col" }>Share</div>
              </div>
            </div>
            <div className={ "active col-lg" }>
              <div className={ "row active" }>
                <div className={ "col-auto" }><i className={ "fa fa-exchange" } /></div>
                <div className={ "col" }>Compare</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  printSalaryAtPosition(salary, salaryPosition) {
    if (!salary || salaryPosition < 0 || salary.length <= salaryPosition) {
      return <div />;
    }
    Logger.trace("printing salary at position " + salaryPosition, salary);
    let currencySymbol = getSymbolFromCurrency(this.state.details.salary[this.state.salaryPosition].currency);
    currencySymbol = currencySymbol ? currencySymbol : this.state.details.salary[this.state.salaryPosition].currency;
    return (
      <div>
        <div className={ "value" }>
          { this.state.details.salary[this.state.salaryPosition].from + " - " + this.state.details.salary[this.state.salaryPosition].to + " " + currencySymbol }
        </div>
        <div className={ "per" }>
          { this.state.details.salary[this.state.salaryPosition].type.toLowerCase() === "b2b" &&
            "+VAT (B2B)"
          }
          { this.state.details.salary[this.state.salaryPosition].type.toLowerCase() !== "b2b" &&
            "gross"
          } per { this.state.details.salary[this.state.salaryPosition].per }
        </div>
      </div>
    );
  }

  printSalarySwitch(salary, salaryPosition, addAction) {
    if (salary.length === 0 || salary[0].type === "") {
      return;
    }
    return (
      <div className={ "row salary_switch" }>
        { salary.map((entry, i) => (
          <div key={ "salary_switch_" + i }
            className={ "col active" + (i === salaryPosition ? " selected" : "") }
            onClick={ () => this.setState({
              salaryPosition: i
            }) }>
            <div style={ { color: i === salaryPosition ? "#ffffff" : '#888E9E' } }>{ entry.type }</div>
          </div>
        )) }
        { addAction && CONTRACT_TYPES.length > salary.length &&
          <div className={ "col-auto action-col add" } style={ { paddingRight: 0 } }>
            <div className={ "active action-div" } style={ { width: 45, backgroundColor: '#054AFA', lineHeight: '45px' } } onClick={ () => addAction() }>
              <img alt="" src={ plus_icon } />
            </div>
          </div>
        }
      </div>
    )
  }

  printLocation(details) {
    return <div>
      <div className={ "loc_label" }>Location</div>
      <div className={ "loc_value" }>
        <i className="fa fa-map-marker" />{ details.jobLocation ? details.jobLocation.formatted_address : "" }
      </div>
    </div>;
  }

  printJobHighlights = (details) => {

    const onChangeSalary = (entry, name, value) => {
      const salaries = details.salary;
      const pos = salaries.indexOf(entry);
      salaries[pos][name] = value;
      this.onChange(this, "salary", salaries);
    };
    const addContractType = () => {
      const salaries = details.salary;
      salaries.push({ type: "", from: "", to: "", currency: "", per: "" });
      this.setState({
        salaryPosition: salaries.length - 1
      });
      this.onChange(this, "salary", salaries);
    };
    const removeContractType = (entry) => {
      const salaries = details.salary;
      const pos = salaries.indexOf(entry);
      salaries.splice(pos, 1);
      if (salaries.length === 0) {
        addContractType();
      } else {
        if (this.state.salaryPosition >= salaries.length) {
          this.setState({
            salaryPosition: salaries.length - 1
          })
        }
        this.onChange(this, "salary", salaries);
      }
    };
    return <div className={ "col-4 floating " + styles.salary_edit }>
      <div>
        <div className={ styles.title_salary }>Job highlights</div>
        <div>{ this.state.salaryPosition >= 0 &&
          <SalaryEdit value={ details.salary[this.state.salaryPosition] } salaries={ details.salary }
            onChange={ onChangeSalary }
            onDelete={ removeContractType } />
        }
        </div>
        { this.printSalarySwitch(details.salary, this.state.salaryPosition, addContractType) }
        <div className={ "row" }>
          <div className={ styles.label }>Location</div>
        </div>
        <div className={ "row" }>
          <LocationSelect className={ "col-12" } value={ details.jobLocation }
            name={ "jobLocation" }
            onChange={ this.onChange } />
        </div>
      </div>
    </div>;
  }

  printHeader() {
    return <div className={ "header" }>
      <div className={ "container" }>
        { this.printNavigation() }
        <div style={ { display: 'flex', marginLeft: -15, marginRight: -15 } }>
          <div className={ "fixed logo" } onClick={ this.isEditable() && this.changeLogo }>
            { this.isEditable() && <input type="file" onChange={ this.handleLogo } className={ "file-input" } id="logo-upload" accept="image/x-png,image/gif,image/jpeg" /> }
            <img src={ this.state.details.jobAvatar ? this.state.details.jobAvatar : defaultLogo } className={ "fixed logo" } alt={ "Job" } />
          </div>
          { this.printJobHeaderDetails(this.state.details) }
          <div className={ "col" } />

        </div>
      </div>
    </div>;
  }

  printNavigation() {

    const title = this.isAdd() ? "Add a new job" : "Edit job";
    return <div className={ "row" }>
      <div className={ styles.title + " col" } style={ { paddingLeft: 0 } }>
        { title }
      </div>
      <div className={ "col-auto" } onClick={ () => { } }>
        <div className={ "navigation active editable" }>Import data</div>
      </div>
      <div className={ "col-auto" } style={ { paddingRight: 0 } }>
        <div className={ "navigation active editable" }>Select from template</div>
      </div>
    </div>;


  }

  printJobHeaderDetails(details) {
    let jobTitleComponent = <>
      <input type={ "text" } className={ styles.title_edit } value={ details.jobTitle } name={ "jobTitle" }
        placeholder={ "Enter job title" }
        onChange={ this.onChangeHandler } />
      <img src={ pencil_icon } className={ styles.pencil_icon } alt="" />
    </>
    document.title = "ITSimple-Test " + details.jobTitle;
    let options = [<option key={ "empty" } value="" disabled hidden>Select job category</option>];
    CATEGORIES.forEach(category => {
      options.push(<option key={ category } value={ category }>{ category }</option>);
    });
    return (
      <div className={ "col-6" } style={ { paddingLeft: 30 } }>
        <div className={ "title" }>
          { jobTitleComponent }
        </div>
        <div className={ styles.header_select }>
          <select name={ "jobCategory" } value={ details.jobCategory }
            className={ details.jobCategory ? styles.selected_option : "" }
            onChange={ this.onChangeHandler }>
            { options }
          </select>
        </div>
        <div className={ styles.header_select }>
          <select name={ "jobExperience" } className={ details.jobExperience ? styles.selected_option : "" }
            value={ details.jobExperience.toUpperCase() }
            onChange={ this.onChangeHandler }>
            <option value="" disabled hidden>Select seniority level</option>
            <option value={ "JUNIOR" }>Junior</option>
            <option value={ "REGULAR" }>Regular</option>
            <option value={ "SENIOR" }>Senior</option>
          </select>
        </div>
      </div>
    )
  }

  printSectionErrors(errors) {
    let div = <div className={ "modal" } style={ { display: (!errors || errors.length === 0) ? "none" : "block" } }
      onClick={ () => hide() }>
      <div className={ "section modal-content" }>
        <div className={ "section_header" }>
          Errors
         </div>
        <div className={ "section_body" }>
          <div className={ "row col-12" }>
            { errors && errors.map((entry, i) => (
              <div key={ i + "_daily_tasks" } className={ "col-12" }>
                <div className={ "daily_tasks" }>
                  <div className={ "row" }>
                    <div className={ "col-auto" }>
                      <div className={ "no" }>{ i + 1 }</div>
                    </div>
                    <div className={ "col-3" }>
                      { entry.field }
                    </div>
                    <div className={ "col" }>
                      { entry.defaultMessage }
                    </div>
                  </div>
                </div>
              </div>
            )) }
          </div>
        </div>
      </div>
    </div>;

    let hide = () => {
      this.setState({ errors: null });
    };

    return div;
  }

  addFilesToDropzone(files) {
    files.map(file => {
      this.setState(prevState => ({
        details: {
          ...prevState.details,
          jobImage: URL.createObjectURL(file)
        }
      }));
      return null;
    });
  }

  printSectionJobDetails(details) {

    return <div className={ "section" }>
      <div className={ "section_header" }>
        Job Details
            </div>
      <Dropzone multiple={ false }
        onDrop={ file => {
          this.addFilesToDropzone(file);
        } }
      >
        { ({ getRootProps, getInputProps }) => (
          <div className={ "office_image" } style={ { border: this.state.details.jobImage ? "none" : "1px dashed #DFE5EE" } } onClick={ this.changeJobImage } { ...getRootProps() }>
            { this.isEditable() && <input  { ...getInputProps() } type="file" onChange={ this.handleJobImage } className={ "file-input" } id="job-image-upload" accept="image/x-png,image/gif,image/jpeg" /> }
            {
              this.state.details.jobImage ?
                <img src={ this.state.details.jobImage } alt={ "Office View" } /> :
                <div className={ "job_default_image" }>
                  <img src={ camera_icon } alt="" style={ { marginBottom: 10 } } />
                  <div>Drag and drop or <span style={ { color: '#054AFA', textDecoration: 'underline' } }>browse photo</span></div>
                </div>
            }
          </div>
        ) }
      </Dropzone>
      <div className={ "sub_title" }>Description</div>
      <textarea value={ details.jobDescription } name={ "jobDescription" }
        rows={ 7 }
        placeholder={ "Add a short job description" }
        onChange={ this.onChangeHandler }>
      </textarea>

    </div>;
  }

  printSectionTechStack(details) {
    return <div className={ "section" }>
      <div className={ "section_header" }>
        Tech stack
            </div>
      <div className={ "section_body" }>
        <TechStack value={ this.state.details.techStack }
          onChangeHandler={ this.onChange } />
      </div>
    </div>
  }

  printSectionWorkMethodology(details) {
    return <div className={ "section" }>
      <div className={ "section_header" }>
        Work methodology
       <div style={ { display: 'flex', alignItems: 'center' } }>
          <div
            className={ "active " + styles.os_selection + " " + (this.state.includeMethodology ? styles.os_selected : "") }
            onClick={ () => { this.setState({ includeMethodology: !this.state.includeMethodology }) } }>
            <div />
          </div>
          <div className={ "sub_title" } style={ { marginLeft: 10, marginBottom: 0, fontWeight: 'lighter' } }>Include in the offer</div>
        </div>
      </div>
      <div className={ "section_body" }>
        <WorkMethodology value={ this.state.details.workMethodology }
          onChangeHandler={ this.onChange } />

      </div>
    </div>;
  }

  printSectionDailyTasks(details) {
    return <div className={ "section" }>
      <div className={ "section_header" }>
        Your daily tasks
                <div style={ { display: 'flex', alignItems: 'center' } }>
          <div
            className={ "active " + styles.os_selection + " " + (this.state.includeDailyTasks ? styles.os_selected : "") }
            onClick={ () => { this.setState({ includeDailyTasks: !this.state.includeDailyTasks }) } }>
            <div />
          </div>
          <div className={ "sub_title" } style={ { marginLeft: 10, marginBottom: 0, fontWeight: 'lighter' } }>Include in the offer</div>
        </div>
      </div>
      <div className={ "section_body" }>
        <ArrayEdit value={ details.dailyTasks } onChange={ this.onChange } name={ "dailyTasks" } placeholder="e.g Play a key role in setting up a tech team in Gdansk" />
      </div>
    </div>;
  }

  printSectionEquipment(details) {
    return <div className={ "section" }>
      <div className={ "section_header" }>
        Equipment
                <div style={ { display: 'flex', alignItems: 'center' } }>
          <div
            className={ "active " + styles.os_selection + " " + (this.state.includeEquipment ? styles.os_selected : "") }
            onClick={ () => { this.setState({ includeEquipment: !this.state.includeEquipment }) } }>
            <div />
          </div>
          <div className={ "sub_title" } style={ { marginLeft: 10, marginBottom: 0, fontWeight: 'lighter' } }>Include in the offer</div>
        </div>
      </div>
      <div className={ "section_body" }>

        <EditEquipment value={ this.state.details.equipment } onChange={ this.onChange } />

      </div>
    </div>;
  }

  printSectionJobSpec(details) {
    return <div className={ "section" }>
      {/* <div className={"section_header"}>
                Job specs
            </div>
            <div className={"section_body"}>
                <div className={"row"}>
                    {details.jobSpecs.map((entry, i) => (
                        <div key={i + "_jobSpecs"} className={"col-12"}>
                            <div className={"jobSpecs"}>
                                <div className={"row simple_pair"}>
                                    <div className={"col-5"}>{entry.key}</div>
                                    <div className={"col-5"}>
                                        {entry.value}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div> */}
    </div>;
  }

  printSectionBenefits(values) {
    if (values.length === 0 && !this.isEditable()) {
      return <div />
    }
    return <div className={ "section" }>
      <div className={ "section_header" }>
        { "Benefits" }
        <div style={ { display: 'flex', alignItems: 'center' } }>
          <div
            className={ "active " + styles.os_selection + " " + (this.state.includeBenefits ? styles.os_selected : "") }
            onClick={ () => { this.setState({ includeBenefits: !this.state.includeBenefits }) } }>
            <div />
          </div>
          { this.isEditable() && <div className={ "sub_title" } style={ { marginLeft: 10, marginBottom: 0, fontWeight: 'lighter' } }>Include in the offer</div> }
        </div>
      </div>
      <div className={ "section_body" }>
        <ArrayEdit name={ 'benefits' } value={ values } onChange={ this.onChange } placeholder="e.g. Sports Card" />
      </div>
    </div>
  }

  printSectionOfficeAmenities(values) {
    if (values.length === 0 && !this.isEditable()) {
      return <div />
    }
    return <div className={ "section" }>
      <div className={ "section_header" }>
        { "Office amenities" }
        <div style={ { display: 'flex', alignItems: 'center' } }>
          <div
            className={ "active " + styles.os_selection + " " + (this.state.includeOffice ? styles.os_selected : "") }
            onClick={ () => { this.setState({ includeOffice: !this.state.includeOffice }) } }>
            <div />
          </div>
          { this.isEditable() && <div className={ "sub_title" } style={ { marginLeft: 10, marginBottom: 0, fontWeight: 'lighter' } }>Include in the offer</div> }
        </div>
      </div>
      <div className={ "section_body" }>

        <ArrayEdit name={ 'officeAmenities' } value={ values } onChange={ this.onChange } placeholder="e.g. Canteen" />

      </div>
    </div>
  }

  printSectionActions = (id) => {

    return (
      <div style={ { display: 'flex', width: '100vw' } }>
        <div className={ "action_btn" }>
          <div className={ "navigation active cancel" } onClick={ (e) => goTo(this, e, 'offer/' + id) }>
            <img src={ x_circle_icon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Cancel
          </div>
        </div>
        <div className={ "action_btn" }>
          <div className={ "navigation active save" } onClick={ (e) => { } }>
            <img src={ save_icon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Save as draft
          </div>
        </div>
        <div className={ "action_btn" }>
          <div className={ "navigation active save" } onClick={ (e) => { } }>
            <img src={ template_icon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Save as template
          </div>
        </div>
        <div className={ "action_btn" }>
          <div className={ "navigation active publish" } onClick={ this.onSubmitHandler }>
            <img src={ publish_icon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Preview and publish
          </div>
        </div>
      </div>
    )
  }


}

export default withRouter(OfferDetails);
