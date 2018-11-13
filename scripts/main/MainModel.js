class MainModel{
	constructor(parametersObject){
		this.parametersObject = parametersObject;
	}
	updateFiltersAnimation(NewParametersObject){
		this.parametersObject = NewParametersObject? NewParametersObject: this.parametersObject;
	}
}