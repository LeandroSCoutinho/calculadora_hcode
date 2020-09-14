class CalcController {
    
    constructor(){

        this._displayCalc = "0";
        this.currentDate;
        this.initialize();
    }
        initialize(){
            let displayCalEL = document.querySelector("#display");
            let dateEl = document.querySelector("#data");
            let timeEl = document.querySelector("#hora");

            displayCalEL.innerHTML = "4882";
            dateEl.innerHTML = "13/09/202";
            timeEl.innerHTML = "22:37";
        }

        get displayCalc(){
            return this._displayCalc;
        }

        set displayCalc(valor){
            this._displayCalc = valor; 
        }

        get dataAtual(){
            return this.currentDate;
;
        }

        set dataAtual(data){
            this.currentDate = data;
        }
}