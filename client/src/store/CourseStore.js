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
        this._currProgress = {}
        this._currProgressStage = 0
        this._currTest = []
        this._completeTask = []
        this._certificate = []
        this._check = true
        makeAutoObservable(this)
    }
    setCourses(courses){
        this._courses = courses
    }
    setCertificate(certificate){
        this._certificate = certificate
    }
    setCheck(bool){
        this._check = bool
    }
    setCompleteTask(completeTask){
        this._completeTask = completeTask
    }
    setCurrTest(currTest){
        this._currTest = currTest
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
    setCurrProgress(currProgress){
        this._currProgress = currProgress
    }
    setCurrProgressStage(currProgressStage){
        this._currProgressStage = currProgressStage
    }
    get check(){
        return this._check
    }
    get certificateData(){
        return this._certificate
    }
    get courses(){
        return this._courses
    }
    get completeTask(){
        return this._completeTask
    }
    get currTest(){
        return this._currTest
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
    get currProgress(){
        return this._currProgress
    }
    get currProgressStage(){
        return this._currProgressStage
    }
}