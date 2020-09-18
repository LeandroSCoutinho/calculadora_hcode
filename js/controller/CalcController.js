class CalcController {
    
    constructor(){
        this.locale = "pt-BR";
        this._displayCalEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.currentDate;
        this.initialize();
        this.initButtonsEvents();
        
    }

        initButtonsEvents(){
            let buttons = document.querySelectorAll("#buttons > g, #parts > g");

            buttons.forEach((btn, index)=>{

                btn.addEventListener("click", e=>{

                    console.log(btn.className.baseVal.replace("btn-",""))

                });
            });
        }

        initialize(){

            this.setDisplayDateTime();

            setInterval(()=>{
            
                this.setDisplayDateTime();
 
            },1000);
            
        }

        setDisplayDateTime(){

            this.displayDate = this.currentDate.toLocaleDateString(this.locale, {
                day: "2-digit",
                month: "long",
                year: "numeric"
            });
                
            this.displayTime = this.currentDate.toLocaleTimeString(this.locale);

        }

        get displayDate(){
            return this._dateEl.innerHTML;
        }

        set displayDate(date){
            this._dateEl.innerHTML = date;
        }

        get displayTime(){
            return this._timeEl.innerHTML;
        }

        set displayTime(time){
            this._timeEl.innerHTML = time; 
        }

        get displayCalc(){
            return this._displayCalcEl.innerHTML;
        }

        set displayCalc(value){
            this._displayCalEl.innerHTML = value; 
        }

        get currentDate(){
            return new Date();
;
        }

        set currentDate(date){
            this._currentDate = date;
        }
}