﻿import {
    REQUEST_ADD_NEW_SAMPLE,
    REQUEST_ADD_NEW_SAMPLE_SUCCESS,
    REQUEST_ADD_NEW_SAMPLE_FAIL,
    REQUEST_GET_ALL_NAMES_OF_SAMPLES,
    REQUEST_GET_ALL_NAMES_OF_SAMPLES_SUCCESS,
    REQUEST_GET_ALL_NAMES_OF_SAMPLES_FAIL,
    REQUEST_GET_ALL_EXISTING_TAGS,
    REQUEST_GET_ALL_EXISTING_TAGS_SUCCESS,
    REQUEST_GET_ALL_EXISTING_TAGS_FAIL,
    REQUEST_GET_ALL_EXISTING_GROUPS,
    REQUEST_GET_ALL_EXISTING_GROUPS_SUCCESS,
    REQUEST_GET_ALL_EXISTING_GROUPS_FAIL
} from '../../constants/actionTypes'

import { api } from '../../constants/api'
import axios from 'axios'

//********** Create New Sample **********

export function addNewSampleInTheServer(imgFormdata) {
    return function (dispatch) {
        dispatch(createSample()) // Dispatch createNewSample
        axios.post(api + 'api/sample', imgFormdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            dispatch(createSampleSuccess()) // Dispatch Successful created sample
        })
        .catch(err => {
            console.log(err)
            dispatch(createSampleFail(err)) // Dispatch for error
        })
    }
}

export function createSample() {
    return {
        type: REQUEST_ADD_NEW_SAMPLE
    }
}

export function createSampleSuccess() {
    return {
        type: REQUEST_ADD_NEW_SAMPLE_SUCCESS,
    }
}

export function createSampleFail(error) {
    return {
        type: REQUEST_ADD_NEW_SAMPLE_FAIL,
        payload: error
    }
}

//********** Sample actions **********

export function getAllNamesOfExistingSamples() {
    return function (dispatch) {
        dispatch(getAllExistingNamesOfSamples()) // Dispatch get all ezisting names of samples
        axios.get(api + 'api/autocomplete/names')
        .then(response => {
            dispatch(getAllExistingNamesOfSamplesSuccess(response["data"])) // Dispatch Successful request
        })
        .catch(err => {
            console.log(err)
            dispatch(getAllExistingNamesOfSamplesFail(err)) // Dispatch an error
        })
    }
}

export function getAllExistingNamesOfSamples() {
    return {
        type: REQUEST_GET_ALL_NAMES_OF_SAMPLES
    }
}

export function getAllExistingNamesOfSamplesSuccess(data) {
    return {
        type: REQUEST_GET_ALL_NAMES_OF_SAMPLES_SUCCESS,
        payload: data
    }
}

export function getAllExistingNamesOfSamplesFail(error) {
    return {
        type: REQUEST_GET_ALL_NAMES_OF_SAMPLES_FAIL,
        payload: error
    }
}

//**********

export function getAllExistingTagsFromServer() {
    return function (dispatch) {
        dispatch(getAllExistingTags()) // Dispatch get all ezisting names of samples
        axios.get(api + 'api/autocomplete/tags')
        .then(response => {
            dispatch(getAllExistingTagsSuccess(response["data"])) // Dispatch Successful request
        })
        .catch(err => {
            console.log(err)
            dispatch(getAllExistingTagsFail(err)) // Dispatch an error
        })
    }
}

export function getAllExistingTags() {
    return {
        type: REQUEST_GET_ALL_EXISTING_TAGS,
    }
}

export function getAllExistingTagsSuccess(data) {
    return {
        type: REQUEST_GET_ALL_EXISTING_TAGS_SUCCESS,
        payload: data
    }
}

export function getAllExistingTagsFail(error) {
    return {
        type: REQUEST_GET_ALL_EXISTING_TAGS_FAIL,
        payload: error
    }
}

//**********

export function getAllExistingGroupsFromServer() {
    return function (dispatch) {
        dispatch(getAllExistingGroups()) // Dispatch get all ezisting names of samples
        axios.get(api + 'api/autocomplete/groups')
        .then(response => {
            dispatch(getAllExistingGroupsSuccess(response["data"])) // Dispatch Successful request
        })
        .catch(err => {
            console.log(err)
            dispatch(getAllExistingGroupsFail(err)) // Dispatch an error
        })
    }
}

export function getAllExistingGroups() {
    return {
        type: REQUEST_GET_ALL_EXISTING_GROUPS
    }
}

export function getAllExistingGroupsSuccess(data) {
    return {
        type: REQUEST_GET_ALL_EXISTING_GROUPS_SUCCESS,
        payload: data
    }
}

export function getAllExistingGroupsFail(error) {
    return {
        type: REQUEST_GET_ALL_EXISTING_GROUPS_FAIL,
        payload: error
    }
}