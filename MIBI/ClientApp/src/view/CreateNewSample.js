﻿import React, { Component } from "react"
import { connect } from "react-redux"
import { Route } from "react-router"
import { addNewSampleInTheServer } from "../store/actions/SampleActions"
import {
  getAllExistingTagsFromServer,
  getAllExistingGroupsFromServer,
  fetchAllExistingNutrientAgarPlates
} from '../store/actions/SampleActions'
import "../styles/CreateNewSample.css"

class CreateNewSample extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      description: "",
      selectedTags: [],
      selectedGroups: [],
      images: [],
      files: {},

      isTagsBtnClicked: false,
      isGroupsBtnClicked: false
    }
  }

  async componentWillMount() {
      this.props.fetchAllExistingTags()
      this.props.fetchAllExistingGroups()
      this.props.fetchAllNutrientAgarPlates()
  }

  handleImages(images) {
    let imgs = Array.from(images.target.files)
    let previewImages = [];

    for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].type === "image/jpeg") {
          let newImg = {
            url: URL.createObjectURL(imgs[i])
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

  addSearchingByTag(event) {
    let id = event.target.id
    let value = event.target.value
    let tabIndex = event.target.tabIndex
    let tags = this.state.selectedTags

    if(tabIndex === 0) {
        let element = document.getElementById(id)
        element.style.backgroundColor = "#66B2FF"
        element.tabIndex = "1"

        this.props.allExistingTags.forEach(tag => {
            if(tag.name.toLowerCase() === value.toLowerCase()) {
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
              if(tag.name.toLowerCase() === value.toLowerCase()) {
                  tags.splice(tags.indexOf(value), 1)
              }
          })

          this.setState({
              selectedTags: tags
        })
      }
  }

  addSearchingByGroup(event) {
    let id = event.target.id
    let value = event.target.value
    let tabIndex = event.target.tabIndex
    let groups = this.state.selectedGroups

    if(tabIndex === 0) {
        let element = document.getElementById(id)
        element.style.backgroundColor = "#66B2FF"
        element.tabIndex = "1"

        this.props.allExistingGroups.forEach(group => {
            if(group.name.toLowerCase() === value.toLowerCase()) {
                groups.push(group)
            }
        })

        this.setState({
            selectedGroups: groups
        })

    } else if (tabIndex === 1) {
        let element = document.getElementById(id)
        element.style.backgroundColor = "grey"
        element.tabIndex = "0"

        this.props.allExistingGroups.forEach(group => {
            if(group.name.toLowerCase() === value.toLowerCase()) {
                groups.splice(groups.indexOf(value), 1)
            }
        })

        this.setState({
            selectedGroups: groups
        })
    }
  }

  addSearchingByNutrientAgarPlate(event) {
      let id = event.target.id
      let value = event.target.value
      let tabIndex = event.target.tabIndex
      let nutrients = this.state.selectedNutrientAgarPlates

      if(tabIndex === 0) {
          let element = document.getElementById(id)
          element.style.backgroundColor = "#66B2FF"
          element.tabIndex = "1"

          this.props.allExistingNutrientAgarPlates.forEach(nutrient => {
              if(nutrient.name.toLowerCase() === value.toLowerCase()) {
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
              if(nutrient.name.toLowerCase() === value.toLowerCase()) {
                  nutrients.splice(nutrients.indexOf(value), 1)
              }
          })

          this.setState({
              selectedNutrientAgarPlates: nutrients
          })
      }

      console.log(this.state.selectedNutrientAgarPlates)
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

  async handleSubmit(event) {
    event.preventDefault();

    let groupsNames = []
    let tagsNames = []

    this.state.selectedGroups.forEach(group => {
      groupsNames.push(group.name)
    })

    this.state.selectedTags.forEach(tag => {
      tagsNames.push(tag.name)
    })

    let formData = new FormData();
    if (this.state.files.length > 0) {
      this.state.files.forEach(file => {
        formData.append("image", file)
      });
    }

    formData.append("name", this.state.name)
    formData.append("description", this.state.description)
    formData.append("groups", groupsNames.join())
    formData.append("tags", tagsNames.join())

    await this.props.createSample(formData)
    this.props.history.push("/")
  }

  render() {
    console.log(this.state.selectedTags)
    console.log(this.state.selectedGroups)
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
                    onClick={this.addSearchingByTag.bind(this)}
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
              onClick={this.addSearchingByNutrientAgarPlate.bind(this)}
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
                    onClick={this.addSearchingByTag.bind(this)}
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
                    onClick={this.addSearchingByTag.bind(this)}
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
                    onClick={this.addSearchingByTag.bind(this)}
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
                    onClick={this.addSearchingByTag.bind(this)}
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
          onClick={this.addSearchingByGroup.bind(this)}
          >{grop.name}
        </button>
    ))

    return (
      <div className="conteiner">
        <div>
            <input
              type="text"
              placeholder="Type a name"
              name="name"
              className="nameInput"
              onChange={event => this.setState({ name: event.target.value })}
            />
          <br />
              <textarea
                placeholder="Description..."
                className="descriptionInput"
                onChange={event =>
                  this.setState({ description: event.target.value })
                }
              />
          <br />
          {/* Image Uploader */}
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
          <button type="button"
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
    allExistingNutrientAgarPlates: state.sample.allExistingNutrientAgarPlates,
    allExistingTags: state.sample.allExistingTags,
    allExistingGroups: state.sample.allExistingGroups,
    isLoading: state.sample.isLoading,
    error: state.sample.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSample: (formData) => dispatch(addNewSampleInTheServer(formData)),
      fetchAllExistingTags: () => dispatch(getAllExistingTagsFromServer()),
      fetchAllExistingGroups: () => dispatch(getAllExistingGroupsFromServer()),
      fetchAllNutrientAgarPlates: () => dispatch(fetchAllExistingNutrientAgarPlates())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewSample)
