﻿import React, { Component } from "react"
import { connect } from "react-redux"
import { Route } from "react-router"
import { addNewSampleInTheServer } from "../store/actions/SampleActions"
import {
  getAllExistingTagsFromServer,
  getAllExistingGroupsFromServer,
  fetchAllExistingNutrientAgarPlates
} from '../store/actions/FilterActions'
import {
    infoNotification,
    successfulNotification,
    errorNotification
} from '../store/actions/NotificationActions'
import "../styles/CreateNewSample.css"

class CreateNewSample extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      description: "",
      selectedNutrientAgarPlates: [],
      selectedTags: [],
      selectedGroups: [],
      images: [],
      files: {},

      // fields validation
      nameError: "",
      descriptionError: "",
      nutrientAgarPlatesError: "",
      tagsError: "",
      groupsError: "",
      imagesError: "",

      isTagsBtnClicked: false,
      isGroupsBtnClicked: false,
      isNutrientAgarPlateBtnClicked: false
    }
  }

  async componentWillMount() {
      this.props.fetchAllExistingTags()
      this.props.fetchAllExistingGroups()
      this.props.fetchAllNutrientAgarPlates()
  }

  handleImages(images) {
    let fileImgs = Array.from(this.state.files)
    let targetImg = Array.from(images.target.files)
    let imgs = fileImgs.concat(targetImg)
    let previewImages = this.state.images;

    for (var i = 0; i < targetImg.length; i++) {
        if (targetImg[i].type === "image/jpeg") {
          let newImg = {
            url: URL.createObjectURL(targetImg[i])
          };

          previewImages.push(newImg)
        }
    }

    this.setState({
        images: previewImages,
        files: imgs
    });
  }

  handleGroupsBtnClick() {
      let state = this.state.isGroupsBtnClicked

      if(state) {
          this.setState({
              isGroupsBtnClicked: false,
              selectedGroups: []
          })
      } else if(! state) {
          this.setState({
              isGroupsBtnClicked: true
          })
      }
  }

  handleTagsBtnClick(){
      let state = this.state.isTagsBtnClicked

      if(state) {
          this.setState({
              isTagsBtnClicked: false,
              selectedTags: []
          })
      } else if(! state) {
          this.setState({
              isTagsBtnClicked: true
          })
      }
  }

  handleNutrientAgarPlatesBtnClick() {
    let state = this.state.isNutrientAgarPlateBtnClicked

    if(state) {
        this.setState({
            isNutrientAgarPlateBtnClicked: false,
            selectedNutrientAgarPlates: []
        })
    } else if(! state) {
        this.setState({
            isNutrientAgarPlateBtnClicked: true
        })
    }
  }

  addTag(event) {
    if(event.target.value === undefined) return //Prevent error when btn's icon is clicked

    let id = event.target.id
    let value = event.target.value.toLowerCase()
    let tabIndex = event.target.tabIndex
    let tags = this.state.selectedTags

    if(tabIndex === 0) {
        let element = document.getElementById(id)
        element.style.backgroundColor = "#66B2FF"
        element.tabIndex = "1"

        this.props.allExistingTags.forEach(tag => {
            if(tag.name.toLowerCase() === value) {
                tags.push(tag)
            }
        })

        this.setState({
            selectedTags: tags
        })

        } else if (tabIndex === 1) {
          let element = document.getElementById(id)
          element.style.backgroundColor = "grey"
          element.tabIndex = "0"

          this.props.allExistingTags.forEach(tag => {
              if(tag.name.toLowerCase() === value) {
                  tags.splice(tags.findIndex(x => x.name === value), 1)
              }
          })

          this.setState({
              selectedTags: tags
        })
      }
  }

  addGroup(event) {
    let id = event.target.id
    let value = event.target.value.toLowerCase()
    let tabIndex = event.target.tabIndex
    let groups = this.state.selectedGroups

    if(tabIndex === 0) {
        this.props.allExistingGroups.forEach(group => {
            if(group.name.toLowerCase() === value) {
                groups.push(group)
            }
        })

        // Form validation, only message
        this.checkIfMoreThanOneGroupIsSelected(groups)

        let element = document.getElementById(id)
        element.style.backgroundColor = "#66B2FF"
        element.tabIndex = "1"

        this.setState({
            selectedGroups: groups
        })

    } else if (tabIndex === 1) {
        this.props.allExistingGroups.forEach(group => {
            if(group.name.toLowerCase() === value) {
                groups.splice(groups.findIndex(x => x.name === value), 1)
            }
        })

        // Form validation, only message
        this.checkIfMoreThanOneGroupIsSelected(groups)

        let element = document.getElementById(id)
        element.style.backgroundColor = "grey"
        element.tabIndex = "0"

        this.setState({
            selectedGroups: groups
        })
    }
  }

  checkIfMoreThanOneGroupIsSelected(selectedGroups) {
    if(selectedGroups.length > 1){
        this.setState({
            groupsError: "Only one group could be selected for a sample!"
        })
        return true;
    } else {
        this.setState({
            groupsError: ""
        })
        return false;
    }
  }

  addNutrientAgarPlate(event) {
      let id = event.target.id
      let value = event.target.value.toLowerCase()
      let tabIndex = event.target.tabIndex
      let nutrients = this.state.selectedNutrientAgarPlates

      if(tabIndex === 0) {
          let element = document.getElementById(id)
          element.style.backgroundColor = "#66B2FF"
          element.tabIndex = "1"

          this.props.allExistingNutrientAgarPlates.forEach(nutrient => {
              if(nutrient.name.toLowerCase() === value) {
                  nutrients.push(nutrient)
              }
          })

          this.setState({
              selectedNutrientAgarPlates: nutrients
          })

      } else if (tabIndex === 1) {
          let element = document.getElementById(id)
          element.style.backgroundColor = "grey"
          element.tabIndex = "0"

          this.props.allExistingNutrientAgarPlates.forEach(nutrient => {
              if(nutrient.name.toLowerCase() === value) {
                  nutrients.splice(nutrients.findIndex(x => x.name === value), 1)
              }
          })

          this.setState({
              selectedNutrientAgarPlates: nutrients
          })
      }
  }

  formValidation(name, description, groupsNames, tagsNames, nutrientAgarPlates, files) {
    let isFormValid = true;

    if (name == "") {
        this.setState({
            nameError: "Name can't be empty!"
        })

        isFormValid = false;
    } else {
        this.setState({ nameError: "" })
    }

    if (description == "") {
        this.setState({
            descriptionError: "Description can't be empty!"
        })

        isFormValid = false;
    } else {
        this.setState({ descriptionError: "" })
    }

    if (groupsNames.length == 0) {
        this.setState({
            groupsError: "Group type should be specified!"
        })

        isFormValid = false;
    } else if (groupsNames.length > 1) {
        this.setState({
            groupsError: "Only one group type should be specified!"
        })

        isFormValid = false;
    } else {
        this.setState({ groupsError: "" })
    }

    if (tagsNames.length == 0) {
        this.setState({
            tagsError: "At least one tag type should be specified!"
        })

        isFormValid = false;
    } else {
        this.setState({ tagsError: "" })
    }

    if (nutrientAgarPlates.length == 0) {
        this.setState({
            nutrientAgarPlatesError: "At least one nutrient agar plate type should be specified!"
        })

        isFormValid = false;
    } else {
        this.setState({ nutrientAgarPlatesError: "" })
    }

    if (files.length == null || files.length < 3) {
        this.setState({
            imagesError: "At least 3 images should be uploaded!"
        })

        isFormValid = false;
    } else {
        this.setState({ imagesError: "" })
    }

    return isFormValid
  }

   async handleSubmit(event) {
    event.preventDefault();

    let name = this.state.name
    let description = this.state.description
    let groupsNames = []
    let tagsNames = []
    let nutrientAgarPlates = []
    let files = this.state.files

    this.state.selectedNutrientAgarPlates.forEach(nutrient => {
        nutrientAgarPlates.push(nutrient.name)
    })

    this.state.selectedGroups.forEach(group => {
        groupsNames.push(group.name)
    })

    this.state.selectedTags.forEach(tag => {
        tagsNames.push(tag.name)
    })

    let isFormValid = this.formValidation(name, description, groupsNames, tagsNames, nutrientAgarPlates, files)
    if (!isFormValid) {
        return;
    }

    let formData = new FormData();
    if (files.length > 0) {
        files.forEach(file => {
          formData.append("image", file)
        });
    }

    formData.append("name", name)
    formData.append("description", description)
    formData.append("groups", groupsNames.join())
    formData.append("tags", tagsNames.join())
    formData.append("nutrientAgarPlates", nutrientAgarPlates.join())

    await this.props.createSample(formData)
        .then(response => {
            if (response.status === 200) {
                this.props.successfulNotification("Congratulations! The 'Sample' has been succesfully created!")
            } else {
                this.props.errorNotification("Something went wrong. Pleas try again")
            }
        })

    this.props.history.push("/")
  }

  render() {
    let tagsCategoryColors = this.props.allExistingTags.map((tag, index) => {
        if(tag.category === "Colors") {
            return (
                <button
                    key={index}
                    id={tag.id}
                    className="tags"
                    tabIndex="0"
                    type="text"
                    value={tag.name}
                    onClick={this.addTag.bind(this)}
                    >{tag.name}
                    <span className="tagColor" style={{backgroundColor: tag.color}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </button>
            )
        }
    })

    let nutrientAgarPlates = this.props.allExistingNutrientAgarPlates.map((nutrient, index) => {
      return (
          <button
              key={index}
              id={nutrient.id}
              tabIndex="0"
              className="nutrients"
              value={nutrient.name}
              onClick={this.addNutrientAgarPlate.bind(this)}
              >{nutrient.name}
          </button>
      )
    })

    let tagsCategoryConsistency = this.props.allExistingTags.map((tag, index) => {
        if(tag.category === "Consistency") {
            return (
                <button
                    key={index}
                    id={tag.id}
                    className="tags"
                    tabIndex="0"
                    type="text"
                    value={tag.name}
                    onClick={this.addTag.bind(this)}
                    >{tag.name}
                </button>
            )
        }
    })

    let tagsCategorySurfaceAppearance = this.props.allExistingTags.map((tag, index) => {
        if(tag.category === "Surface appearance") {
            return (
                <button
                    key={index}
                    id={tag.id}
                    className="tags"
                    tabIndex="0"
                    type="text"
                    value={tag.name}
                    onClick={this.addTag.bind(this)}
                    >{tag.name}
                </button>
            )
        }
    })

    let tagsCategoryForm = this.props.allExistingTags.map((tag, index) => {
        if(tag.category === "Form") {
            return (
                <button
                    key={index}
                    id={tag.id}
                    className="tags"
                    tabIndex="0"
                    type="text"
                    value={tag.name}
                    onClick={this.addTag.bind(this)}
                    >{tag.name}
                    <img src={require('../content/tagIcons/' + tag.iconUrl)} className="tagIcon"/>
                </button>
            )
        }
    })

    let tagsCategoryElevations = this.props.allExistingTags.map((tag, index) => {
        if(tag.category === "Elevations") {
            return (
                <button
                    key={index}
                    id={tag.id}
                    className="tags"
                    tabIndex="0"
                    type="text"
                    value={tag.name}
                    onClick={this.addTag.bind(this)}
                    >{tag.name}
                    <img src={require('../content/tagIcons/' + tag.iconUrl)} className="tagIcon"/>
                </button>
            )
        }
    })

    let groups = this.props.allExistingGroups.map((grop, index) => (
        <button
          key={index}
          id={grop.id}
          className="groups"
          tabIndex="0"
          type="text"
          value={grop.name}
          onClick={this.addGroup.bind(this)}
          >{grop.name}
        </button>
    ))

    return (
      <div className="conteiner">
        <div>
            <div className="errorMessage">{this.state.nameError}</div>
            <input
                type="text"
              placeholder="Type a name"
              name="name"
              className="nameInput"
              onChange={event => this.setState({ name: event.target.value })}
            />
          <br />
            <div className="errorMessage">{this.state.descriptionError}</div>
              <textarea
                placeholder="Description..."
                className="descriptionInput"
                onChange={event =>
                  this.setState({ description: event.target.value })
                }
              />
          <br />
          {/* Image Uploader */}
          <div className="errorMessage">{this.state.imagesError}</div>
          <label className="uploadImgsConteiner">
            <span className="uploadImgs">Upload Images</span>
            <input
              type="file"
              multiple={true}
              className="imgUpload"
              onChange={this.handleImages.bind(this)} />
          </label>
          <br/>
            <div>
              {
                this.state.images.map((img, index) => (
                  <img key={index} src={img.url} className="image"/>
                ))
              }
            </div>
          <br/>
          <div>
            <div className="errorMessage">{this.state.groupsError}</div>
              {
                  this.state.isGroupsBtnClicked
                  ?
                  <div className="groupsContainer">
                      <button
                        type="button"
                        id="groupsTitle"
                        onClick={this.handleGroupsBtnClick.bind(this)}
                        >Groups
                      </button>
                      <br/>
                      { groups }
                  </div>
                  :
                  <button
                    type="button"
                    id="groupsBtn"
                    onClick={this.handleGroupsBtnClick.bind(this)}
                    >Groups
                  </button>
              }
              <div className="errorMessage">{this.state.nutrientAgarPlatesError}</div>
              {
                  this.state.isNutrientAgarPlateBtnClicked
                  ?
                  <div className="nutrientAgarPlatesContainer">
                      <button
                          id="nutriensTitle"
                          onClick={this.handleNutrientAgarPlatesBtnClick.bind(this)}
                          >Nutrient Agar Plates
                      </button>
                      <br/>
                      { nutrientAgarPlates }
                  </div>
                  :
                  <button
                      id="nutriensBtn"
                      onClick={this.handleNutrientAgarPlatesBtnClick.bind(this)}
                      >Nutrient Agar Plates
                  </button>
              }
              <div className="errorMessage">{this.state.tagsError}</div>
              {
                  this.state.isTagsBtnClicked
                  ?
                  <div className="tagsConteiner">
                      <button
                        type="button"
                        id="tagsTitle"
                        onClick={this.handleTagsBtnClick.bind(this)}
                        >Tags
                      </button>
                      <br/>
                      <h4>Elevations</h4>
                      { tagsCategoryElevations }
                      <hr/>
                      <h4>Form</h4>
                      { tagsCategoryForm }
                      <hr/>
                      <h4>Surface appearance</h4>
                      { tagsCategorySurfaceAppearance }
                      <hr/>
                      <h4>Consistency</h4>
                      { tagsCategoryConsistency }
                      <hr/>
                      <h4>Colors</h4>
                      { tagsCategoryColors }
                  </div>
                  :
                  <button
                    type="button"
                    id="tagsBtn"
                    onClick={this.handleTagsBtnClick.bind(this)}
                    >Tags
                  </button>
              }
          </div>
          <br />
          <button
            type="button"
            className="saveBtn"
            onClick={this.handleSubmit.bind(this)}>SAVE</button>
            <Route
                render={({ history }) => (
                <button
                    type="button"
                    className="backBtn"
                    onClick={() => { this.props.history.goBack() }}>BACK</button>
                )}
            />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allExistingNutrientAgarPlates: state.filter.allExistingNutrientAgarPlates,
    allExistingTags: state.filter.allExistingTags,
    allExistingGroups: state.filter.allExistingGroups,
    isLoading: state.sample.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSample: (formData) => dispatch(addNewSampleInTheServer(formData)),
      fetchAllExistingTags: () => dispatch(getAllExistingTagsFromServer()),
      fetchAllExistingGroups: () => dispatch(getAllExistingGroupsFromServer()),
      fetchAllNutrientAgarPlates: () => dispatch(fetchAllExistingNutrientAgarPlates()),

      // Notifications
      infoNotification: (message) => dispatch(infoNotification(message)),
      successfulNotification: (message) => dispatch(successfulNotification(message)),
      errorNotification: (message) => dispatch(errorNotification(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewSample)
