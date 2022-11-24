import {makeAutoObservable} from "mobx";

export default class CourseStore {
    constructor() {
        this._typeCourses = [
            {}
        ]
        this._courses = [
        ]
        this._themes = []
        this._stages = []
        this._tasks = []
        this._variants = [
        ]
        this._selectedCost = 0
        this._selectedThemes = {}
        this._selectedStage = {}
        this._currCourse = {}
        makeAutoObservable(this)
    }
    setCourses(courses){
        this._courses = courses
    }
    setTypeCourses(typeCourses){
        this._typeCourses = typeCourses
    }
    setThemes(themes){
        this._themes = themes
    }
    setStages(stages){
        this._stages = stages
    }
    setTasks(tasks){
        this._tasks = tasks
    }
    setVariants(variants){
        this._variants = variants
    }
    setSelectedCost(selectedCost){
        this._selectedCost = selectedCost
    }
    setSelectedThemes(selectedThemes){
        this._selectedThemes = selectedThemes
    }
    setSelectedStage(selectedStage){
        this._selectedStage = selectedStage
    }
    setCurrCourse(currCourse){
        this._currCourse = currCourse
    }

    get courses(){
        return this._courses
    }
    get typeCourses(){
        return this._typeCourses
    }
    get themes(){
        return this._themes
    }
    get stages(){
        return this._stages
    }
    get tasks(){
        return this._tasks
    }
    get variants(){
        return this._variants
    }
    get selectedCost(){
        return this._selectedCost
    }
    get selectedThemes(){
        return this._selectedThemes
    }
    get selectedStage(){
        return this._selectedStage
    }
    get currCourse(){
        return this._currCourse
    }
}